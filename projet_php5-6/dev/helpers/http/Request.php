<?php
namespace Project\Helpers\Http;


use Exception;

/**A class that represent an HTTP request as an object
 * Class Request
 * @package Project\Helpers\Http
 * @author Ludwig GUERIN
 */
class Request {
    const BAD_REQUEST_METHOD = "Bad request method";
    const BAD_INDEX = "No such index";

    /**Retrieve the request's method
     * @return string
     */
    public function getMethod(){
        return $_SERVER["REQUEST_METHOD"];
    }

    /**Determine whether or not this is a POST request
     * @return bool
     */
    public function isPost(){
        return $this->getMethod() === "POST";
    }

    /**Determine whether or not this is a GET request
     * @return bool
     */
    public function isGet(){
        return $this->getMethod() === "GET";
    }

    /**Retrieve a parameter from the GET request
     * @param string $key being the key to the desired data
     * @return null|string ?string
     * @throws Exception
     */
    public function get($key){
        if(!$this->isGet())
            throw new Exception(self::BAD_REQUEST_METHOD);

        if(!isset($_GET[$key]))
            return null;

        return $_GET[$key];
    }

    /**Retrieve data from the POST request
     * @param string $key being the key to the desired data
     * @return null|string
     * @throws Exception
     */
    public function post($key){
        if(!$this->isPost())
            throw new Exception(self::BAD_REQUEST_METHOD);

        if(!isset($_POST[$key]))
            return null;

        return $_POST[$key];
    }

    /**Retrieve the request's URI / requested URI
     * @return string
     */
    public function uri(){
        $url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://{$_SERVER["HTTP_HOST"]}{$_SERVER["REQUEST_URI"]}";
        return str_ireplace(BASE_URL, "", $url);
        //return $_SERVER["REQUEST_URI"];
    }
}