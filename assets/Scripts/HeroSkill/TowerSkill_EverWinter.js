import TowerSkill from 'TowerSkill';

cc.Class({
    extends: TowerSkill,

    properties: {
        collider: cc.BoxCollider,
        freezeTime: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other, self) {   
        if (other.node.group == 'Enemy'){
            other.getComponent('Enemy').setFreeze(this.freezeTime);
            other.getComponent('Enemy').getDamage(this.damage);

        }       
    },

    onEnableCollider(){
        this.collider.enabled = true;
    }

});
