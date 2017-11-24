<?php
namespace Project\controllers;

use Exception;

abstract class A_ErrorController extends A_Controller{
    protected $status = null;
    public function renderView(){
        if(is_null($this->status))
            throw new Exception("Must override this method");
        http_response_code($this->status);
    }
}