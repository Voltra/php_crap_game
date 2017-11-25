<?php
namespace Project\Helpers\Interactions;


/**An interface representing the shared behavior of classes that represent a php session
 * Interface I_Session
 * @package Project\Helpers\Interactions
 * @author Ludwig GUERIN
 */
interface I_Session {
    /**Determines whether or not the session has data associated to the given key
     * @param string $key being the key to the data being looked at
     * @return bool
     */
    public function has(string $key) : bool;

    /**Retrieves the data associated to the given key (if it exists)
     * @param string $key being the key to the desired data
     * @return mixed
     */
    public function get(string $key);

    /**Attributes a new value to the given key
     * @param string $key being the key to set the value to
     * @param mixed $value being the new value
     * @return $this
     */
    public function set(string $key, $value);

    /**Unset the data associated to the given key
     * @param string $key being the key of the data to unset
     * @return $this
     */
    public function unset(string $key);

    /**Retrieves the session's status
     * @return mixed
     */
    public function getStatus();

    /**Determines whether or not the session is active
     * @return bool
     */
    public function isActive() : bool;

    /**Ensures that the session has started
     * @return $this
     */
    public function ensureStarted();

    /**Starts the session (if it was not already started)
     * @return $this
     */
    public function start();

    /**Stops the session (if it was already started)
     * @return $this
     */
    public function stop();
}