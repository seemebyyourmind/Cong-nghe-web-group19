
import Hero from 'Hero';
cc.Class({
    extends: Hero,

    properties: {
        skillRemain: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._super();
        this.skillRemain = 0;
        this.defaultPhysicDMG = this.physicDMG;
        this.defaultSPD = this.attackSPD;
    },

    update (dt) {
        this._super(dt);
        
        if (this.isOpenSkill){
            if (this.skillCD <= 0){
                if (this.getTarget() != null){
                    this.castSkill();
                    this.skillCD = 10;
                }
                
            }else{
                this.skillCD -= dt;
            }
    
            if (this.skillRemain > 0){
                this.attackSPD = this.defaultSPD * 1.5;
                this.physicDMG = this.defaultPhysicDMG * 1.5;
                this.skillRemain -= dt;
            }else{
                this.attackSPD = this.defaultSPD;
                this.physicDMG = this.defaultPhysicDMG;
            }
        }
        
    },

    castSkill(){
        const skill = cc.instantiate(this.skill);
        skill.setParent(this.node);
        skill.position = cc.v2(this.node.position.x, this.node.position.y + 50);
        this.skillRemain = skill.getComponent('Hero_Skill').skillDuration;
    },
});
