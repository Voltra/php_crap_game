<?php
namespace Project\Helpers\Rendering;

use Twig_Environment;
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

    public function __construct(string $path, array $options = []) {
        $this->loader = new Twig_Loader_Filesystem($path);
        $params = array_merge([], $options);
        $this->env = new Twig_Environment($this->loader, $params);
    }

    /**Processes a view and return it back
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function render(string $path, array $data = []): string{
        return $this->env->render($path, $data);
    }

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return $this
     */
    public function renderView(string $path, array $data = []) : self{
        echo $this->render($path, $data);
        return $this;
    }

    /**Register data as part of the global data accessible to all views
     * @param string $key being the key/name of the data
     * @param mixed $value being the data itself
     * @return $this
     */
    public function addGlobal(string $key, $value) {
        $this->env->addGlobal($key, $value);
    }
}