<?php
namespace Project\Helpers;

use Exception;

class JsonRead {
    public static function from(string $path){
        $file = @fopen($path, "r");
        if(!$file)
            throw new Exception("Could not open json file");

        $content = "";
        while(($buffer = fgets($file)) !== false)
            $content .= $buffer;

        if(!feof($file))
            throw new Exception("Unexpected error while parsing json file");

        fclose($file);

        return json_decode($content, true);
    }
}