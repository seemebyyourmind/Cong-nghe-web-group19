/// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameLevel from "GameLevel";
import LevelController from "LevelController";
import PoolManager from "PoolManager";

var Enemy = cc.Class({
    extends: cc.Component,

    properties: {   
        speed: 10,
        health: 10,
        curLv: GameLevel,
        path: [],
        pathIdx: 0,
    },

    onSpawn (){
        this.path = LevelController.instance.curLevel.getComponent('GameLevel').pathList;
        this.pathIdx = 0;
        this.node.position = this.path[0].position;
        this.curHealth = this.health;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    update (dt) {
        var direct = this.path[this.pathIdx].position.sub(this.node.position);
        this.node.scaleX = (direct.x > 0) ? -1 : 1;

        if (direct.mag() > 1){
            var delta = direct.normalize().mulSelf(this.speed);
            this.node.position = cc.v2(this.node.position.x + delta.x, this.node.position.y + delta.y);
        }else{
            this.pathIdx++;
            if (this.pathIdx == this.path.length){
                this.onDespawn();
            }
        }
    },

    getDamage(damage){
        this.curHealth -= damage;
        if (this.curHealth <= 0){
            this.onDespawn();
        }
    },

    onDespawn(){
        this.node.destroy();
    }
});
