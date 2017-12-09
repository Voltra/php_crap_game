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
    public function getAmountOfWinsFor($username) {
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo AND partieGagnee=1");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the amount of times the user has lost
     * @param string $username being the user's username
     * @return int
     */
    public function getAmountOfLossFor($username){
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo AND partieGagnee=0");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the amount of times the user has played the game
     * @param string $username
     * @return int
     */
    public function getAmountOfLobbiesFor($username){
        $rq = $this->db->prepare("SELECT count(*) as amount FROM ".$this->tableName." WHERE pseudo=:pseudo");
        $rq->bindParam(":pseudo", $username);
        $rq->execute();

        return intval($rq->fetch(PDO::FETCH_ASSOC)["AMOUNT"]);
    }

    /**Get the win ratio for a given user
     * @param string $username being the user's username
     * @return float|int
     */
    public function getWinRatioFor($username){
        $win = $this->getAmountOfWinsFor($username);
        $total = $this->getAmountOfLobbiesFor($username);

        if($total === 0)
            return 0;
        else
            return ( ((float)$win) / ((float)$total) );
    }

    /**Insert a row into the table
     * @param string $username being the user's username
     * @param bool $won being the fact that the user won or not
     * @return $this
     */
    public function insert($username, $won){
        $wonInt = (int)$won;
        $rq = $this->db->prepare("INSERT INTO ".$this->tableName."(pseudo, partieGagnee) VALUES (:pseudo, :won)");
        $rq->bindParam(":pseudo", $username);
        $rq->bindParam(":won", $wonInt);
        $rq->execute();
        return $this;
    }

    /**Get statistics for a given player
     * @param string $username being the user's username
     * @return array
     */
    public function getStatsFor($username){
        return [
            "pseudo" => $username,
            "victories" => $this->getAmountOfWinsFor($username),
            "defeats" => $this->getAmountOfLossFor($username),
            "total" => $this->getAmountOfLobbiesFor($username),
            "ratio" => number_format(100 * $this->getWinRatioFor($username), 2, ',', ' ') . '%'
        ];
    }

    /**Retrieve the three best players (based on the amount of victory) -> might return from 0 to 3 best
     * @return string[]
     */
    protected function getThreeBest(){
        $sql = "SELECT c.pseudo FROM (SELECT COUNT(*) AS amount, p.pseudo FROM " . $this->tableName . " p WHERE p.partieGagnee=1 GROUP BY p.pseudo ORDER BY 1 DESC ) c LIMIT 0,3";
        $rq = $this->db->query($sql);
        return $rq->fetchAll(PDO::FETCH_COLUMN, 0);
    }

    /**Retrieve the stats for the three best players
     * @return array
     */
    public function getStatsForTheThreeBest(){
        $bests = $this->getThreeBest();
        $stats = [];
        for($i = 0 ; $i < 3 ; $i+=1){
            $pseudo = $victories = $defeats = $total = $ratio = "NaN";
            if(isset($bests[$i])){
                $pseudo = $bests[$i];
                $stats[] = $this->getStatsFor($pseudo);
            }else {
                $stats[] = [
                    "pseudo" => $pseudo,
                    "victories" => $victories,
                    "defeats" => $defeats,
                    "total" => $total,
                    "ratio" => $ratio
                ];
            }
            //TODO: Create stats array (with pseudo as one of the keys)
        }

        return $stats;
    }

    /**Retrieves the keys for the stats array (as an array)
     * @return string[]
     */
    public function getStatsKeys(){
        return [
            "pseudo",
            "victories",
            "defeats",
            "total",
            "ratio"
        ];
    }
}