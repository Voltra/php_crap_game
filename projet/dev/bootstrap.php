<?php

use Project\controllers\PageNotFoundController;
use Project\controllers\RootController;
use Project\Helpers\Collections\DotNotationArray;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\TwigAdapter;
use Project\helpers\routing\Router;

require_once("../vendor/autoload.php");
$config = DotNotationArray::makeFrom( require_once("config.php") );
//$db = require_once("db_init.php");

$twig = new TwigAdapter($config["app.views_path"], [
    "debug" => $config["debug"]
]);
$twig->addGlobal("debug", $config["debug"]);

$session = new Session();
$session->start();

$error404Controller = new PageNotFoundController($twig);
$rootController = new RootController($twig);
$router = new Router($twig, $error404Controller, $rootController);
$session->set("router", $router);

/*$twig->renderView("404.twig", [
    "pageName" => "error/404"
]);*/

//require_once( "views/404.php");