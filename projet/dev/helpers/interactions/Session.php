<?php
namespace Project\Helpers\Interactions;

/**An helper class to handle interactions in an OO way
 * Class Session
 * @package Project\Helpers\Sessions
 * @author Ludwig GUERIN
 */
class Session implements I_Session {

    /**Determines whether or not the session has data associated to the given key
     * @param string $key being the key to the data being looked at
     * @return bool
     */
    public function has(string $key) : bool{
        $this->ensureStarted();
        return isset($_SESSION[$key]);
    }

    /**Retrieves the data associated to the given key (if it exists)
     * @param string $key being the key to the desired data
     * @return mixed
     */
    public function get(string $key){
        $this->ensureStarted();
        return unserialize( $_SESSION[$key] );
    }

    /**Attributes a new value to the given key
     * @param string $key being the key to set the value to
     * @param mixed $value being the new value
     * @return $this
     */
    public function set(string $key, $value){
        $this->ensureStarted();
        $_SESSION[$key] = serialize($value);
        return $this;
    }

    /**Unset the data associated to the given key
     * @param string $key being the key of the data to unset
     * @return $this
     */
    public function unset(string $key){
        unset($_SESSION[$key]);
        return $this;
    }

    /**Retrieves the session's status
     * @return mixed
     */
    public function getStatus(){
        return session_status();
    }

    /**Determines whether or not the session is active
     * @return bool
     */
    public function isActive() : bool{
        return $this->getStatus() === PHP_SESSION_ACTIVE;
    }

    /**Ensures that the session has started
     * @return $this
     */
    public function ensureStarted(){
        if(!$this->isActive())
            session_start();
        return $this;
    }

    /**Starts the session (if it was not already started)
     * @return $this
     */
    public function start(){
        $this->ensureStarted();
        return $this;
    }

    /**Stops the session (if it was already started)
     * @return $this
     */
    public function stop(){
        if($this->isActive())
            session_abort();

        return $this;
    }
}