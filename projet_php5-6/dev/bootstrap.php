<?php

/**
 * @author Ludwig GUERIN
 */

use Project\controllers\PageNotFoundController;
use Project\controllers\RootController;
use Project\Helpers\Collections\DotNotationArray;
use Project\helpers\interactions\FlashService;
use Project\Helpers\Interactions\Session;
use Project\Helpers\Rendering\TwigAdapter;
use Project\helpers\routing\Router;
use Project\Helpers\TwigExtensions\FlashExtension;

require_once("../vendor/autoload.php");
$config = DotNotationArray::makeFrom( require_once("config.php") );
$db = require_once("db_init.php");

//Services setup
$flashService = new FlashService(new Session());

//Renderer setup
$twig = new TwigAdapter($config["app.views_path"], [
    "debug" => $config["debug"]
]);
$twig->addGlobal("debug", $config["debug"]);
$twig->addGlobal("baseurl", $config["baseurl"]);
$twig->addExtension(new FlashExtension($flashService));

//Session initial setup
$session = new Session();
$session->start();
$session->set("dbTables", $config["dbTables"]);
$session->set("hash", $config["hash"]);
$session->set("validate", DotNotationArray::makeFrom( $config["form"] ));
$session->set("sharedFlashService", $flashService);
$session->set("isDebug", $config["debug"]);
$session->set("baseurl", $config["baseurl"]);

//Controllers and Router setup
$error404Controller = new PageNotFoundController($twig, $db);
$rootController = new RootController($twig, $db);
$router = new Router($twig, $error404Controller, $rootController, $db);


//Following is in public_html/index.php