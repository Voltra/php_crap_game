<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 27/11/2017
 * Time: 08:13
 */

namespace Project\controllers;


use Exception;
use PDO;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\helpers\rendering\JsonRenderEngine;
use Project\Helpers\Routing\Router;
use Project\models\LobbyModel;
use Project\models\UserModel;


/**
 * Class ApiController
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
class ApiController extends A_Controller {
    /**
     * @var DBConnection
     */
    protected $dbApi;

    /**
     * @var array
     */
    protected $dbTables;

    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        $render_engine = new JsonRenderEngine();
        parent::__construct($render_engine, $db);
        $this->dbApi = $db;
        $session = new Session();
        if(!$session->has("dbTables"))
            throw new Exception("No database table mapping available");

        $this->dbTables = $session->get("dbTables");
    }

    protected function hasTable(string $name){
        return array_key_exists($name, $this->dbTables);
    }

    protected function users(Request $rq, Router $router){
        if(!$this->hasTable("users"))
            throw new Exception("No users table mapping available");
        else{
            $usersTable = $this->dbTables["users"];
            $users = $this->dbApi
                ->query("SELECT pseudo FROM {$usersTable}")
                ->fetchAll(PDO::FETCH_COLUMN, 0);
            //$this->view->renderViewAsJson($users);
            return $users;
        }
    }

    public function username_available(Request $rq, Router $router, ?string $username=null){
        if(is_null($username))
            return $this->view->renderJsonView(null);

        return $this->view->renderJsonView(!in_array($username, $this->users($rq, $router)));
    }

    public function victories(Request $rq, Router $router, ?string $username=null){
        if(!$this->hasTable("games"))
            throw new Exception("No games table mapping available");
        else{
            if(is_null($username))
                return $this->view->renderJsonView(null);

            $lobbyTable = $this->dbTables["games"];
            $rq = $this->dbApi->prepare("SELECT count(*) as amount FROM {$lobbyTable} WHERE pseudo=:pseudo AND partieGagnee=1");
            $rq->bindParam(":pseudo", $username);
            $rq->execute();

            $amount = intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
            return $this->view->renderJsonView($amount);
        }
    }

    public function stats(Request $rq, Router $router, ?string $username=null){
        $amount = json_decode($this->victories($rq, $router, $username))[0];
        ob_get_clean();
        return $this->view->renderJsonView([
            "victories" => $amount
        ]);
    }
}