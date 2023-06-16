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
                this.skillCD = 20;
            }
        }else{
            this.skillCD -= dt;
        }
    },

    
    spawnBullet(){
        const bullet = cc.instantiate(this.bulletPrefab);
        const parentNode = cc.director.getScene();
        bullet.setParent(parentNode);
        bullet.getComponent('Thunder_Mage').onInit(this.target, this.physicDMG + this.magicDMG);
    },

    castSkill(){
        const skill = cc.instantiate(this.skill);
        const parentNode = cc.director.getScene();
        skill.setParent(parentNode);
        skill.position = cc.v2(this.node.parent.position.x + 30, this.node.parent.position.y + 20);
    },
});
