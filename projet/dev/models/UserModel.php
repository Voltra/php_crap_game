<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 26/11/2017
 * Time: 16:31
 */

namespace Project\models;


use PDO;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Interactions\Session;

class UserModel extends A_Model{
    public function __construct(DBConnection $db) {
        $tmp_session = new Session();
        if($tmp_session->has("dbTables"))
            parent::__construct($db, $tmp_session->get("dbTables")["users"]);
        else
            parent::__construct($db, "users");
    }

    public function getUsernames() : array{
        return $this->db
            ->query("SELECT pseudo FROM ".$this->tableName)
            ->fetchAll(PDO::FETCH_COLUMN, 0);
    }

    public function usernameAlreadyExists(string $username) : bool{
        return in_array($username, $this->getUsernames());
    }

    public function passwordMatches(string $username, string $clear_password) : bool{
        $rq = $this->db
            ->prepare("SELECT motDePasse FROM ".$this->tableName." WHERE pseudo like :pseudo");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();
        $db_hash = $rq->fetch(PDO::FETCH_NUM);

        if(empty($db_hash))
            return false;

        $db_hash = $db_hash[0];

        return password_verify($clear_password, $db_hash);
    }

    public function insert(string $username, string $password){
        $session = new Session();
        if(!$session->has("hash"))
            throw new Exception("");
        $config = $session->get("hash");
        $hash = password_hash($password, $config["algorithm"], $config["options"]);

        $rq = $this->db
            ->prepare("INSERT INTO ".$this->tableName." VALUES (:username, :password)");
        $rq->bindParam(":username", $username);
        $rq->bindParam(":password", $hash);

        return $rq->execute();
    }
}