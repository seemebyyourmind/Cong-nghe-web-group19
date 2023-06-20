

const TowerSkill = cc.Class({
    extends: cc.Component,

    properties: {
        damage: 1000,
        cost: 1000,
        duration: 2,
    },

    // LIFE-CYCLE CALLBACKS:


    update(dt){
        this.duration -= dt;
        if(this.duration <= 0){
            this.node.destroy();
        }
    }
});
