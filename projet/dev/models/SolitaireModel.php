<?php
namespace Project\Models;

use InvalidArgumentException;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Interactions\Session;
use Project\Models\A_Model;
use Throwable;

/**
 * Class SolitaireModel
 * @package Project\Models
 * @author Ludwig GUERIN
 */
class SolitaireModel extends A_Model{
    const X_LEN = 7;
    const Y_LEN = 7;
    const BOARD_SESSION_KEY = "board";
    const PREV_BOARD_SESSION_KEY = "prevboard";

    /**
     * @var Session
     */
    protected $session;

    public function __construct(DBConnection $db) {
        parent::__construct($db, "");
        $this->session = new Session();
        $this->setBoard($this->getBoard());
    }

    /**Determines whether a board (as an array) is valid or not
     * @param array $board being the board to test upon
     * @return bool
     */
    protected function isValidBoard(array $board) : bool{
        $dimYcount = count($board);
        $dimXcount = array_reduce($board, function(int $acc, $arr){
            if(is_array($arr))
                return max($acc, count($arr));
            return -1;
        }, -1);

        return $dimYcount===self::Y_LEN && $dimXcount===self::X_LEN;
    }

    /**Get the initial board state
     * @return array
     */
    public function getInitBoard() : array{
        return [
            [false, false, true, true, true, false, false],
            [false, false, true, true, true, false, false],
            [true, true, true, true, true, true, true],
            [true, true, true, false, true, true, true],
            [true, true, true, true, true, true, true],
            [false, false, true, true, true, false, false],
            [false, false, true, true, true, false, false]
        ];
    }

    /**Set the inner board's state
     * @param array $board being the new board
     * @return $this
     */
    public function setBoard(array $board) : self{
        if($this->isValidBoard($board))
            $this->session->set(self::BOARD_SESSION_KEY, $board);
        else {
            $x = self::X_LEN;
            $y = self::Y_LEN;
            throw new InvalidArgumentException("Invalid board, must be {$x}x{$y}");
        }

        return $this;
    }

    /**Unset the board and the backups
     * @return $this
     */
    public function unsetBoard() : self{
        $this->session->unset(self::BOARD_SESSION_KEY);
        $this->session->unset(self::PREV_BOARD_SESSION_KEY);
        return $this;
    }

    /**Get the invalid states/positions
     * @return array
     */
    public function getInvalidStates() : array{
        return [
            /*y\x*/
            /*0*/[true, true, false, false, false, true, true],
            /*1*/[true, true, false, false, false, true, true],
            /*2*/[false, false, false, false, false, false, false],
            /*3*/[false, false, false, false, false, false, false],
            /*4*/[false, false, false, false, false, false, false],
            /*5*/[true, true, false, false, false, true, true],
            /*6*/[true, true, false, false, false, true, true]
        ];
    }

    /** Retrieve the inner board
     * @return array
     */
    public function getBoard() : array{
        if(!$this->session->has(self::BOARD_SESSION_KEY)) {
            $this->setBackups([]);
            $this->setBoard($this->getInitBoard());
        }
        return $this->session->get(self::BOARD_SESSION_KEY);
    }

    /**Determine whether or not the current board state is a victory state
     * @return bool
     */
    public function won() : bool{
        $board = $this->getBoard();
        return array_reduce($board, function(int $acc, array $row){
            return array_reduce($row, function(int $count, $col){
                return $count + ($col ? 1 : 0);
            }, $acc);
        }, 0) === 1;
    }

    /**Determine whether or not the current board state is a defeat state
     * @return bool
     */
    public function lost() : bool{
        if($this->won())
            return false;

        $board = $this->getBoard();
        $pawns = [];
        for($y=0, $row_amount=self::Y_LEN ; $y < $row_amount ; $y+=1){
            for($x=0, $col_amount=self::X_LEN ; $x < $col_amount ; $x+=1){
                $pawn_tmp = $board[$y][$x];
                if($pawn_tmp)
                    $pawns[] = [
                        "x" => $x,
                        "y" => $y
                    ];
            }
        }

        foreach($pawns as $pawn){
            $x = $pawn["x"];
            $y = $pawn["y"];

            $possiblyAvailable = [];
            $possiblyAvailable[] = ["x" => $x, "y" => $y-2];
            $possiblyAvailable[] = ["x" => $x, "y" => $y+2];
            $possiblyAvailable[] = ["x" => $x-2, "y" => $y];
            $possiblyAvailable[] = ["x" => $x+2, "y" => $y];

            foreach($possiblyAvailable as $possibility){
                try{
                    if($this->canGo($x, $y, $possibility["x"], $possibility["y"]))
                        return false;
                }catch(Throwable $t){
                    continue;
                }
            }
        }
        return true;
    }

    /**Determines whether or not a x-coordinate is valid
     * @param int $x being the x-coordinate
     * @return bool
     */
    protected function isValidXcoordinate(int $x) : bool{
        return $x < self::X_LEN && $x >= 0;
    }

    /**Determines whether or not a y-coordinate is valid
     * @param int $y being the y-coordinate
     * @return bool
     */
    protected function isValidYcoordinate(int $y) : bool{
        return $y < self::Y_LEN && $y >= 0;
    }

    /**Determines whether or not a pair of coordinates is valid
     * @param int $x being the x-coordinate
     * @param int $y being the y-coordinate
     * @return bool
     */
    protected function isValidCoordinate(int $x, int $y) : bool{
        return $this->isValidXcoordinate($x) && $this->isValidYcoordinate($y);
    }

    /**Determines whether or not the given position is invalid
     * @param int $x being the x-coordinate of the given position
     * @param int $y being the y-coordinate of the given position
     * @return mixed
     */
    public function isInvalidPosition(int $x, int $y){
        if(!$this->isValidXcoordinate($x))
            throw new InvalidArgumentException("Invalid X");
        if(!$this->isValidYcoordinate($y))
            throw new InvalidArgumentException("Invalid Y");

        return $this->getInvalidStates()[$y][$x];
    }

    /**Determines whether or not you can go from the current to the next position
     * @param int $cx being the x-coordinate of the current position
     * @param int $cy being the y-coordinate of the current position
     * @param int $nx being the x-coordinate of the next position
     * @param int $ny being the y-coordinate of the next position
     * @return bool
     */
    public function canGo(int $cx, int $cy, int $nx, int $ny) : bool{
        if(!($this->isValidCoordinate($cx, $cy) && $this->isValidCoordinate($nx, $ny)))
            throw new InvalidArgumentException("Invalid coordinates");

        if($this->isInvalidPosition($cx, $cy) || $this->isInvalidPosition($nx, $ny))
            throw new InvalidArgumentException("Invalid coordinates");

        $deltaX = abs($nx - $cx);
        $deltaY = abs($ny - $cy);
        if($this->invalidDeltas($deltaX, $deltaY))
            return false;

        if(!$this->intermediateIsPawn($cx, $cy, $nx, $ny))
            return false;

        return !$this->getBoard()[$ny][$nx];//There must not be a pawn on the next position
    }

    /**Determine whether or not the given deltas are invalid
     * @param int $dx being the delta on the x-axis
     * @param int $dy being the delta on the y-axis
     * @return bool
     */
    protected function invalidDeltas(int $dx, int $dy) : bool{
        $dx = abs($dx);
        $dy = abs($dy);

        if(!($dx%2==0 && $dy%2==0))
            return true;

        $valids = [
            [2,0],
            [0,2]
        ];

        return !in_array([$dx, $dy], $valids);
    }

    /**Determines whether or not the intermediate position has a pawn on it
     * @param int $cx being the x-coordinate of the current position
     * @param int $cy being the y-coordinate of the current position
     * @param int $nx being the x-coordinate of the next position
     * @param int $ny being the y-coordinate of the next position
     * @return bool
     */
    protected function intermediateIsPawn(int $cx, int $cy, int $nx, int $ny) : bool{
        if(!($this->isValidCoordinate($cx, $cy) && $this->isValidCoordinate($nx, $ny)))
            throw new InvalidArgumentException("Invalid coordinates");

        $signedDeltaX = $nx - $cx;
        $signedDeltaY = $ny - $cy;

        $ix = $cx + ($signedDeltaX / 2);
        $iy = $cy + ($signedDeltaY / 2);

        return $this->getBoard()[$iy][$ix];
    }

    /**Moves from the current position to the next position
     * @param int $cx being the x-coordinate of the current position
     * @param int $cy being the y-coordinate of the current position
     * @param int $nx being the x-coordinate of the next position
     * @param int $ny being the y-coordinate of the next position
     */
    public function move(int $cx, int $cy, int $nx, int $ny){
        if(!($this->isValidCoordinate($cx, $cy) && $this->isValidCoordinate($nx, $ny) && $this->canGo($cx, $cy, $nx, $ny)))
            throw new InvalidArgumentException("Invalid coordinates");

        $signedDeltaX = $nx - $cx;
        $signedDeltaY = $ny - $cy;

        $ix = $cx + ($signedDeltaX / 2);
        $iy = $cy + ($signedDeltaY / 2);

        $board = $this->getBoard();
        $this->addBackup($board);
        $board[$cy][$cx] = false;
        $board[$iy][$ix] = false;
        $board[$ny][$nx] = true;
        $this->setBoard($board);
    }


    /**Retrieve the backups array from the session
     * @return array
     */
    protected function getBackups() : array{
        if(!$this->session->has(self::PREV_BOARD_SESSION_KEY))
            $this->setBackups([]);

        return $this->session->get(self::PREV_BOARD_SESSION_KEY);
    }

    /**Set the backups array in the session
     * @param array $bkp being the new backups array
     * @return SolitaireModel
     */
    protected function setBackups(array $bkp) : self{
        $this->session->set(self::PREV_BOARD_SESSION_KEY, $bkp);
        return $this;
    }

    /**Adds a backup of a board to the backups array
     * @param array $board being the new backup to add
     * @return SolitaireModel
     */
    public function addBackup(array $board) : self{
        $bkp = $this->getBackups();
        $bkp[] = $board;
        $this->setBackups($bkp);
        return $this;
    }

    /**Retrieve the last backup from the backups array (LIFO)
     * @return array|null
     */
    public function getLastBackup() : ?array{
        $bkp = $this->getBackups();
        $length = count($bkp);
        return ($length < 1 ? null : $bkp[ $length - 1 ]);
    }

    /**Deletes the backup that was added last (LIFO)
     * @return SolitaireModel
     */
    public function deleteLastBackup() : self{
        $bkp = $this->getBackups();
        array_pop($bkp);
        $this->setBackups($bkp);
        return $this;
    }




    //Cheats/debug zone
    public function getInstantLosingBoard() : array{
        return [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false]
        ];
    }

    public function getInstantWinBoard() : array{
        return [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, true, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false]
        ];
    }

    public function getWinningBoard() : array{
        return [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, true, true, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false]
        ];
    }

    public function getLosingBoard() : array{
        return [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, true, true, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, true, false, false, false],
            [false, false, false, false, false, false, false]
        ];
    }
}