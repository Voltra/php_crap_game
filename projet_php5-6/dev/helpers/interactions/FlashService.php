<?php
/**
 * Created by PhpStorm.
 * User: Ludwig
 * Date: 28/11/2017
 * Time: 17:30
 */

namespace Project\helpers\interactions;


class FlashService {
    /**
     * @var I_Session
     */
    protected $session;


    protected $cache;

    const SESSION_KEY = "flash";

    public function __construct(I_Session $session) {
        $this->session = $session;
    }

    protected function retrieveSessionValue(){
        if($this->session->has(self::SESSION_KEY))
            return $this->session->get(self::SESSION_KEY);

        return [];
    }

    protected function nullifyCache(){
        $this->cache = null;
        return $this;
    }

    public function success($message){
        $flash = $this->retrieveSessionValue();
        $this->nullifyCache();
        $flash["success"] = $message;
        $this->session->set(self::SESSION_KEY, $flash);
        return $this;
    }

    public function failure($message){
        $flash = $this->retrieveSessionValue();
        $this->nullifyCache();
        $flash["failure"] = $message;
        $this->session->set(self::SESSION_KEY, $flash);
        return $this;
    }

    public function has($key){
        if(is_null($this->cache)) {
            $flash = $this->retrieveSessionValue();
            return array_key_exists($key, $flash);
        }else
            return array_key_exists($key, $this->cache);
    }

    public function get($key){
        if(is_null($this->cache)){
            $this->cache = $this->retrieveSessionValue();
            $this->session->_unset(self::SESSION_KEY);
        }

        if($this->has($key))
            return $this->cache[$key];
        return "";
    }
}