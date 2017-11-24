<?php
namespace Project\Helpers\Routing;

use InvalidArgumentException;
use Project\controllers\A_Controller;
use Project\helpers\http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;

class UriParams {
    protected $_class;
    protected $_method;
    protected $_arguments;

    public function __construct(string $class, string $method, array $args = []) {
        self::checkClass($class);
        self::checkMethod($class, $method);

        $this->_class = $class;
        $this->_method = $method;
        $this->_arguments = $args;
    }

    public function invoke(I_ViewRenderEngine $renderEngine){
        $instance = new $this->_class($renderEngine);
        call_user_func_array([$instance, $this->_method], $this->_arguments);
    }

    public static function checkClass(string $class){
        if(!class_exists($class))
            throw new InvalidArgumentException("'{$class}' is currently undefined");

        if(!is_subclass_of($class, A_Controller::class)) {
            $abstractController = A_Controller::class;
            throw new InvalidArgumentException("'{$class}' is not a subclass of '{$abstractController}'");
        }
    }

    public static function classIsCorrect(string $class) : bool{
        try{
            self::checkClass($class);
        }catch (InvalidArgumentException $e){
            echo $e->getMessage();
            return false;
        }

        return true;
    }

    public static function checkMethod(string $class, string $method){
        if(!in_array($method, get_class_methods($class)))
            throw new InvalidArgumentException("'{$class}' has no method '{$method}'");

        if(!is_callable([$class, $method]))
            throw new InvalidArgumentException("{$class}'s method '{$method}' cannot be invoked");
    }

    public static function methodIsCorrect(string $class, string $method) : bool{
        try{
            self::checkMethod($class, $method);
        }catch (InvalidArgumentException $e){
            return false;
        }

        return true;
    }

    public static function fromRequest(Request $rq, Router $router) : UriParams{
        $uri = $rq->uri();
        $uri_parts = explode("/", $uri);
        array_shift($uri_parts); //Remove empty first element
        if(count($uri_parts) >= 2){
            $class = "Project\\Controllers\\".ucfirst($uri_parts[0])."Controller";
            $method = $uri_parts[1];
            $args = array_filter($uri_parts, function($index){
                return ($index >= 2);
            }, ARRAY_FILTER_USE_KEY);
            $args = array_merge($args, [
                $rq,
                $router
            ]);

            return new UriParams($class, $method, $args);
        }

        throw new InvalidArgumentException("Bad request URI");
    }
}