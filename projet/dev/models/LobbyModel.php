<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 28/11/2017
 * Time: 14:18
 */

namespace Project\models;


use PDO;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Interactions\Session;

class LobbyModel extends A_Model {
    public function __construct(DBConnection $db) {
        $tmp_session = new Session();
        if($tmp_session->has("dbTables"))
            parent::__construct($db, $tmp_session->get("dbTables")["games"]);
        else
            parent::__construct($db, "games");
    }

    public function getAmountOfWinsFor(string $username){
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo AND partieGagnee=1");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return $rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"];
    }

    public function insert(string $username, bool $won){
        $rq = $this->db->prepare("INSERT INTO ".$this->tableName." VALUES (:pseudo, :won)");
        $rq->bindParam(":pseudo", $username);
        $rq->bindParam(":won", $won);
        $rq->execute();
    }
}