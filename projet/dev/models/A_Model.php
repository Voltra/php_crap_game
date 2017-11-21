<?php
namespace Project\Models;

use Project\Helpers\DBConnection;

/**An abstract class representing the shared behavior of any Model
 * Class A_Model
 * @author Ludwig GUERIN
 */
abstract class A_Model {
    protected $db;

    public function __construct(DBConnection $db) {
        $this->db = $db;
    }
}