
import Hero from 'Hero';
import LevelController from 'LevelController';
cc.Class({
    extends: Hero,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._super();
    },

    update (dt) {
        this._super(dt);
        
        if (this.isOpenSkill){
            if (this.skillCD <= 0){
                if (this.getTarget() != null){
                    this.castSkill(this.getTarget());
                    this.skillCD = 5;
                }
            }else{
                this.skillCD -= dt;
            }
        }
        
    },

    castSkill(target){
        const skill = cc.instantiate(this.skill);
        const parentNode = LevelController.instance.curLevel;
        skill.setParent(parentNode);
        skill.getComponent('Hero_Skill').onInit(target, 2 * this.physicDMG);
        skill.position = cc.v2(target.position.x, target.position.y);
    },
});
