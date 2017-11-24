<?php
namespace Project\Controllers;

use Project\Helpers\Http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Routing\Router;

class AuthController extends A_Controller {
    public function login(Request $rq, Router $router){
        $session = new Session();
        if($session->has("connected")){
            //TODO: If connected redirect to the game
        }else
            $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login"
            ]);
    }
}