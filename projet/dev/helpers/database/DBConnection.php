<?php
namespace Project\Helpers\Database;

use PDO;

/**Creates a connection to a MySQL database
 * Class DBConnection
 * @package Project\Helpers\Database
 * @author Ludwig GUERIN
 */
class DBConnection {
    /**The connection to the database
     * @var \PDO
     */
    protected $pdo;

    /**
     * DBConnection constructor.
     * @param string $driver being the sql driver (mysql, postgres, sqlite, oracle, etc...)
     * @param string $uri being the database's URI (eg. localhost)
     * @param string $dbname being the database's name (eg. users)
     * @param string $username being the username of the account to log into (eg. root)
     * @param string $password being the password of the said account
     */
    public function __construct(string $driver, string $uri, string $dbname, string $username, string $password){
        $dsn = "{$driver}:dbname={$dbname};host={$uri}";
        $this->pdo = new PDO($dsn, $username, $password);

        $this->pdo->setAttribute(PDO::ATTR_CASE, PDO::CASE_UPPER);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**DBConnection destructor
     */
    public function __destruct() {
        $this->pdo = null;
    }

    /**Magic method that allows the user to call the PDO's method on this DBConnection
     * @param string $name being the name of the method to call
     * @param array $arguments being the arguments to pass to this method
     * @return mixed
     */
    public function __call(string $name, array $arguments = []) {
        return call_user_func_array([$this->pdo, $name], $arguments);
    }
}