<?php
namespace Project\controllers;


use Project\helpers\http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\helpers\routing\Router;
use Project\helpers\routing\UriParams;
use Throwable;

/**An abstract class that factorizes the common behavior of controllers
 * Class A_Controller
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
abstract class A_Controller {
    /**The controller's view render engine
     * @var I_ViewRenderEngine
     */
    protected $view;

    /**
     * A_Controller constructor.
     * @param I_ViewRenderEngine $renderEngine
     */
    public function __construct(I_ViewRenderEngine $renderEngine) {
        $this->view = $renderEngine;
    }


    /**Handles a request right from the router
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    public function handleRequest(Request $rq, Router $router){
        if($rq->isGet())
            $this->handleGetRequest($rq, $router);
        else if($rq->isPost())
            $this->handlePostRequest($rq, $router);
        else
            $router->getError404Controller()->renderView();
    }

    /**Handles GET requests
     * @param Request $rq being the current HTTP GET request
     * @param Router $router being the application's router
     */
    protected function handleGetRequest(Request $rq, Router $router){
        try {
            $caller = UriParams::fromRequest($rq, $router);
        }catch(Throwable $t){
            return $router->getError404Controller()->renderView();
        }
        $caller->invoke($this->view);
    }

    /**Handles POST requests
     * @param Request $rq being the current HTTP POST request
     * @param Router $router being the application's router
     */
    protected function handlePostRequest(Request $rq, Router $router){
        try {
            $caller = UriParams::fromRequest($rq, $router);
        }catch(Throwable $t){
            return $router->getError404Controller()->renderView();
        }
        $caller->invoke($this->view);
    }
}