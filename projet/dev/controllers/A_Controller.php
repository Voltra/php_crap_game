<?php
namespace Project\controllers;


use InvalidArgumentException;
use Project\Helpers\Database\DBConnection;
use Project\helpers\http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\helpers\routing\Router;
use Project\helpers\routing\UriParams;
use Project\Models\A_Model;
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

    /**The model that this controller has access to
     * @var A_Model
     */
    protected $model;

    /**The database connection
     * @var DBConnection
     */
    private $db;

    /**
     * A_Controller constructor.
     * @param I_ViewRenderEngine $renderEngine
     * @param DBConnection $db
     */
    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        $this->view = $renderEngine;
        $this->db = $db;
        $this->model = null;
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
        $caller->invoke($this->view, $this->db);
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
        $caller->invoke($this->view, $this->db);
    }
}