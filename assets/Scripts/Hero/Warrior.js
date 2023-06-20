import LevelController from 'LevelController';
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
        
        if (this.isOpenSkill){
            if (this.skillCD <= 0){
                if (this.getTarget() != null){
                    this.castSkill(this.getTarget());
                    this.skillCD = 15;
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
        skill.position = cc.v2(this.node.parent.position.x, this.node.parent.position.y);
        skill.getComponent('WarriorSkill').onInit(target, 1.5 * this.magicDMG, this.freezeTime);
        
    },
});
