// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
