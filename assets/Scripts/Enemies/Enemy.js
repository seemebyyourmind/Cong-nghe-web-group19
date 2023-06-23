
import GameLevel from "GameLevel";
import LevelController from "LevelController";
import GameManager from 'GameManager';
import GameDataManager from 'GameDataManager';

var Enemy = cc.Class({
    extends: cc.Component,

    properties: {   
        speed: 10,
        health: 10,
        damage: 10,
        curLv: GameLevel,
        coinValue: cc.Float,

        path: [cc.Node],
        pathIdx: 0,
        isFreeze: cc.Boolean,
        freezeTime: 0,
        freezePrefab: cc.Prefab,

        healthBar: cc.ProgressBar,
        isAlive: cc.Boolean,
    },

    onSpawn (path){
        this.isAlive = true;
        this.path = path.pathNode;
        this.pathIdx = 0;
        this.node.position = this.path[0].position;
        this.curHealth = this.health;
        this.isFreeze = false;
        this.healthBar.progress = this.curHealth / this.health;
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
        this.node.scaleX = (direct.x > 0) ? Math.abs(this.node.scaleX) : -Math.abs(this.node.scaleX);
        this.healthBar.reverse = direct.x < 0;

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
        this.healthBar.progress = this.curHealth / this.health;
        if (this.curHealth <= 0 && this.isAlive){
            this.isAlive = false;
            this.onDespawn();
        }
    },

    onDespawn(){
        if (this.isAlive){
            if (this.isFreeze){
                this.freeze.destroy();
            }
            GameDataManager.instance.coinAmount += this.coinValue;
            GameManager.instance.gameplayUI.setCoinAmount(GameDataManager.instance.coinAmount);
            LevelController.instance.increaseProgress();
            GameManager.instance.gameplayUI.upgradeCurrentValue++;
            this.node.destroy();
        }
        
    },

    setFreeze(freezeTime){
        if (!this.isFreeze){
            this.freeze = cc.instantiate(this.freezePrefab);
            const parentNode = this.node.parent;
            this.freeze.setParent(parentNode);
            this.freeze.position = this.node.position;
        }
        this.isFreeze = true;
        this.freezeTime = freezeTime;
    },

    setUnFreeze(){
        this.isFreeze = false;     
        this.freeze.destroy();
    }
});
