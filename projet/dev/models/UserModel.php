<?php
namespace Project\models;


use PDO;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Interactions\Session;

/**
 * Class UserModel
 * @package Project\models
 * @author Ludwig GUERIN
 */
class UserModel extends A_Model{
    public function __construct(DBConnection $db) {
        $tmp_session = new Session();
        if($tmp_session->has("dbTables"))
            parent::__construct($db, $tmp_session->get("dbTables")["users"]);
        else
            parent::__construct($db, "users");
    }

    /**Retrieves the list of username in use
     * @return string[]
     */
    public function getUsernames() : array{
        return $this->db
            ->query("SELECT pseudo FROM ".$this->tableName)
            ->fetchAll(PDO::FETCH_COLUMN, 0);
    }

    /**Determines whether or not a username is already in use
     * @param string $username being the username to test upon
     * @return bool
     */
    public function usernameAlreadyExists(string $username) : bool{
        return in_array($username, $this->getUsernames());
    }

    /**Determines whether the given password matches the password in the database corresponding to the given username
     * @param string $username being the username
     * @param string $clear_password being the (non hashed) password input
     * @return bool
     */
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

    /**Insert a pair of username and password in the database
     * @param string $username being the username
     * @param string $password being the non-hashed password
     * @return mixed
     */
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