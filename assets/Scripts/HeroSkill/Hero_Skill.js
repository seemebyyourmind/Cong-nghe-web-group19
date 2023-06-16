
const Hero_Skill = cc.Class({
    extends: cc.Component,

    properties: {
       skillImg: cc.SpriteFrame,
       skillDescription: cc.String,
       skillDuration: cc.Float,
       skillDmg: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onInit(target, dmg){
        this.target = target;
        this.skillDmg = dmg;
        this.direct = this.target.position.sub(this.node.position);
    },
    
    start () {

    },

    update (dt) {
        if (this.skillDuration <= 0){
            this.node.destroy();
        }else{
            this.skillDuration -= dt;
        }
    },

    onCollisionEnter: function (other, self) {
        if (other.getComponent('Enemy')){
            other.getComponent('Enemy').getDamage(this.skillDmg);
        }
        
    },
});
