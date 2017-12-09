<?php
namespace Project\Helpers\Collections;


use ArrayAccess;
use InvalidArgumentException;
use Project\Helpers\Collections\T_DotNotationCollection;

/**A class representing an array that uses dot-notation for keys
 * Highly inspired by https://medium.com/@assertchris/dot-notation-3fd3e42edc61
 * Class DotNotationArray
 * @package Project\Helpers\Collections
 * @author Ludwig GUERIN
 */
class DotNotationArray implements ArrayAccess {
    use T_DotNotationCollection;

    /**Make a new DotNotationArray from an iterable
     * @param iterable $arr being the iterable used to create a new DotNotationArray
     * @return DotNotationArray
     */
    public static function makeFrom($arr){
        return new DotNotationArray($arr);
    }

    /**An alias for DotNotationArray::makeFrom
     * @param iterable $arr
     * @return DotNotationArray
     */
    public static function newFrom($arr){
        return static::makeFrom($arr);
    }

    /**
     * Whether a offset exists
     * @link http://php.net/manual/en/arrayaccess.offsetexists.php
     * @param mixed $offset <p>
     * An offset to check for.
     * </p>
     * @return boolean true on success or false on failure.
     * </p>
     * <p>
     * The return value will be casted to boolean if non-boolean was returned.
     * @since 5.0.0
     */
    public function offsetExists($offset) {
        return static::exists($this->data, $offset);
    }

    /**
     * Offset to retrieve
     * @link http://php.net/manual/en/arrayaccess.offsetget.php
     * @param mixed $offset <p>
     * The offset to retrieve.
     * </p>
     * @return mixed Can return all value types.
     * @since 5.0.0
     */
    public function offsetGet($offset) {
        return static::get($this->data, $offset);
    }

    /**
     * Offset to set
     * @link http://php.net/manual/en/arrayaccess.offsetset.php
     * @param mixed $offset <p>
     * The offset to assign the value to.
     * </p>
     * @param mixed $value <p>
     * The value to set.
     * </p>
     * @return void
     * @since 5.0.0
     */
    public function offsetSet($offset, $value) {
        static::set($this->data, $offset, $value);
    }

    /**
     * Offset to unset
     * @link http://php.net/manual/en/arrayaccess.offsetunset.php
     * @param mixed $offset <p>
     * The offset to unset.
     * </p>
     * @return void
     * @since 5.0.0
     */
    public function offsetUnset($offset) {
        static::_unset($this->data, $offset);
    }

    /**Determines whether or not an element exists in the given array using a dot-separated key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to look up for
     * @return bool
     */
    protected static function exists($array, $key) {
        if(isset($array[$key]))
            return true;

        $keys = explode(".", $key);
        $curr_array = $array;

        foreach($keys as $curr_key){
            if(!(is_array($curr_array) && isset($curr_array[$curr_key])))
                return false;

            $curr_array = $curr_array[$curr_key];
        }
        return true;
    }

    /**Retrieve an element from the given arrays
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to retrieve the element from
     * @return mixed
     */
    protected static function get($array, $key) {
        if(isset($array[$key]))
            return $array[$key];

        $keys = explode(".", $key);
        $curr_arr = $array;

        foreach($keys as $curr_key){
            if(!( is_array($curr_arr) && isset($curr_arr[$curr_key]) ))
                throw new InvalidArgumentException("Invalid index");
            $curr_arr = $curr_arr[$curr_key];
        }
        return $curr_arr;
    }

    /**Attributes a new value to the given key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to which the element has to be set
     * @param mixed $value being the new value associated to the given key
     */
    protected static function set(&$array, $key, $value) {
        $keys = explode(".", $key);
        while(count($keys) > 1){
            $curr_key = array_shift($keys);

            if(!(is_array($array) && isset($array[$curr_key])))
                $array[$curr_key] = [];

            $array = &$array[$key];
        }
        $array[array_shift($keys)] = $value;
    }

    /**Unset the value at the given key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to unset
     */
    protected static function _unset(&$array, $key) {
        $keys = explode(".", $key);
        while(count($keys) > 1){
            $curr_key = array_shift($keys);

            if(is_array($array) && isset($array[$curr_key]))
                $array = &$array[$curr_key];
        }
        unset($array[array_shift($keys)]);
    }
}