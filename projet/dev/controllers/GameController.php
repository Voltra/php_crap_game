<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 28/11/2017
 * Time: 14:15
 */

namespace Project\controllers;


use Error;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Helpers\Routing\Router;
use Project\models\LobbyModel;

class GameController extends A_Controller {
    /**
     * @var Session
     */
    protected $session;

    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        parent::__construct($renderEngine, $db);
        $this->model = new LobbyModel($db);
        $this->session = new Session();
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

        if(!$this->session->has("board"))
            $this->session->set("board", $this->getInitBoard());

        return $this->view->renderView("game/play.twig", [
            "pageName" => "game/play",
            "username" => $this->getUsername(),
            "board" => $this->session->get("board")
        ]);
    }

    public function processAction(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new Error("Tried to access via GET a feature that can only be accessed via POST");
        //TODO: BackEnd validation
        //TODO: Process move

        $router->redirect("/game/play");
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

    /**Retrieve the initial board
     * @return array
     */
    protected function getInitBoard() : array{
        $arr = [];
        for($i = 0 ; $i < 7 ; $i+=1)
            $arr[$i] = [];


        for($x = 0 ; $x < 7 ; $x+=1){
            for($y = 0 ; $y < 7 ; $y+=1){
                switch($y){
                    case 0: case 6:
                        $arr[$x][$y] =($x < 5 && $x > 1);
                        break;
                    case 1: case 5:
                        $arr[$x][$y] = ($x < 6 && $x > 0);
                        break;
                    case 2: case 4:
                        $arr[$x][$y] = true;
                        break;
                    case 3:
                        $arr[$x][$y] = ($x != 3);
                        break;
                    default:
                        break;
                }
            }
        }

        /*var_dump($arr);
        die();*/
        return $arr;
    }

    protected function redirectToLogin(Router $router){
        $router->redirect("/auth/login");
    }

    protected function redirectToBoard(Router $router){
        $router->redirect("/game/play");
    }
}