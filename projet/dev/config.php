<?php
$development = true;

if($development)
    return require_once("config/development_config.php");
else
    return require_once("config/production_config.php");