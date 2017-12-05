<?php
namespace Project\controllers;
use Error;
use Project\Helpers\Database\DBConnection;
use Project\Helpers\Http\Request;
use Project\Helpers\Rendering\I_ViewRenderEngine;
use Project\helpers\rendering\NativeRenderEngine;
use Project\Helpers\Routing\Router;

/**
 * Class NativeRenderEngineController
 * @package Project\controllers
 * @author Ludwig GUERIN
 */
class NativeRenderEngineController extends GameController{
    protected $nativeView;

    public function __construct(I_ViewRenderEngine $renderEngine, DBConnection $db) {
        parent::__construct($renderEngine, $db);
        $this->nativeView = new NativeRenderEngine();
        $this->nativeView->addGlobal("debug", $this->session->get("isDebug"));
    }

    /**Renders view for /
     * @param Request $rq being the current HTTP request
     * @param Router $router being the application's router
     * @return mixed|string
     * @throws Error
     */
    public function test(Request $rq, Router $router){
        if(!$rq->isGet())
            throw new Error("POST instead of GET");

        if(!$this->getUsername()) {
            $this->flash->get("success");//Removes flash data from session
            $this->flash->get("failure");//Removes flash data from session
            $this->flash->failure("You need to be connected to have access to this feature.");
            return $this->redirectToLogin($router);
        }

        $userWon = $this->userWon();

        if($userWon)
            $this->flash->success("You won ! We will take that into account !");
        else
            $this->flash->failure("You lost ! You will do better next time !");

        $chartData = [
            "title" => "Victories/Defeats",
            "points" => [
                ["name"=>"victory", "y"=>$this->getWinAmount(), "sliced"=>true, "selected"=>true],
                ["name"=>"defeat", "y"=>$this->getLossAmount()],
            ]
        ];

        return $this->nativeView->renderView("nativeRenderEngine/end.php", [
            "pageName" => "game/end",
            "username" => $this->getUsername(),
            "won" => $userWon,
            "winAmount" => $this->getWinAmount(),
            "lossAmount" => $this->getLossAmount(),
            "lobbiesAmount" => $this->getLobbiesAmount(),
            "winRatio" => 100*$this->getWinRatio(),
            "chartData" => json_encode($chartData),
            "statsForThreeBests" => $this->getStatsForTheThreeBest(),
            "statsKeys" => $this->getStatsKeys()
        ]);
    }
}