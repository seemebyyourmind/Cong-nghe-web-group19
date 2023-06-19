import UIManager from 'UIManager';
import GameLevel from "GameLevel";
import GameDataManager from 'GameDataManager';

var LevelController = cc.Class({
    extends: cc.Component,

    properties: {
        levelList:{
            default: [],
            type: cc.Prefab,
        },
        curLvIndex: 0,
        curLevel: {
            default: null,
            type: GameLevel,
        },

        curLvProgress: cc.Float,
    },

    statics: {
        instance: null,
    },

    // LIFE-CYCLE CALLBACKS:

    
    
    onLoad() {
        LevelController.instance = this;       
        this.curLvIndex = 0;
        this.loadLevel(this.curLvIndex);
    },

    start () {
        
    },


    // update (dt) {},

    loadLevel(index){
        if (this.curLevel){
            this.curLevel.destroy();
        }
        this.curLevel = cc.instantiate(this.levelList[index]);
        this.curLevel.parent = this.node;
        UIManager.instance.openUILoading();
        setTimeout(this.startLevel, 500);
    },

    startLevel(){
        this.curLvProgress = 0;
        cc.director.resume();
        GameDataManager.instance.coinAmount = 1000;
        UIManager.instance.openUIGameplay();
    },

    quitLevel(){
        this.curLevel.destroy();
    },

    replay(){
        this.loadLevel(this.curLvIndex);
    },

    nextLevel(){
        this.curLvIndex++;
        this.loadLevel(this.curLvIndex);
    },

    increaseProgress(){
        this.curLvProgress++;
        if (this.curLvProgress == this.curLevel.getComponent('GameLevel').maxProgress){
            this.winLevel();
        }
    },

    loseLevel(){
        UIManager.instance.openUILose();
        cc.director.pause();
    },

    winLevel(){
        UIManager.instance.openUIWin();
        cc.director.pause();
    }


});
