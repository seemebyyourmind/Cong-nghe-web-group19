import UIManager from 'UIManager';
import GameLevel from 'GameLevel.js';
import GameDataManager from 'GameDataManager';

var LevelController = cc.Class({
    extends: cc.Component,

    properties: {
        levelList:{
            default: [],
            type: cc.Prefab,
        },
        curLvIndex: 0,

        curLevel: cc.Node,

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
        cc.director.resume();

        if (this.curLevel){
            this.curLevel.destroy();
        }
        this.curLevel = cc.instantiate(this.levelList[index]);
        this.curLevel.parent = this.node;
        this.curLvProgress = 0;
        console.log("Max :" + this.curLevel.getComponent('GameLevel').maxProgress);
        UIManager.instance.openUILoading();
        setTimeout(this.startLevel, 500);
    },

    startLevel(){
        console.log("Progress :" + this.curLvProgress);
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
        console.log(this.curLvProgress);
        if (this.curLvProgress == this.curLevel.getComponent('GameLevel').maxProgress){
            setTimeout(this.winLevel, 3000);
        }
    },

    loseLevel(){
        setTimeout(function() {
            UIManager.instance.openUILose();
            cc.director.pause();
        }, 3000); 
    },

    winLevel(){
        UIManager.instance.openUIWin();
        cc.director.pause();
    }


});
