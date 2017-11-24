<?php
namespace Project\controllers;


use Project\helpers\http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\helpers\routing\Router;
use Project\helpers\routing\UriParams;
use Throwable;

abstract class A_Controller {
    protected $view;

    public function __construct(I_ViewRenderEngine $renderEngine) {
        $this->view = $renderEngine;
    }

    public function handleRequest(Request $rq, Router $router){
        if($rq->isGet())
            $this->handleGetRequest($rq, $router);
        else if($rq->isPost())
            $this->handlePostRequest($rq, $router);
        else
            $router->getError404Controller()->renderView();
    }

    protected function handleGetRequest(Request $rq, Router $router){
        try {
            $caller = UriParams::fromRequest($rq, $router);
        }catch(Throwable $t){
            return $router->getError404Controller()->renderView();
        }
        $caller->invoke($this->view);
    }

    protected function handlePostRequest(Request $rq, Router $router){
        try {
            $caller = UriParams::fromRequest($rq, $router);
        }catch(Throwable $t){
            return $router->getError404Controller()->renderView();
        }
        $caller->invoke();
    }
}