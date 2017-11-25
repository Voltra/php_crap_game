<?php
namespace Project\Controllers;


use Project\helpers\http\Request;
use Project\Helpers\Interactions\Session;
use Project\helpers\routing\Router;

/**Render the root ("/") view
 * Class RootController
 * @package Project\Controllers
 */
class RootController extends A_Controller{

    /**Handles requests
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    public function handleRequest(Request $rq, Router $router) {
        if($rq->uri() === "/")
            //TODO: If connected -> go to game
            $router->redirect("/auth/login");
        else
            $router->getError404Controller()->renderView();
    }

    /**
     * @param Request $rq
     * @param Router $router
     */
    protected function handleGetRequest(Request $rq, Router $router) {
        $this->handleRequest($rq, $router);
    }

    /**
     * @param Request $rq
     * @param Router $router
     */
    protected function handlePostRequest(Request $rq, Router $router) {
        $this->handleRequest($rq, $router);
    }
}