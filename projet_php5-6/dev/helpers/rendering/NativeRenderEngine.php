<?php
namespace Project\helpers\rendering;


use Project\Helpers\Interactions\Session;

class NativeRenderEngine implements I_ViewRenderEngine{
    protected $globalData;

    public function __construct() {
        $this->globalData = [];
    }


    /**Processes a view and return it back
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function render($path, array $data = []){
        foreach($this->globalData as $name=>$value)
            $$name = $value;

        foreach($data as $name=>$value)
            $$name = $value;

        $renderer = $this;
        $flash = (new Session())->get("sharedFlashService");
        ob_start();
        $a12455788 = VIEWS;
        require "{$a12455788}{$path}";
        return ob_get_clean();
    }

    /**Processes a view and prints it onto the output stream
     * @param string $path being the path to the view (absolute or relative to the path given in the constructor)
     * @param array $data being the view's data (default: [])
     * @return string
     */
    public function renderView($path, array $data = []){
        $rendered = $this->render($path, $data);
        echo $rendered;
        return $rendered;
    }

    /**Register data as part of the global data accessible to all views
     * @param string $key being the key/name of the data
     * @param mixed $value being the data itself
     * @return $this
     */
    public function addGlobal($key, $value) {
        $this->globalData[$key] = $value;
        return $this;
    }
}