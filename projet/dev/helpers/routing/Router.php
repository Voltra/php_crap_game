<?php
namespace Project\Helpers\Routing;

use InvalidArgumentException;
use Project\controllers\A_Controller;
use Project\controllers\A_ErrorController;
use Project\Helpers\Database\DBConnection;
use Project\helpers\http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\I_ViewRenderEngine;

/**A router that dispacthes a request to the corresponding A_Controller
 * Class Router
 * @package Project\Helpers\Routing
 * @author Ludwig GUERIN
 */
class Router {
    /**
     * @var A_Controller
     */
    protected $rootController;

    /**
     * @var A_Controller
     */
    protected $controller404;

    /**
     * @var I_ViewRenderEngine
     */
    protected $renderEngine;

    /**
     * @var DBConnection
     */
    protected $db;

    public function __construct(I_ViewRenderEngine $renderEngine, A_ErrorController $controller404, A_Controller $rootController, DBConnection $db) {
        $this->renderEngine = $renderEngine;
        $this->controller404 = $controller404;
        $this->rootController = $rootController;
        $this->db = $db;
    }

    /**Dispatches the request to the corresponding controller
     * @param Request $rq being the current HTTP request
     */
    protected function handleRequest(Request $rq){
        $uri = $rq->uri();

        if($uri === "/") {
            $this->rootController->handleRequest($rq, $this);
            die();
        }

        $uri_parts = explode("/", $uri);
        array_shift($uri_parts); //Remove empty first element
        if(count($uri_parts) >= 2){
            $class = "Project\\Controllers\\".ucfirst($uri_parts[0])."Controller"; //get class from URL and add uppercase to first letter
            //"auth" => Project\Controllers\AuthController

            if(UriParams::classIsCorrect($class) && !is_subclass_of($class, get_class($this->rootController))){
                $controller = new $class($this->renderEngine, $this->db);
                $controller->handleRequest($rq, $this);
                die();
            }
        }

        $this->getError404Controller()->handleRequest($rq, $this);
    }

    /**Starts the router
     * @param null|Request $rq being the current HTTP request (creates one if not given)
     */
    public function run(?Request $rq = null){
        if(is_null($rq))
            $rq = new Request();

        $this->handleRequest($rq);
    }

    /**Retrieve the error404 controller
     * @return A_ErrorController
     */
    public function getError404Controller() : A_ErrorController{
        return $this->controller404;
    }

    /**Redirect to a certain path
     * @param string $path being the path to redirect to
     * @param int $status being the redirection status (defaulted to 301)
     */
    public function redirect(string $path, int $status=301){
        header("Location: {$path}", true, $status);
    }
}