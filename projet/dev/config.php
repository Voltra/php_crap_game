<?php

$ROOT = dirname(__DIR__);
$DEV_ROOT = $ROOT . "/dev/";
define("ROOT", $ROOT);
define("DEV_ROOT", $DEV_ROOT);

$VIEWS = DEV_ROOT . "views/";
$MODELS = DEV_ROOT . "models/";
$CONTROLLERS = DEV_ROOT . "controllers/";
define("VIEWS", $VIEWS);
define("MODELS", $MODELS);
define("CONTROLLERS", $CONTROLLERS);

$DB_USER = "root";
$DB_PASSWORD = "";
define("DB_USER", $DB_USER);
define("DB_PASSWORD", $DB_PASSWORD);

return [
    "debug" => true,
    "db" => [
        "user" => DB_USER,
        "password" => DB_PASSWORD,
        "encoding" => "utf8",
        "collation" => "utf8_unicode_ci",
        "driver" => "mysql",
        "uri" => "localhost",
        "name" => "miniproj"
    ],
    "app" => [
        "root_path" => ROOT,
        "devRoot_path" => DEV_ROOT,
        "views_path" => VIEWS,
        "models_path" => MODELS,
        "controllers_path" => CONTROLLERS
    ]
];