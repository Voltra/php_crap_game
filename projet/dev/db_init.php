<?php

use Project\Helpers\Database\DBConnection;

return (new DBConnection(
    $config["db.driver"],
    $config["db.uri"],
    $config["db.name"],
    $config["db.user"],
    $config["db.password"]
));