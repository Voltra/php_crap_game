<?php
namespace Project\Helpers\Interactions;


/**An interface factorizing the shared behavior of classes that represent a cookie holder
 * Interface I_Cookies
 * @package Project\Helpers\Interactions
 * @author Ludwig GUERIN
 */
interface I_Cookies {
    /**Sets a new cookie
     * @param mixed $name being the name of the cookie
     * @param string $value being the value of the cookie
     * @param int $expire being the expiration date in seconds
     * @param string $path being the path to store the cookie to
     * @param string $domain being the domain to store the cookie onto
     * @param bool $secure determines whether it should use HTTPS cookies or not
     * @param bool $httpOnly determines whether or not this cookie is accessible via JS
     * @return bool
     */
    public function set(
        $name,
        string $value="",
        int $expire=0,
        string $path="",
        string $domain="",
        bool $secure=false,
        bool $httpOnly=false
    ) : bool;

    /**Retrieves a cookie
     * @param string $key being the key to the cookie
     * @param bool $xss_clean determines whether or not it should protect the data from XSS attacks
     * @return mixed
     */
    public function get(string $key, bool $xss_clean = false);

    /**Determines whether or not there's a cookie that has this name
     * @param string $key
     * @return bool
     */
    public function has(string $key) : bool;
}