<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 28/11/2017
 * Time: 14:15
 */

namespace Project\controllers;


use Error;
use Project\Helpers\Collections\DotNotationArray;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\helpers\interactions\FlashService;
use Project\Helpers\Interactions\Session;
use Project\Helpers\JsonRead;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Helpers\Routing\Router;
use Project\models\LobbyModel;
use Project\Models\SolitaireModel;

/**A controller that handles the game's logic
 * Class GameController
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
class GameController extends A_Controller {
    const BOARD_SESSION_KEY = "board";
    const PREV_BOARD_SESSION_KEY = "prevboard";

    /**
     * @var Session
     */
    protected $session;

    /**
     * @var FlashService
     */
    protected $flash;

    protected $solitaireModel;

    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        parent::__construct($renderEngine, $db);
        $this->model = new LobbyModel($db);
        $this->session = new Session();
        $this->flash = $this->session->get("sharedFlashService");
        $this->solitaireModel = new SolitaireModel($db);
    }

    /**Handles request for /game/play
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Error
     */
    public function play(Request $rq, Router $router){
        if(!$this->userIsConnected())
            $router->redirect("/");

        if(!$rq->isGet())
            throw new Error("This page can only be accessed via a GET HTTP request");

        if($this->userWon()){
            $this->addLobbyToDb();
            $this->flash->success("You won ! We will take that into account !");
            return $this->view->renderView("game/victory.twig", [
                "pageName" => "game/victory",
                "username" => $this->getUsername()
            ]);
        }

        return $this->view->renderView("game/play.twig", [
            "pageName" => "game/play",
            "username" => $this->getUsername(),
            "board" => $this->getBoard(),
            "invalids" => $this->getInvalidStates(),
            "canUndo" => $this->canUndo()
        ]);
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @throws Error
     * @throws \Exception
     */
    public function processAction(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Error("Tried to access via GET a feature that can only be accessed via POST");

        $this->validateCurX($rq, $router);
        $this->validateCurY($rq, $router);
        $this->validateNextX($rq, $router);
        $this->validateNextY($rq, $router);

        $curX = intval($rq->post("curx"));
        $curY = intval($rq->post("cury"));
        $nextX = intval($rq->post("nextx"));
        $nextY = intval($rq->post("nexty"));

        if($this->isInvalidPawn($curX, $curY) || $this->isInvalidPawn($nextX, $nextY)){
            $this->flash->failure("Invalid position");
            $this->redirectToBoard($router);
        }

        if(!$this->canGo($curX, $curY, $nextX, $nextY)){
            $this->flash->failure("Invalid move");
            $this->redirectToBoard($router);
        }
        $this->move($curX, $curY, $nextX, $nextY);

        $this->redirectToBoard($router);
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @throws Error
     */
    public function reset(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Error("Tried to access via GET a feature that can only be accessed via POST");

        $this->session->unset(self::PREV_BOARD_SESSION_KEY);
        $this->session->unset(self::BOARD_SESSION_KEY);
        $this->redirectToBoard($router);
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @throws Error
     */
    public function victory(Request $rq, Router $router){
        if(!$rq->isGet())
            throw new Error("GET instead of POST");

        if(!$this->session->has("victory"))
            $this->redirectToBoard($router);


        $this->session->unset("victory");
        //TODO: Afficher vue de victoire
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @throws Error
     */
    public function undo(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Error("Tried to access via GET a feature that can only be accessed via POST");

        if(!$this->session->has(self::PREV_BOARD_SESSION_KEY))
            throw new Error("The undo feature is unavailable");


        if($this->canUndo()) {
            $prevBoard = $this->getLastBackup();
            $this->setBoard($prevBoard)->removeLastBackup();
        }

        $this->redirectToBoard($router);
    }

    protected function canUndo(){
        $prev_board = $this->getLastBackup();
        $initBoard = $this->getInitBoard();
        $board = $this->getBoard();

        /*var_dump($prev_board, $initBoard, $board);
        die();*/
        return !(is_null($prev_board) || $board==$initBoard);
    }

    protected function addBackup(array $board) : self{
        $this->solitaireModel->addBackup($board);
        return $this;
    }

    protected function getLastBackup() : ?array{
        return $this->solitaireModel->getLastBackup();
    }

    protected function removeLastBackup() : self{
        $this->solitaireModel->deleteLastBackup();
        return $this;
    }

    protected function userWon() : bool{
        return $this->solitaireModel->won();
    }

    protected function addLobbyToDb(){
        $username = $this->getUsername();
        $won = $this->userWon();

        $this->model->insert($username, $won);
    }

    /**Determines whether or not the user is connected
     * @return bool
     */
    protected function userIsConnected() : bool{
        return $this->session->has("connected");
    }

    /**Retrieve the user's username
     * @return null|string
     */
    protected function getUsername() : ?string{
        if($this->userIsConnected())
            return $this->session->get("connected");
        else
            return null;
    }

    protected function getBoard() : array{
        return $this->solitaireModel->getBoard();
    }

    protected function setBoard(array $board) : self{
        $this->solitaireModel->setBoard($board);
        return $this;
    }

    protected function getInitBoard() : array{
        return $this->solitaireModel->getInitBoard();
    }

    protected function getInvalidStates() : array{
        return $this->solitaireModel->getInvalidStates();
    }

    protected function isInvalidPawn(int $x, int $y) : bool{
        return $this->solitaireModel->isInvalidPosition($x, $y);
    }

    protected function canGo(int $cx, int $cy, int $nx, int $ny) : bool{
        return $this->solitaireModel->canGo($cx, $cy, $nx, $ny);
    }

    protected function move(int $cx, int $cy, int $nx, int $ny){
        $this->solitaireModel->move($cx, $cy, $nx, $ny);
    }

    protected function redirectToLogin(Router $router){
        $router->redirect("/auth/login");
        die();
    }

    protected function redirectToBoard(Router $router){
        $router->redirect("/game/play");
        die();
    }

    /**
     * @return DotNotationArray
     * @throws Error
     * @throws \Exception
     */
    protected function getValidationScheme() : DotNotationArray{
        if(!$this->session->has("validate"))
            throw new Error("No validation scheme available");
        $uri = $this->session->get("validate")["game.play"];
        return DotNotationArray::makeFrom( JsonRead::from($uri)["fields"] );
    }

    protected function validateCurX(Request $rq, Router $router){
        $curX_str = $rq->post("curx");

        if(is_null($curX_str) || strlen($curX_str)===0){
            $this->flash->failure("The current X field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($curX_str)){
            $this->flash->failure("Error in the current X field");
            $this->redirectToBoard($router);
        }
    }

    protected function validateCurY(Request $rq, Router $router){
        $curY_str = $rq->post("cury");
        if(is_null($curY_str) || strlen($curY_str)===0){
            $this->flash->failure("The current Y field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($curY_str)){
            $this->flash->failure("Error in the current Y field");
            $this->redirectToBoard($router);
        }
    }

    protected function validateNextX(Request $rq, Router $router){
        $nextX_str = $rq->post("nextx");
        if(is_null($nextX_str) || strlen($nextX_str)===0){
            $this->flash->failure("The next X field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($nextX_str)){
            $this->flash->failure("Error in the next X field");
            $this->redirectToBoard($router);
        }
    }

    protected function validateNextY(Request $rq, Router $router){
        $nextY_str = $rq->post("nexty");
        if(is_null($nextY_str) || strlen($nextY_str)===0){
            $this->flash->failure("The next Y field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($nextY_str)){
            $this->flash->failure("Error in the next Y field");
            $this->redirectToBoard($router);
        }
    }

    protected function followsPattern(string $str, array $rules) : bool{
        $re = $rules["regex"];
        $regex = "/" . $re . "/";
        return preg_match($regex, $str);
    }

    protected function min(string $str, array $rules) : bool{
        $min = $rules["min"];
        $value = intval($str);
        return $min <= $value;
    }

    protected function max(string $str, array $rules) : bool{
        $max = $rules["max"];
        $value = intval($str);
        return $value <= $max;
    }

    protected function curxValidated(string $curx) : bool{
        $rules = $this->getValidationScheme()["curx.rules"];
        return $this->followsPattern($curx, $rules)
            && $this->min($curx, $rules)
            && $this->max($curx, $rules);
    }

    protected function curyValidated(string $cury) : bool{
        $rules = $this->getValidationScheme()["cury.rules"];
        return $this->followsPattern($cury, $rules)
            && $this->min($cury, $rules)
            && $this->max($cury, $rules);
    }

    protected function nextxValidated(string $nextx) : bool{
        $rules = $this->getValidationScheme()["nextx.rules"];
        return $this->followsPattern($nextx, $rules)
            && $this->min($nextx, $rules)
            && $this->max($nextx, $rules);
    }

    protected function nextyValidated(string $nexty) : bool{
        $rules = $this->getValidationScheme()["nexty.rules"];
        return $this->followsPattern($nexty, $rules)
            && $this->min($nexty, $rules)
            && $this->max($nexty, $rules);
    }
}