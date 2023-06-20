import UIManager from 'UIManager';
import GameManager from 'GameManager';
import GameDataManager from 'GameDataManager';

const LevelController = cc.Class({
    extends: cc.Component,

    properties: {
        levelList: [cc.Prefab],
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

        this.curLvIndex = GameManager.instance.selectedLevelID;
        this.loadLevel(this.curLvIndex);
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
        GameManager.instance.gameplayUI.castle = this.curLevel.getComponent('GameLevel').castle.getComponent('Castle');
        GameManager.instance.gameplayUI.setTowerLifeBar();
        UIManager.instance.openUILoading();
        
        setTimeout(() => {
            this.startLevel();
        }, 500);
    },

    startLevel(){
        console.log(this.curLevel);
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
        }, 3000); 
    },

    winLevel(){
        UIManager.instance.openUIWin();
        cc.director.pause();
    }
});
