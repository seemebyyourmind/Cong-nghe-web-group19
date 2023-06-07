// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { instance } from "PoolManager";
import Hero from "Hero";
var GameLevel = cc.Class({
    extends: cc.Component,

    properties: {
        pathList: {
            default: [],
            type: cc.Node
        },

        heroList: [cc.Prefab],
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.spawnFrame = 0;
    },

    update (dt) {
        this.spawnFrame++;
        if (this.spawnFrame % 100 == 0){
            instance.spawnEnemy();
        }
    },
});
