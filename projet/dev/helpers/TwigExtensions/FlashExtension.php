<?php
namespace Project\Helpers\TwigExtensions;


use Project\helpers\interactions\FlashService;
use Project\Helpers\Interactions\Session;
use Twig_Extension;
use Twig_SimpleFunction;

class FlashExtension extends Twig_Extension {
    protected $flash;
    public function __construct(FlashService $flash) {
        $this->flash = $flash;
    }

    public function getFunctions() {
        return [
            new Twig_SimpleFunction("flash", [$this, "getFlash"])
        ];
    }

    public function getFlash(string $type){
        return $this->flash->get($type);
    }
}