<?php
namespace Project\Helpers\Rendering;

/**An interface factorizing common behavior of a view render engine
 * Interface I_ViewRenderEngine
 * @package Project\Helpers\Rendering
 * @author Ludwig GUERIN
 */
interface I_ViewRenderEngine {
    /**Processes a view and return it back
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function render(string $path, array $data = []) : string;

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return $this
     */
    public function renderView(string $path, array $data = []);
}