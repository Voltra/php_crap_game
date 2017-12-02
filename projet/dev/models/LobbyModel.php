<?php

namespace Project\models;


use PDO;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Interactions\Session;

/**
 * Class LobbyModel
 * @package Project\models
 * @author Ludwig GUERIN
 */
class LobbyModel extends A_Model {
    public function __construct(DBConnection $db) {
        $tmp_session = new Session();
        if($tmp_session->has("dbTables"))
            parent::__construct($db, $tmp_session->get("dbTables")["games"]);
        else
            parent::__construct($db, "games");
    }

    /**Get the amount of times the user has won
     * @param string $username being the user's username
     * @return int
     */
    public function getAmountOfWinsFor(string $username) : int{
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo AND partieGagnee=1");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the amount of times the user has lost
     * @param string $username being the user's username
     * @return int
     */
    public function getAmountOfLossFor(string $username) : int{
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo AND partieGagnee=0");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the amount of times the user has played the game
     * @param string $username
     * @return int
     */
    public function getAmountOfLobbiesFor(string $username) : int{
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the win ratio for a given user
     * @param string $username being the user's username
     * @return float|int
     */
    public function getWinRatioFor(string $username) : int{
        $win = $this->getAmountOfWinsFor($username);
        $total = $this->getAmountOfLobbiesFor($username);

        if($total === 0)
            return 0;
        else
            return floatval($win)/floatval($total);
    }

    /**Insert a row into the table
     * @param string $username being the user's username
     * @param bool $won being the fact that the user won or not
     * @return $this
     */
    public function insert(string $username, bool $won){
        $wonInt = (int)$won;
        $rq = $this->db->prepare("INSERT INTO ".$this->tableName."(pseudo, partieGagnee) VALUES (:pseudo, :won)");
        $rq->bindParam(":pseudo", $username);
        $rq->bindParam(":won", $wonInt);
        $rq->execute();
        return $this;
    }
}