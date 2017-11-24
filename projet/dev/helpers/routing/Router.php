<?php
namespace Project\Helpers\Routing;

use InvalidArgumentException;
use Project\controllers\A_Controller;
use Project\controllers\A_ErrorController;
use Project\helpers\http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\I_ViewRenderEngine;

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

    public function __construct(I_ViewRenderEngine $renderEngine, A_ErrorController $controller404 ,A_Controller $rootController) {

        $this->renderEngine = $renderEngine;
        $this->controller404 = $controller404;
        $this->rootController = $rootController;
    }

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
                $controller = new $class($this->renderEngine);
                $controller->handleRequest($rq, $this);
                die();
            }
        }

        $this->getError404Controller()->handleRequest($rq, $this);
    }

    public function run(?Request $rq = null){
        if(is_null($rq))
            $rq = new Request();

        $this->handleRequest($rq);
    }

    public function getError404Controller() : A_ErrorController{
        return $this->controller404;
    }

    public function redirect(string $path, int $status=301){
        header("Location: {$path}", true, $status);
    }
}