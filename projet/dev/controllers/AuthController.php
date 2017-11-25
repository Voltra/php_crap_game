<?php
namespace Project\Controllers;

use Project\Helpers\Http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Routing\Router;

/**A controller that handles Identification, Authentication and Authorizations
 * Class AuthController
 * @package Project\Controllers
 * @author Ludwig GUERIN
 */
class AuthController extends A_Controller {
    /**Handle a request to the login page
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    public function login(Request $rq, Router $router){
        $session = new Session();
        if($session->has("connected")){
            //TODO: If connected redirect to the game
        }else
            $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login"
            ]);
    }
}