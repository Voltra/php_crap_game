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
    public function render($path, array $data = []){
        header("Content-Type: application/json");
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function renderView($path, array $data = []){
        $view = $this->render($path, $data);
        echo $view;
        return $view;
    }

    /**Renders JSON data
     * @param mixed $data being the JSON data to render
     * @return string
     */
    public function renderJson($data){
        header("content-type: application/json; charset=utf-8");
        return json_encode($data, JSON_PRETTY_PRINT | JSON_OBJECT_AS_ARRAY);
    }

    /**Processes JSON data and prints it onto the output stream
     * @param mixed $data being the JSON data to render
     * @return string
     */
    public function renderJsonView($data){
        $view = $this->renderJson($data);
        echo $view;
        return $view;
    }

    /**Register data as part of the global data accessible to all views
     * @param string $key being the key/name of the data
     * @param mixed $value being the data itself
     * @throws Exception
     */
    public function addGlobal($key, $value) {
        throw new Exception("Invalid method for a JsonRenderEngine");
    }
}