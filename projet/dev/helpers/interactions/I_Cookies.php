<?php
namespace Project\Helpers\Interactions;


interface I_Cookies {
    public function set(
        $name,
        string $value="",
        int $expire=0,
        string $path="",
        string $domain="",
        bool $secure=false,
        bool $httpOnly=false
    ) : bool;

    public function get(string $key, bool $xss_clean = false);

    public function has(string $key);
}