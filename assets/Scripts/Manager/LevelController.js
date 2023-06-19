import UIManager from 'UIManager';
import GameLevel from "GameLevel";

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
    },

    statics: {
        instance: null,
    },

    // LIFE-CYCLE CALLBACKS:

    
    
    onLoad() {
        LevelController.instance = this;       
        this.curLvIndex = 0;
        this.startLevel();
    },

    start () {
        
    },


    // update (dt) {},

    loadLevel(index){
        this.curLevel = cc.instantiate(this.levelList[index]);
        this.curLevel.parent = this.node;
        UIManager.instance.openUIGameplay();
    },

    startLevel(){
        this.loadLevel(this.curLvIndex);
    },

    replay(){
        this.loadLevel(this.curLvIndex);
    },

    nextLevel(){
        this.curLvIndex++;
        this.loadLevel(this.curLvIndex);
    }
});
