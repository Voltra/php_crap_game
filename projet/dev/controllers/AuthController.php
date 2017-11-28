<?php
namespace Project\Controllers;

use Exception;
use InvalidArgumentException;
use Project\Helpers\Collections\DotNotationArray;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\helpers\interactions\FlashService;
use Project\Helpers\Interactions\Session;
use Project\helpers\JsonRead;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\Helpers\Routing\Router;
use Project\models\UserModel;

/**A controller that handles Identification, Authentication and Authorizations
 * Class AuthController
 * @package Project\Controllers
 * @author Ludwig GUERIN
 */
class AuthController extends A_Controller {
    /**
     * @var FlashService
     */
    protected $flash;

    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        parent::__construct($renderEngine, $db);
        $this->model = new UserModel($db);
        $this->flash = (new Session())->get("sharedFlashService");
    }

    /**
     * @param Request $rq
     * @param Router $router
     * @return mixed
     */
    public function register(Request $rq, Router $router){
        if($this->userIsConnected())
            $this->redirectToGame($router);
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

        //Checks if the field has been filled
        $username = $rq->post("username");
        if(is_null($username) || empty($username))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "username" => "This field is required"
                ]
            ]);


        //Checks if the front-end validation rules apply to this
        if(!$this->registerUsernameValidated($username))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "username" => "Error while validating data on the server"
                ]
            ]);

        //Checks if the username is available
        if($this->usernameExists($username))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "username" => "This username is already taken, please choose another one"
                ],
                "username" => $username
            ]);

        //Checks if the password field has been filled
        $password = $rq->post("password");
        if(is_null($password) || empty($password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "password" => "This field is required"
                ],
                "username" => $username
            ]);

        //Checks if the front-end rules apply to this
        if(!$this->registerPasswordValidated($password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "password" => "Error while validating data on the server"
                ],
                "username" => $username
            ]);

        //Checks if the c_password field has been filled
        $c_password = $rq->post("c_password");
        if(is_null($c_password) || empty($c_password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "c_password" => "This field is required"
                ],
                "username" => $username
            ]);

        //Checks if the front-end rules apply to this
        if(!$this->registerConfirmPasswordValidated($c_password, $password))
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "c_password" => "Error while validating data on the server"
                ],
                "username" => $username
            ]);

        //Checks if passwords aren't the same
        if($password !== $c_password)
            return $this->view->renderView("auth/register.twig", [
                "pageName" => "auth/register",
                "error" => [
                    "c_password" => "Passwords don't match"
                ],
                "username" => $username
            ]);

        //Registers the user in the database
        $this->registerUserInDatabase($username, $password);
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
            $this->redirectToGame($router);
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
            $this->flash->success("You have successfully been logged out.");
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
        return $this->redirectToGame($router);
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
    protected function connectUser(string $username) : void{
        if(!$this->userIsConnected()){
            $session = new Session();
            $session->set("connected", $username);
        }
    }

    /**Disconnects the user (if it was connected)
     */
    protected function disconnectUser() : void{
        if($this->userIsConnected()){
            $session = new Session();
            $session->unset("connected");
        }
    }

    /** Redirects to the game
     * @param Router $router being the application's router
     */
    protected function redirectToGame(Router $router){
        $router->redirect("/game/play");
    }

    /**Register a new user in the database
     * @param string $username being its username
     * @param string $password being its password (clear, will be hashed before insertion in the DB, cf. UserModel)
     */
    protected function registerUserInDatabase(string $username, string $password) : void{
        $this->model->insert($username, $password);
    }

    /**Retrieves the validation scheme for the login form
     * @return DotNotationArray
     */
    protected function getLoginValidationScheme() : DotNotationArray{
        return $this->getValidationSchemeFor("login");
    }

    /**Retrieves the validation scheme for the register form
     * @return DotNotationArray
     */
    protected function getRegisterValidationScheme() : DotNotationArray{
        return $this->getValidationSchemeFor("register");
    }

    /**Retrieves the validation scheme for the given part
     * @param string $name being the name of the part to retrieve
     * @return DotNotationArray
     * @throws Exception
     */
    protected function getValidationSchemeFor(string $name) : DotNotationArray{
        $session = new Session();
        if(!$session->has("validate"))
            throw new Exception("No validation scheme available");

        $validationPath = $session->get("validate")["auth.{$name}"];
        $validationScheme = JsonRead::from($validationPath);

        if(!is_array($validationScheme))
            throw new Exception("Invalid json validation scheme");

        return DotNotationArray::makeFrom($validationScheme)["fields"];
    }

    /**Checks if the string follows the format enunciated in the rules
     * @param string $str being the string to test
     * @param array $rules being the rules
     * @return bool
     */
    protected function followsFormat(string $str, array $rules) : bool{
        $re = $rules["regex"];
        $regex = "/" . $re . "/";
        return preg_match($regex, $str);
    }

    /**Checks if the string is of sufficient size
     * @param string $str being the string to test
     * @param array $rules being the rules
     * @return bool
     */
    protected function minLength(string $str, array $rules) : bool{
        $minLength = $rules["minLength"];
        return $minLength <= strlen($str);
    }

    /**Checks if the string does not exceed the character limit size
     * @param string $str being the string to test
     * @param array $rules being the rules
     * @return bool
     */
    protected function maxLength(string $str, array $rules) : bool{
        $maxLength = $rules["maxLength"];
        return strlen($str) <= $maxLength;
    }

    /**Determines whether a string is the same as another
     * @param string $lhs being the string on test
     * @param string $rhs being the string to be compared to
     * @return bool
     */
    protected function sameAs(string $lhs, string $rhs) : bool{
        return $lhs === $rhs;
    }

    /**Validates the username field for the login form
     * @param string $username being the username to validate
     * @return bool
     */
    protected function loginUsernameValidated(string $username) : bool{
        $rules = $this->getLoginValidationScheme()["username.rules"];
        return $this->followsFormat($username, $rules)
            && $this->minLength($username, $rules)
            && $this->maxLength($username, $rules);
    }

    /**Validates the password field for the login form
     * @param string $password being the password to validate
     * @return bool
     */
    protected function loginPasswordValidated(string $password) : bool{
        $rules = $this->getLoginValidationScheme()["password.rules"];
        return $this->minLength($password, $rules);
    }

    /**Validates the username field for the register form
     * @param string $username being the username to validate
     * @return bool
     */
    protected function registerUsernameValidated(string $username) : bool{
        $rules = $this->getRegisterValidationScheme()["username.rules"];
        return $this->followsFormat($username, $rules)
            && $this->minLength($username, $rules)
            && $this->maxLength($username, $rules);
    }

    /**Validates the password field for the register form
     * @param string $password being the password to validate
     * @return bool
     */
    protected function registerPasswordValidated(string $password) : bool{
        $rules = $this->getRegisterValidationScheme()["password.rules"];
        return $this->minLength($password, $rules);
    }

    /**Validates the confirm password field for the register form
     * @param string $c_password being the confirm password to validate
     * @param string $password being the correct password
     * @return bool
     */
    protected function registerConfirmPasswordValidated(string $c_password, string $password) : bool{
        $rules = $this->getRegisterValidationScheme()["confirm password"]["rules"];
        return $this->minLength($c_password, $rules)
            && $this->sameAs($c_password, $password);
    }
}