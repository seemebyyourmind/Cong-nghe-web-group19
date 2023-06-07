// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    },

    start () {
        this.startLevel();
    },


    // update (dt) {},

    loadLevel(index){
        this.curLevel = cc.instantiate(this.levelList[index]);
        this.curLevel.parent = this.node;
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
