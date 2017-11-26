<?php
namespace Project\Controllers;

use InvalidArgumentException;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Helpers\Routing\Router;
use Project\models\UserModel;

/**A controller that handles Identification, Authentication and Authorizations
 * Class AuthController
 * @package Project\Controllers
 * @author Ludwig GUERIN
 */
class AuthController extends A_Controller {
    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        parent::__construct($renderEngine, $db);
        $this->model = new UserModel($db);
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @return mixed
     */
    public function register(Request $rq, Router $router){
        if($this->userIsConnected())
            $this->redirectToGame();
        else{
            if($rq->isGet())
                return $this->view->renderView("auth/register.twig", [
                    "pageName" => "auth/register"
                ]);
            else
                return $this->registerForm($rq, $router);
        }
    }

    protected function registerForm(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new InvalidArgumentException("Tried to evaluate a POST request from a non-POST request");

        $username = $rq->post("username");
        if(is_null($username) || empty($username))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "username" => "This field is required"
                ]
            ]);


        if($this->usernameExists($username))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "username" => "This username is already taken, please choose another ones"
                ],
                "username" => $username
            ]);

        $password = $rq->post("password");
        if(is_null($password) || empty($password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "password" => "This field is required"
                ],
                "username" => $username
            ]);

        $c_password = $rq->post("c_password");
        if(is_null($c_password) || empty($c_password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "c_password" => "This field is required"
                ],
                "username" => $username
            ]);

        if($password !== $c_password)
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "c_password" => "Passwords don't match"
                ],
                "username" => $username
            ]);

        $this->registerUserInDatabase($username, $password);
        //TODO: flash message registered success
        $router->redirect("/auth/login");
        die();
    }

    /**Handle a request to the login page
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    public function login(Request $rq, Router $router){
        if($this->userIsConnected()){
            $this->redirectToGame();
        }else{
            if($rq->isGet())
                return $this->view->renderView("auth/login.twig", [
                    "pageName" => "auth/login"
                ]);
            else
                return $this->loginForm($rq, $router);
        }
    }

    /**Handle logout requests
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     */
    public function logout(Request $rq, Router $router){
        if($this->userIsConnected() && $rq->isGet()) {
            $this->disconnectUser();
            //TODO: flash message for correct disconnection
            $router->redirect("/auth/login");
            die();
        }
        //TODO: go back one page
    }

    /**Handles POST request for the login form
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed
     */
    protected function loginForm(Request $rq, Router $router){
        if(!$rq->isPost())
            throw new InvalidArgumentException("Tried to evaluate a POST request from a non-POST request");

        $username = $rq->post("username");
        if(is_null($username) || empty($username))
            return $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login",
                "error" => [
                    "username" => "This field is required"
                ]
            ]);

        $remember = $rq->post("remember");

        if(!$this->usernameExists($username))
            return $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login",
                "error" => [
                    "username" => "This username doesn't exist in the database"
                ],
                "username" => $username,
                "remember" => $remember
            ]);

        $password = $rq->post("password");
        if(is_null($password) || empty($password))
            return $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login",
                "error" => [
                    "password" => "This field is required"
                ],
                "username" => $username,
                "remember" => $remember
            ]);

        if(!$this->passwordMatches($username, $password))
            return $this->view->renderView("auth/login.twig", [
                "pageName" => "auth/login",
                "error" => [
                    "password" => "Passwords don't match"
                ],
                "username" => $username,
                "remember" => $remember
            ]);

        $this->connectUser($username);

        //TODO: if remember, set remember token system
        return $this->view->renderView("", []);
    }

    /**Determines whether or not the username exists in the database
     * @param string $username being the username
     * @return bool
     */
    protected function usernameExists(string $username) : bool{
        return $this->model->usernameAlreadyExists($username);
    }

    /**Determines whether or not the password given matches the one in the database for the given username
     * @param string $username
     * @param string $pwd
     * @return bool
     */
    protected function passwordMatches(string $username, string $pwd) : bool{
        return $this->model->passwordMatches($username, $pwd);
    }

    /**Determines whether or not the user is already connected
     * @return bool
     */
    protected function userIsConnected() : bool{
        $session = new Session();
        return $session->has("connected");
    }

    /**Connects the user if it was not connected
     * @param string $username being the user's username
     */
    protected function connectUser(string $username){
        if(!$this->userIsConnected()){
            $session = new Session();
            $session->set("connected", $username);
        }
    }

    /**Disconnects the user (if it was connected)
     */
    protected function disconnectUser(){
        if($this->userIsConnected()){
            $session = new Session();
            $session->unset("connected");
        }
    }

    protected function redirectToGame(){
        //TODO: redirect to the game
        die();
    }

    protected function registerUserInDatabase(string $username, string $password){
        $this->model->insert($username, $password);
    }
}