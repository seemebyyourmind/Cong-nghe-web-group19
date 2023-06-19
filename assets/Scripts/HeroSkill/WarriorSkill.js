import Hero_Skill from 'Hero_Skill';

cc.Class({
    extends: Hero_Skill,

    properties: {
        target: cc.Node,
        speed: cc.Float,
        freezeTime: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onInit(target, dmg, freezeTime){
        this.target = target;
        this.skillDmg = dmg;
        this.freezeTime = freezeTime;
        this.direct = this.target.position.sub(this.node.position);
    },

    update (dt) {
        if (this.skillDuration <= 0){
            this.node.destroy();
        }else{
            this.skillDuration -= dt;
            var moveStep = this.direct.normalize().mulSelf(this.speed);

            this.node.position = cc.v2(this.node.position.x + moveStep.x, this.node.position.y + moveStep.y);
            const angleRadians = Math.atan2(moveStep.x, moveStep.y);
            const angleDegrees = cc.misc.radiansToDegrees(angleRadians);

            this.node.angle = -angleDegrees;
        }
    },

    onCollisionEnter: function (other, self) {
        console.log("WarriorSkill");
        const enemy = other.getComponent('Enemy');
        other.getComponent('Enemy').setFreeze(this.freezeTime);
        other.getComponent('Enemy').getDamage(this.skillDmg); 
    },
});
