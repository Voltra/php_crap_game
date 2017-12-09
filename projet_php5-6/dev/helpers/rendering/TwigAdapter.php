<?php
namespace Project\Helpers\Rendering;

use Twig_Environment;
use Twig_Extension;
use Twig_ExtensionInterface;
use Twig_Loader_Filesystem;
use Project\Helpers\Rendering\I_ViewRenderEngine;

/**A quick adapter to use Twig with anything
 * Class TwigAdapter
 * @package Project\Helpers\Rendering
 * @author Ludwig GUERIN
 */
class TwigAdapter implements I_ViewRenderEngine{
    /**The loader used
     * @var Twig_Loader_Filesystem
     */
    protected $loader;

    /**Twig's environment
     * @var Twig_Environment
     */
    protected $env;

    public function __construct($path, array $options = []) {
        $this->loader = new Twig_Loader_Filesystem($path);
        $params = array_merge([], $options);
        $this->env = new Twig_Environment($this->loader, $params);
    }

    /**Processes a view and return it back
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function render($path, array $data = []){
        return $this->env->render($path, $data);
    }

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function renderView($path, array $data = []){
        $view = $this->render($path, $data);
        echo $view;
        return $view;
    }

    /**Register data as part of the global data accessible to all views
     * @param string $key being the key/name of the data
     * @param mixed $value being the data itself
     * @return $this
     */
    public function addGlobal($key, $value) {
        $this->env->addGlobal($key, $value);
        return $this;
    }

    /**
     * @param Twig_ExtensionInterface $extension
     * @return $this
     */
    public function addExtension(Twig_ExtensionInterface $extension){
        $this->env->addExtension($extension);
        return $this;
    }
}