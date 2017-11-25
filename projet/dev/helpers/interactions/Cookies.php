<?php
namespace Project\helpers\interactions;


/**A basic implementation of I_Cookies
 * Class Cookies
 * @package Project\helpers\interactions
 */
class Cookies implements I_Cookies {

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
        string $value = "",
        int $expire = 0,
        string $path = "",
        string $domain = "",
        bool $secure = false,
        bool $httpOnly = false
    ): bool {
        return setcookie($name, $value, $expire, $domain, $path, $secure, $httpOnly);
    }

    /**Retrieves a cookie
     * @param string $key being the key to the cookie
     * @param bool $xss_clean determines whether or not it should protect the data from XSS attacks
     * @return mixed
     */
    public function get(string $key, bool $xss_clean = false) {
        if($xss_clean)
            return $_COOKIE[$key];
        else
            return $_COOKIE[$key];
    }

    /**Determines whether or not there's a cookie that has this name
     * @param string $key
     * @return bool
     */
    public function has(string $key) : bool{
        return isset($_COOKIE[$key]);
    }
}