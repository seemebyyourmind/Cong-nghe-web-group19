

import PoolManager from "PoolManager";

const Hero = cc.Class({
    extends: cc.Component,

    properties: {
        physicDMG: cc.Float,
        magicDMG: cc.Float,
        attackSPD: cc.Float,
        skill: cc.Prefab,

        targetList: [cc.Node],
        atkCD: 0,
        skillCD: 5,
        anim: cc.Animation,
        avatar: cc.SpriteFrame,
        bulletPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    onSpawn(){
        console.log(this.node.position);
    },

    onload(){
        this.idleState = this.anim.getState(idleClip.name);
        this.atkState = this.anim.getState(atkClip.name);
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.atkCD = 1 / this.attackSPD;
        //manager.enabledDebugDraw = true;
    },

    update (dt) {
        if (this.atkCD <= 0){
            if (this.getTarget() != null){
                this.attack(this.getTarget());
                this.atkCD = 1 / this.attackSPD;
            }
        }else{
            this.atkCD -= dt;
        }    
    },

    onCollisionEnter(other, self) {
        // Add enemy to the array when it enters the attack range
        const enemy = other.node;
        if (enemy && enemy.group === 'Enemy') {
          this.targetList.push(enemy);
        }
    },

    onCollisionExit(other, self) {
        // Remove enemy from the array when it exits the attack range
        const enemy = other.node;
        if (enemy && enemy.group === 'Enemy') {
            this.removeTarget(enemy);
        }
    },

    attack(target){
        const clips = this.anim.getClips();
        this.anim.play(clips[1].name); // 1 is attack
        this.anim.currentClip.speed = this.attackSPD;

        this.target = target;
        const currentScale = this.node.scaleX;
        if (this.target.position.x < this.node.parent.position.x){
            this.node.setScale(-Math.abs(currentScale), this.node.scaleY);
        }else{
            this.node.setScale(Math.abs(currentScale), this.node.scaleY);
        }
    },


    spawnBullet(){
        const bullet = cc.instantiate(this.bulletPrefab);
        const parentNode = cc.director.getScene();
        bullet.setParent(parentNode);
        bullet.getComponent('Bullet').onInit(this.node.parent, this.target, this.physicDMG + this.magicDMG);
    },

    resetIdle(){
        const clips = this.anim.getClips();
        this.anim.play(clips[0].name); // 0 is idle
    },

    getTarget(){
        for (var i = this.targetList.length - 1; i >= 0; i--){
            if (this.targetList[i].position.sub(this.node.parent.position).mag() < 150 && this.targetList[i] != null){
                return this.targetList[i];
            }

            if (!this.targetList[i].isValid){
                this.removeTarget(this.targetList[i]);
            }
        }
        return null;
    },

    removeTarget(enemy) {
        const index = this.targetList.indexOf(enemy);
        if (index > -1) {
          this.targetList.splice(index, 1);
        }
    },
});

