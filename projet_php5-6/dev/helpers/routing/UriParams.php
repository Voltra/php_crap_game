<?php
namespace Project\Helpers\Routing;

use InvalidArgumentException;
use Project\controllers\A_Controller;
use Project\Helpers\Database\DBConnection;
use Project\helpers\http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Models\A_Model;

/**A helper class that splits a URI into different parameters, CodeIgniter style (which is bad but ykwim)
 * Class UriParams
 * @package Project\Helpers\Routing
 * @author Ludwig GUERIN
 */
class UriParams {
    /**The controller's class name
     * @var string
     */
    protected $_class;

    /**The method to call
     * @var string
     */
    protected $_method;

    /**The arguments to pass
     * @var array
     */
    protected $_arguments;

    public function __construct($class, $method, array $args = []) {
        self::checkClass($class);
        self::checkMethod($class, $method);

        $this->_class = $class;
        $this->_method = $method;
        $this->_arguments = $args;
    }

    /**Invokes the function with the given parameters
     * @param I_ViewRenderEngine $renderEngine
     * @param DBConnection $db
     */
    public function invoke(I_ViewRenderEngine $renderEngine, DBConnection $db){
        $instance = new $this->_class($renderEngine, $db);
        call_user_func_array([$instance, $this->_method], $this->_arguments);
    }

    /**Checks if the class is valid (throws errors if not)
     * @param string $class being the controller's class name
     */
    public static function checkClass($class){
        if(!class_exists($class))
            throw new InvalidArgumentException("'{$class}' is currently undefined");

        if(!is_subclass_of($class, A_Controller::class)) {
            $abstractController = A_Controller::class;
            throw new InvalidArgumentException("'{$class}' is not a subclass of '{$abstractController}'");
        }
    }

    /**Determines whether or not the class is correct
     * @param string $class being the controller's class name
     * @return bool
     */
    public static function classIsCorrect($class){
        try{
            self::checkClass($class);
        }catch (InvalidArgumentException $e){
            echo $e->getMessage();
            return false;
        }

        return true;
    }

    /**Checks if the method is valid for the given controller's class name (throws error if not)
     * @param string $class being the controller's class name
     * @param string $method being the method's name
     */
    public static function checkMethod($class, $method){
        if(!in_array($method, get_class_methods($class)))
            throw new InvalidArgumentException("'{$class}' has no method '{$method}'");

        if(!is_callable([$class, $method]))
            throw new InvalidArgumentException("{$class}'s method '{$method}' cannot be invoked");
    }

    /**Determines whether or not the method is correct
     * @param string $class being the controller's class name
     * @param string $method being the method's name
     * @return bool
     */
    public static function methodIsCorrect($class, $method){
        try{
            self::checkMethod($class, $method);
        }catch (InvalidArgumentException $e){
            return false;
        }

        return true;
    }

    /**Build a UriParams from a request and the router
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return UriParams
     */
    public static function fromRequest(Request $rq, Router $router){
        $uri = $rq->uri();
        $uri_parts = explode("/", $uri);
        array_shift($uri_parts); //Remove empty first element
        if(count($uri_parts) >= 2){
            $class = "Project\\Controllers\\".ucfirst($uri_parts[0])."Controller";
            $method = $uri_parts[1];
            $args = array_filter($uri_parts, function($index){
                return ($index >= 2);
            }, ARRAY_FILTER_USE_KEY);
            $args = array_merge([
                $rq,
                $router
            ], $args);

            return new UriParams($class, $method, $args);
        }

        throw new InvalidArgumentException("Bad request URI");
    }
}