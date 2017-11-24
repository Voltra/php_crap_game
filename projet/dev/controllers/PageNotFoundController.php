<?php
namespace Project\controllers;


use Project\helpers\http\Request;
use Project\helpers\routing\Router;

class PageNotFoundController extends A_ErrorController{
    protected $status = 404;

    public function handleRequest(Request $rq, Router $router) {
        $this->renderView();
    }

    public function renderView() {
        parent::renderView();
        $this->view->renderView("404.twig", [
            "pageName" => "error/404"
        ]);
    }

    protected function handleGetRequest(Request $rq, Router $router) {}

    protected function handlePostRequest(Request $rq, Router $router) {}
}