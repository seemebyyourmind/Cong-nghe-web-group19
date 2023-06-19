import Hero from 'Hero';
import LevelController from 'LevelController';
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
                    this.skillCD = 20;
                }
            }else{
                this.skillCD -= dt;
            }
        }
        
    },

    
    spawnBullet(){
        if (this.getTarget() != null){
            const bullet = cc.instantiate(this.bulletPrefab);
            const parentNode = LevelController.instance.curLevel;
            bullet.setParent(parentNode);
            bullet.getComponent('Thunder_Mage').onInit(this.getTarget(), this.physicDMG + this.magicDMG);
        }   
    },

    castSkill(){
        const skill = cc.instantiate(this.skill);
        const parentNode = LevelController.instance.curLevel;
        skill.setParent(parentNode);
        skill.position = cc.v2(this.node.parent.position.x + 30, this.node.parent.position.y + 20);
    },
});
