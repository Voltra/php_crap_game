<?php

/**
 * @author Ludwig GUERIN
 */

use Project\controllers\PageNotFoundController;
use Project\controllers\RootController;
use Project\Helpers\Collections\DotNotationArray;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\TwigAdapter;
use Project\helpers\routing\Router;

require_once("../vendor/autoload.php");
$config = DotNotationArray::makeFrom( require_once("config.php") );
$db = require_once("db_init.php");

$twig = new TwigAdapter($config["app.views_path"], [
    "debug" => $config["debug"]
]);
$twig->addGlobal("debug", $config["debug"]);

$session = new Session();
$session->start();
$session->set("dbTables", $config["dbTables"]);
$session->set("hash", $config["hash"]);
$session->set("validate", DotNotationArray::makeFrom( $config["form"] ));

$error404Controller = new PageNotFoundController($twig, $db);
$rootController = new RootController($twig, $db);
$router = new Router($twig, $error404Controller, $rootController, $db);

/*$users = $db->query("SELECT pseudo from joueurs")
->fetchAll(PDO::FETCH_ASSOC);

var_dump($users);
die();*/

//Following is in public_html/index.php