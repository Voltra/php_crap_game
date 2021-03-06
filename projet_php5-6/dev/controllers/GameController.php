<?php
namespace Project\controllers;


use Exception;
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

    /**Handles GET requests for /game/play
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Exception
     */
    public function play(Request $rq, Router $router){
        /*$this->solitaireModel->unsetBoard();
        die();*/

        if(!$this->userIsConnected())
            return $this->redirectToLogin($router);

        if(!$rq->isGet())
            throw new Exception("This page can only be accessed via a GET HTTP request");

        $this->getBoard(); //Create cache copy in case there's no board

        /*echo "<br/><br/>Won:<br/>";
        var_dump($this->userWon());
        echo "<br/><br/>Lost:<br/>";
        var_dump($this->userLost());
        echo "<br/><br/>Board:<br/>";
        var_dump($this->getBoard());
        die();*/

        if($this->userWon() || $this->userLost()){
            $this->addLobbyToDb();
            $this->session->set("end", true);
            return $router->redirect("/game/end");
        }

        return $this->view->renderView("game/play.twig", [
            "pageName" => "game/play",
            "username" => $this->getUsername(),
            "board" => $this->getBoard(),
            "invalids" => $this->getInvalidStates(),
            "canUndo" => $this->canUndo()
        ]);
    }

    /**Handles POST requests for /game/processAction
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Exception
     * @throws \Exception
     */
    public function processAction(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Exception("Tried to access via GET a feature that can only be accessed via POST");

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
            return $this->redirectToBoard($router);
        }

        if(!$this->canGo($curX, $curY, $nextX, $nextY)){
            $this->flash->failure("Invalid move");
            return $this->redirectToBoard($router);
        }
        $this->move($curX, $curY, $nextX, $nextY);

        return $this->redirectToBoard($router);
    }

    /**Handles POST requests for /game/reset
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Exception
     */
    public function reset(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Exception("Tried to access via GET a feature that can only be accessed via POST");

        $this->session->_unset(self::PREV_BOARD_SESSION_KEY);
        $this->session->_unset(self::BOARD_SESSION_KEY);
        return $this->redirectToBoard($router);
    }

    /**Handles GET requests
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Exception
     */
    public function end(Request $rq, Router $router){
        if(!$rq->isGet())
            throw new Exception("POST instead of GET");

        if(!$this->session->has("end"))
            return $this->redirectToBoard($router);

        $userWon = $this->userWon();

        if($userWon)
            $this->flash->success("You won ! We will take that into account !");
        else
            $this->flash->failure("You lost ! You will do better next time !");

        $this->session->_unset("end");
        $this->solitaireModel->unsetBoard();

        $chartData = [
            "title" => "Victories/Defeats",
            "points" => [
                ["name"=>"victory", "y"=>$this->getWinAmount(), "sliced"=>true, "selected"=>true],
                ["name"=>"defeat", "y"=>$this->getLossAmount()],
            ]
        ];

        return $this->view->renderView("game/end.twig", [
            "pageName" => "game/end",
            "username" => $this->getUsername(),
            "won" => $userWon,
            "winAmount" => $this->getWinAmount(),
            "lossAmount" => $this->getLossAmount(),
            "lobbiesAmount" => $this->getLobbiesAmount(),
            "winRatio" => 100*$this->getWinRatio(),
            "chartData" => json_encode($chartData),
            "statsForThreeBests" => $this->getStatsForTheThreeBest(),
            "statsKeys" => $this->getStatsKeys()
        ]);
    }

    /**Handles POST requests to /game/undo
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     * @throws Exception
     */
    public function undo(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Exception("Tried to access via GET a feature that can only be accessed via POST");

        if(!$this->session->has(self::PREV_BOARD_SESSION_KEY))
            throw new Exception("The undo feature is unavailable");


        if($this->canUndo()) {
            $prevBoard = $this->getLastBackup();
            $this->setBoard($prevBoard)->removeLastBackup();
        }

        return $this->redirectToBoard($router);
    }

    /**Handles POST requests to /game/instant_lose if debug mode is on
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    public function instant_lose(Request $rq, Router $router){
        if($this->session->has("isDebug")) {
            if ($rq->isPost() && $this->session->get("isDebug"))
                $this->setBoard($this->solitaireModel->getInstantLosingBoard());
        }

        return $this->redirectToBoard($router);
    }

    /**Handles POST requests to /game/instant_win if debug mode is on
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    public function instant_win(Request $rq, Router $router){
        if($this->session->has("isDebug")) {
            if ($rq->isPost() && $this->session->get("isDebug"))
                $this->setBoard($this->solitaireModel->getInstantWinBoard());
        }

        return $this->redirectToBoard($router);
    }

    /**Handles POST requests to /game/get_win if debug mode is on
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    public function get_win(Request $rq, Router $router){
        if($this->session->has("isDebug")) {
            if ($rq->isPost() && $this->session->get("isDebug"))
                $this->setBoard($this->solitaireModel->getWinningBoard());
        }

        return $this->redirectToBoard($router);
    }

    /**Handles POST requests to /game/get_losing if debug mode is on
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    public function get_losing(Request $rq, Router $router){
        if($this->session->has("isDebug")) {
            if ($rq->isPost() && $this->session->get("isDebug"))
                $this->setBoard($this->solitaireModel->getLosingBoard());
        }

        return $this->redirectToBoard($router);
    }


    /**Determines whether or not the user can undo the last move
     * @return bool
     */
    protected function canUndo(){
        $prev_board = $this->getLastBackup();
        $initBoard = $this->getInitBoard();
        $board = $this->getBoard();

        /*var_dump($prev_board, $initBoard, $board);
        die();*/
        return !(is_null($prev_board) || $board==$initBoard);
    }

    /**Makes a backup from the given board
     * @param array $board being the board to make a backup from
     * @return $this
     */
    protected function addBackup(array $board){
        $this->solitaireModel->addBackup($board);
        return $this;
    }

    /**Retrieves the last backup
     * @return array|null
     */
    protected function getLastBackup(){
        return $this->solitaireModel->getLastBackup();
    }

    /**Deletes the last backup
     * @return $this
     */
    protected function removeLastBackup(){
        $this->solitaireModel->deleteLastBackup();
        return $this;
    }

    /**
     * @see SolitaireModel::won
     */
    protected function userWon(){
        return $this->solitaireModel->won();
    }

    /**
     * @see SolitaireModel::lost
     */
    protected function userLost(){
        return $this->solitaireModel->lost();
    }

    /**Adds the current lobby to the database
     */
    protected function addLobbyToDb(){
        $username = $this->getUsername();
        $won = $this->userWon();

        $this->model->insert($username, $won);
    }

    /**Determines whether or not the user is connected
     * @return bool
     */
    protected function userIsConnected(){
        return $this->session->has("connected");
    }

    /**Retrieve the user's username
     * @return null|string
     */
    protected function getUsername(){
        if($this->userIsConnected())
            return $this->session->get("connected");
        else
            return null;
    }

    /**
     * @see SolitaireModel::getBoard
     */
    protected function getBoard(){
        return $this->solitaireModel->getBoard();
    }

    /**
     * @see SolitaireModel::setBoard
     */
    protected function setBoard(array $board){
        $this->solitaireModel->setBoard($board);
        return $this;
    }

    /**
     * @see SolitaireModel::getInitBoard
     */
    protected function getInitBoard(){
        return $this->solitaireModel->getInitBoard();
    }

    /**
     * @see SolitaireModel::getInvalidStates
     */
    protected function getInvalidStates(){
        return $this->solitaireModel->getInvalidStates();
    }

    /**
     * @see SolitaireModel::isInvalidPosition
     */
    protected function isInvalidPawn($x, $y){
        return $this->solitaireModel->isInvalidPosition($x, $y);
    }

    /**
     * @see SolitaireModel::canGo
     */
    protected function canGo($cx, $cy, $nx, $ny){
        return $this->solitaireModel->canGo($cx, $cy, $nx, $ny);
    }

    /**
     * @see SolitaireModel::move
     */
    protected function move($cx, $cy, $nx, $ny){
        $this->solitaireModel->move($cx, $cy, $nx, $ny);
    }

    /**
     * @see LobbyModel::getAmountOfWinsFor
     */
    protected function getWinAmount(){
        return $this->model->getAmountOfWinsFor($this->getUsername());
    }

    /**
     * @see LobbyModel::getAmountOfLossFor
     */
    protected function getLossAmount(){
        return $this->model->getAmountOfLossFor($this->getUsername());
    }

    /**
     * @see LobbyModel::getAmountOfLobbiesFor
     */
    protected function getLobbiesAmount(){
        return $this->model->getAmountOfLobbiesFor($this->getUsername());
    }

    /**
     * @see LobbyModel::getWinRatioFor
     */
    protected function getWinRatio(){
        return $this->model->getWinRatioFor($this->getUsername());
    }

    /**
     * @see LobbyModel::getStatsForTheThreeBest
     */
    protected function getStatsForTheThreeBest(){
        return $this->model->getStatsForTheThreeBest();
    }

    /**
     * @see LobbyModel::getStatsKeys
     */
    protected function getStatsKeys(){
        return $this->model->getStatsKeys();
    }

    /**Redirects to the login page
     * @param Router $router being the application's router
     * @return mixed
     */
    protected function redirectToLogin(Router $router){
        return $router->redirect("/auth/login");
    }

    /**Redirects to the board's page
     * @param Router $router being the application's router
     * @return mixed
     */
    protected function redirectToBoard(Router $router){
        return $router->redirect("/game/play");
    }

    /**
     * @return DotNotationArray
     * @throws Exception
     * @throws \Exception
     */
    protected function getValidationScheme(){
        if(!$this->session->has("validate"))
            throw new Exception("No validation scheme available");
        $uri = $this->session->get("validate")["game.play"];
        return DotNotationArray::makeFrom( JsonRead::from($uri)["fields"] );
    }

    /**Processes the validation of the current x-coordinate
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @throws \Exception
     */
    protected function validateCurX(Request $rq, Router $router){
        $curX_str = $rq->post("curx");

        if(is_null($curX_str) || strlen($curX_str)===0){
            $this->flash->failure("The current X field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($curX_str)){
            $this->flash->failure("Exception in the current X field");
            $this->redirectToBoard($router);
        }
    }

    /**Processes the validation of the current y-coordinate
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @throws \Exception
     */
    protected function validateCurY(Request $rq, Router $router){
        $curY_str = $rq->post("cury");
        if(is_null($curY_str) || strlen($curY_str)===0){
            $this->flash->failure("The current Y field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($curY_str)){
            $this->flash->failure("Exception in the current Y field");
            $this->redirectToBoard($router);
        }
    }

    /**Processes the validation of the next x-coordinate
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @throws \Exception
     */
    protected function validateNextX(Request $rq, Router $router){
        $nextX_str = $rq->post("nextx");
        if(is_null($nextX_str) || strlen($nextX_str)===0){
            $this->flash->failure("The next X field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($nextX_str)){
            $this->flash->failure("Exception in the next X field");
            $this->redirectToBoard($router);
        }
    }

    /**Processes the validation of the next y-coordinate
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @throws \Exception
     */
    protected function validateNextY(Request $rq, Router $router){
        $nextY_str = $rq->post("nexty");
        if(is_null($nextY_str) || strlen($nextY_str)===0){
            $this->flash->failure("The next Y field is required");
            $this->redirectToBoard($router);
        }

        if(!$this->curxValidated($nextY_str)){
            $this->flash->failure("Exception in the next Y field");
            $this->redirectToBoard($router);
        }
    }

    /**Determines whether or not a string follows a certain pattern (regex)
     * @param string $str being the string to test upon
     * @param array $rules being the set of rules to get the regex from
     * @return bool
     */
    protected function followsPattern($str, array $rules){
        $re = $rules["regex"];
        $regex = "/" . $re . "/";
        return preg_match($regex, $str);
    }

    /**Determines whether or not a value is greater than a certain value
     * @param string $str being the string to test upon
     * @param array $rules being the set of rules to get the minimum from
     * @return bool
     */
    protected function min($str, array $rules){
        $min = $rules["min"];
        $value = intval($str);
        return $min <= $value;
    }

    /**Determines whether or not a value is less than a certain value
     * @param string $str being the string to test upon
     * @param array $rules being the set of rules to get the maximum from
     * @return bool
     */
    protected function max($str, array $rules){
        $max = $rules["max"];
        $value = intval($str);
        return $value <= $max;
    }

    /**Determines whether or not the current x-coordinate is validated according to the rules defined in the JSON file
     * @param string $curx being the current x-coordinate
     * @return bool
     * @throws Exception
     * @throws \Exception
     */
    protected function curxValidated($curx){
        $rules = $this->getValidationScheme()["curx.rules"];
        return $this->followsPattern($curx, $rules)
            && $this->min($curx, $rules)
            && $this->max($curx, $rules);
    }

    /**Determines whether or not the current y-coordinate is validated according to the rules defined in the JSON file
     * @param string $cury being the current y-coordinate
     * @return bool
     * @throws Exception
     * @throws \Exception
     */
    protected function curyValidated($cury){
        $rules = $this->getValidationScheme()["cury.rules"];
        return $this->followsPattern($cury, $rules)
            && $this->min($cury, $rules)
            && $this->max($cury, $rules);
    }

    /**Determines whether or not the next x-coordinate is validated according to the rules defined in the JSON file
     * @param string $nextx being the next x-coordinate
     * @return bool
     * @throws Exception
     * @throws \Exception
     */
    protected function nextxValidated($nextx){
        $rules = $this->getValidationScheme()["nextx.rules"];
        return $this->followsPattern($nextx, $rules)
            && $this->min($nextx, $rules)
            && $this->max($nextx, $rules);
    }


    /**Determines whether or not the next y-coordinate is validated according to the rules defined in the JSON file
     * @param string $nexty being the next y-coordinate
     * @return bool
     * @throws Exception
     * @throws \Exception
     */
    protected function nextyValidated($nexty){
        $rules = $this->getValidationScheme()["nexty.rules"];
        return $this->followsPattern($nexty, $rules)
            && $this->min($nexty, $rules)
            && $this->max($nexty, $rules);
    }
}