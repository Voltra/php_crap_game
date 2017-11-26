<?php
namespace Project\controllers;

use Exception;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Models\A_Model;

/**
 * Class A_ErrorController
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
abstract class A_ErrorController extends A_Controller{

    /**The HTTP response status
     * @var null|int
     */
    protected $status = null;

    /**Render the error's view
     * @throws Exception
     */
    public function renderView(){
        if(is_null($this->status))
            throw new Exception("Must override this method");
        http_response_code($this->status);
    }
}