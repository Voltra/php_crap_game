<?php
/**
 * @author Ludwig GUERIN
 */


use Project\Controllers\AuthController;
use Project\models\UserModel;

$ROOT = dirname(dirname(__DIR__));
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

$BASE_URL = "http://localhost/info2s3/webserver/miniproj/projet_php5-6/public_html";
define("BASE_URL", $BASE_URL);

return [
    "debug" => false,
    "baseurl" => BASE_URL,
    "db" => [
        "user" => DB_USER,
        "password" => DB_PASSWORD,
        "encoding" => "utf8",
        "collation" => "utf8_unicode_ci",
        "driver" => "mysql",
        "uri" => "localhost",
        "name" => "miniproj_guerin_jaouen"
    ],
    "app" => [
        "root_path" => ROOT,
        "devRoot_path" => DEV_ROOT,
        "views_path" => VIEWS,
        "models_path" => MODELS,
        "controllers_path" => CONTROLLERS
    ],
    "dbTables" => [
        "users" => "joueurs",
        "games" => "parties"
    ],
    "hash" => [
        "algorithm" => PASSWORD_BCRYPT,
        "options" => [
            "cost" => PASSWORD_BCRYPT_DEFAULT_COST
        ]
    ],
    "form" => [
        "auth" => [
            "login" => ROOT . "/public_html/assets/json/auth/login/validation.json",
            "register" => ROOT . "/public_html/assets/json/auth/register/validation.json"
        ],
        "game" => [
            "play" => ROOT . "/public_html/assets/json/game/play/validation.json"
        ]
    ]
];