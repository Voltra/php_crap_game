<?php
use Project\Helpers\Rendering\TwigAdapter;

require_once("../vendor/autoload.php");
$config = require_once("config.php");
//$db = require_once("db_init.php");

$twig = new TwigAdapter($config["app"]["views_path"], [
    "debug" => $config["debug"]
]);

$twig->renderView("404.twig", [
    "debug" => $config["debug"],
    "pageName" => "error/404"
]);

//require_once("views/404.php");