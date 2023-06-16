import Hero_Skill from 'Hero_Skill';

cc.Class({
    extends: Hero_Skill,

    properties: {
        targetList: [cc.Node],
        atkCD: 0,
        attackSPD: cc.Float,
        anim: cc.Animation,
        bulletPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.atkCD = 1 / this.attackSPD;
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

        if (this.skillDuration <= 0){
            this.node.destroy();
        }
        this.skillDuration -= dt;
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

        this.target = target;
        const currentScale = this.node.scaleX;
        if (this.target.position.x < this.node.position.x){
            this.node.setScale(-Math.abs(currentScale), this.node.scaleY);
        }else{
            this.node.setScale(Math.abs(currentScale), this.node.scaleY);
        }
    },


    spawnBullet(){
        const bullet = cc.instantiate(this.bulletPrefab);
        const parentNode = cc.director.getScene();
        bullet.setParent(parentNode);
        bullet.getComponent('Bullet').onInit(this.node, this.target, this.skillDmg);
    },

    resetIdle(){
        const clips = this.anim.getClips();
        this.anim.play(clips[0].name); // 0 is idle
    },

    getTarget(){
        for (var i = this.targetList.length - 1; i >= 0; i--){
            if (this.targetList[i] != null){
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
