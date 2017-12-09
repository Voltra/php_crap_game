<?php
namespace Project\Helpers\Collections;

/**A trait describing a collection that uses the dot-notation for keys
 * Highly inspired by https://medium.com/@assertchris/dot-notation-3fd3e42edc61
 * Trait T_DotNotationCollection
 * @package Project\Helpers\Collections
 * @author Ludwig GUERIN
 */
trait T_DotNotationCollection {
    /**The inner data of the T_DotNotationCollection
     * @var array
     */
    protected $data = [];

    /**Construct a TDotNotationCollection from an iterable
     * TDotNotationCollection constructor.
     * @param iterable $array being the iterable to construct from
     */
    public function __construct($array){
        $this->data = $array;
    }

    /**Determines whether or not an element exists in the given array using a dot-separated key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to look up for
     * @return bool
     */
    protected static function exists($array, $key){}

    /**Retrieve an element from the given arrays
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to retrieve the element from
     * @return mixed
     */
    protected static function get($array, $key){}

    /**Attributes a new value to the given key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to which the element has to be set
     * @param mixed $value being the new value associated to the given key
     */
    protected static function set(&$array, $key, $value){}

    /**Unset the value at the given key
     * @param iterable $array being the iterable to iterate through
     * @param string $key being the key to unset
     */
    protected static function _unset(& $array, $key){}
}