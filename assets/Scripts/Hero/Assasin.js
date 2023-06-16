
import Hero from 'Hero';
cc.Class({
    extends: Hero,

    properties: {
        skillRemain: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.skillRemain = 0;
    },

    update (dt) {
        this._super(dt);
        
        if (this.skillCD <= 0){
            if (this.getTarget() != null){
                this.castSkill();
                this.skillCD = 10;
            }
            
        }else{
            this.skillCD -= dt;
        }

        if (this.skillRemain > 0){
            this.attackSPD = 2;
            this.physicDMG = 150;
            this.skillRemain -= dt;
        }else{
            this.attackSPD = 1.2;
            this.physicDMG = 100;
        }
    },

    castSkill(){
        const skill = cc.instantiate(this.skill);
        skill.setParent(this.node);
        skill.position = cc.v2(this.node.position.x, this.node.position.y + 50);
        this.skillRemain = skill.getComponent('Hero_Skill').skillDuration;
    },
});
