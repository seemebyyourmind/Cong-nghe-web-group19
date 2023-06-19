import Bullet from 'Bullet';

cc.Class({
    extends: Bullet,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onInit(target, dmg){
        this.damage = dmg;
        if (target){
            this.node.position = cc.v2(target)
        }
    },

    start () {

    },

    update (dt) {},

    onCollisionEnter: function (other, self) {   
        if (this.isSetFreeze){
            other.getComponent('Enemy').setFreeze(this.freezeTime);
        }
        other.getComponent('Enemy').getDamage(this.damage);
    },

    onDestroy(){
        this.node.destroy();
    }
});
