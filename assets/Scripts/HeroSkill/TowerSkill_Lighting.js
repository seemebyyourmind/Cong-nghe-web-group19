import TowerSkill from 'TowerSkill';

cc.Class({
    extends: TowerSkill,

    properties: {
        collider: cc.BoxCollider,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other, self) {   
        if (other.node.group == 'Enemy'){
            other.getComponent('Enemy').getDamage(this.damage);
        }       
    },

    onEnableCollider(){
        this.collider.enabled = true;
    }

});
