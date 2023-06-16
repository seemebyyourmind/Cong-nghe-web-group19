
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
        isFreeze: cc.Boolean,
        freezeTime: 0,
        freezePrefab: cc.Prefab,
    },

    onSpawn (){
        this.path = LevelController.instance.curLevel.getComponent('GameLevel').pathList;
        this.pathIdx = 0;
        this.node.position = this.path[0].position;
        this.curHealth = this.health;
        this.isFreeze = false;
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

        if (!this.isFreeze){
            if (direct.mag() > 1){
                var delta = direct.normalize().mulSelf(this.speed);
                this.node.position = cc.v2(this.node.position.x + delta.x, this.node.position.y + delta.y);
            }else{
                this.pathIdx++;
                if (this.pathIdx == this.path.length){
                    this.onDespawn();
                }
            }
        }else{
            this.freezeTime -= dt;
            if (this.freezeTime <= 0){
                this.setUnFreeze();
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
        if (this.isFreeze){
            this.freeze.destroy();
        }
        
        this.node.destroy();
    },

    setFreeze(freezeTime){
        this.isFreeze = true;
        this.freezeTime = freezeTime;
        this.freeze = cc.instantiate(this.freezePrefab);
        const parentNode = cc.director.getScene();
        this.freeze.setParent(parentNode);
        this.freeze.position = this.node.position;
    },

    setUnFreeze(){
        this.isFreeze = false;     
        this.freeze.destroy();
    }
});
