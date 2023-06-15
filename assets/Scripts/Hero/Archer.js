
import Hero from 'Hero';
cc.Class({
    extends: Hero,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this._super(dt);
        
        if (this.skillCD <= 0){
            if (this.getTarget() != null){
                this.castSkill(this.getTarget());
                this.skillCD = 5;
            }
        }else{
            this.skillCD -= dt;
        }
    },

    castSkill(target){
        const skill = cc.instantiate(this.skill);
        const parentNode = cc.director.getScene();
        skill.setParent(parentNode);
        skill.getComponent('Hero_Skill').onInit(target, 2 * this.physicDMG);
        skill.position = cc.v2(target.position.x, target.position.y);
    },
});
