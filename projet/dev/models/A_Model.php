<?php
namespace Project\Models;

use Project\Helpers\Database\DBConnection;


/**An abstract class representing the shared behavior of any Model
 * Class A_Model
 * @package Projet\Models
 * @author Ludwig GUERIN
 */
abstract class A_Model {
    /**The connection to the DB
     * @var DBConnection
     */
    protected $db;

    /**The name of this A_Model in the database (eg. UserModel -> users)
     * @var string
     */
    protected $tableName;

    /**Construct a A_Model from a connection to the database and the table's name
     * A_Model constructor.
     * @param DBConnection $db being the connection to the DB
     * @param string $tableName being the name of the regarded table
     */
    public function __construct(DBConnection $db, string $tableName) {
        $this->db = $db;
        $this->tableName = $tableName;
    }
}