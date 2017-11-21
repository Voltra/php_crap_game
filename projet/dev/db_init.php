<?php

use Project\Helpers\Database\DBConnection;

$cfg = $config["db"];
return (new DBConnection(
    $cfg["driver"],
    $cfg["uri"],
    $cfg["name"],
    $cfg["user"],
    $cfg["password"]
));