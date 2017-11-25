<?php
namespace Project\controllers;


use Project\helpers\http\Request;
use Project\helpers\routing\Router;

/**Handles HTTP404 (error 404 : page not found)
 * Class PageNotFoundController
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
class PageNotFoundController extends A_ErrorController{
    /**404
     * @var int
     */
    protected $status = 404;

    /**Any incoming request will simply result in rendering the error404 view
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    public function handleRequest(Request $rq, Router $router) {
        $this->renderView();
    }

    /**Render the error 404 view
     */
    public function renderView() {
        parent::renderView();
        $this->view->renderView("404.twig", [
            "pageName" => "error/404"
        ]);
    }

    /**Renders the view for GET requests
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    protected function handleGetRequest(Request $rq, Router $router) {
        $this->renderView();
    }

    /**Renders the view for POST requests
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    protected function handlePostRequest(Request $rq, Router $router) {
        $this->renderView();
    }
}