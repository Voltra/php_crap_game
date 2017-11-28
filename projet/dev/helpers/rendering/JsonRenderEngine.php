<?php
namespace Project\helpers\rendering;

use Exception;

/**
 * Class JsonRenderEngine
 * @package Project\helpers\rendering
 */
class JsonRenderEngine implements I_ViewRenderEngine{
    /**Processes a view and return it back
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function render(string $path, array $data = []): string {
        header("Content-Type: application/json");
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return $this
     */
    public function renderView(string $path, array $data = []) {
        echo $this->render($path, $data);
    }

    /**Processes a view and return it back as JSON
     * @param array $data being the data to render
     * @return string
     */
    public function renderAsJson(array $data = []) : string{
        return $this->render("", $data);
    }

    /**Processes a view and prints it onto the output stream as JSON
     * @param array $data
     */
    public function renderViewAsJson(array $data = []){
        echo $this->renderAsJson($data);
    }

    /**Register data as part of the global data accessible to all views
     * @param string $key being the key/name of the data
     * @param mixed $value being the data itself
     * @return $this
     * @throws Exception
     */
    public function addGlobal(string $key, $value) {
        throw new Exception("Invalid method for a JsonRenderEngine");
    }
}