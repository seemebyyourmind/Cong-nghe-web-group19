

import PoolManager from "PoolManager";

var Hero = cc.Class({
    extends: cc.Component,

    properties: {
        targetList: [cc.Node],
        atkCD: 0,
        anim: cc.Animation,
        avatar: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:
    onSpawn(){
        console.log(this.node.position);
    },

    onload(){
        const [idleClip, atkClip] = this.anim.clips;
        this.idleState = this.anim.getState(idleClip.name);
        this.atkState = this.anim.getState(atkClip.name);
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },

    update (dt) {
        if (this.atkCD <= 0){
            if (this.getTarget() != null){
                this.attack(this.getTarget());
                this.atkCD = 2;
            }
        }else{
            this.atkCD -= dt;
        }
    },

    onCollisionEnter: function (other, self) {
        this.targetList.push(other.node);
    },

    attack(target){
        this.anim.play('Archer_attack');
        this.target = target;
    },

    spawnBullet(){
        PoolManager.instance.spawnBullet(this.node.parent, this.target);
        this.anim.play('Archer_idle');
    },

    getTarget(){

        for (var i = this.targetList.length - 1; i >= 0; i--){
            if (this.targetList[i].position.sub(this.node.parent.position).mag() < 150 && this.targetList[i] != null){
                return this.targetList[i];
            }else{
                this.targetList.pop();
            }
        }
    },
});

