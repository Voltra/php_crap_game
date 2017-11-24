<?php
namespace Project\Controllers;


use Project\helpers\http\Request;
use Project\Helpers\Interactions\Session;
use Project\helpers\routing\Router;

class RootController extends A_Controller{

    public function handleRequest(Request $rq, Router $router) {
        if($rq->uri() === "/")
            $router->redirect("/auth/login");
        else
            $router->getError404Controller()->renderView();
    }

    protected function handleGetRequest(Request $rq, Router $router) {
        $this->handleRequest($rq, $router);
    }

    protected function handlePostRequest(Request $rq, Router $router) {
        $this->handleRequest($rq, $router);
    }
}