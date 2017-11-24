<?php
namespace Project\Helpers\Http;


use Exception;

class Request {
    const BAD_REQUEST_METHOD = "Bad request method";
    const BAD_INDEX = "No such index";

    public function getMethod() : string{
        return $_SERVER["REQUEST_METHOD"];
    }

    public function isPost() : bool{
        return $this->getMethod() === "POST";
    }

    public function isGet() : bool{
        return $this->getMethod() === "GET";
    }

    public function get(string $key) : string{
        if(!$this->isGet())
            throw new Exception(self::BAD_REQUEST_METHOD);

        if(!isset($_GET[$key]))
            throw new Exception(self::BAD_INDEX);

        return $_GET[$key];
    }

    public function post(string $key) : string{
        if(!$this->isPost())
            throw new Exception(self::BAD_REQUEST_METHOD);

        if(!isset($_POST[$key]))
            throw new Exception(self::BAD_INDEX);

        return $_POST[$key];
    }

    public function uri() : string{
        return $_SERVER["REQUEST_URI"];
    }
}