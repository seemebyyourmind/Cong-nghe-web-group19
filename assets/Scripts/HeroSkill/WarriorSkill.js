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

    start () {

    },

    update (dt) {
        if (this.skillDuration <= 0){
            this.node.destroy();
        }else{
            this.skillDuration -= dt;
            var moveStep = this.direct.normalize().mulSelf(-this.speed);

            this.node.position = cc.v2(this.node.position.x + moveStep.x, this.node.position.y + moveStep.y);
            const angle = cc.v2(0, 1).signAngle(moveStep.normalize()) * cc.macro.RAD_TO_DEG;
            this.node.lookAt(this.target.position);
        }
    },

    onCollisionEnter: function (other, self) {
        console.log("WarriorSkill");
        const enemy = other.getComponent('Enemy');
        other.getComponent('Enemy').setFreeze(this.freezeTime);
        other.getComponent('Enemy').getDamage(this.skillDmg); 
    },
});
