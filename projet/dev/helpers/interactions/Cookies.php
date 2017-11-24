<?php
namespace Project\helpers\interactions;


class Cookies implements I_Cookies {

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

    public function get(string $key, bool $xss_clean = false) {
        if($xss_clean)
            return $_COOKIE[$key];
        else
            return $_COOKIE[$key];
    }

    public function has(string $key) {
        return isset($_COOKIE[$key]);
    }
}