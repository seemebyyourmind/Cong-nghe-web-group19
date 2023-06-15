import Bullet from 'Bullet';

cc.Class({
    extends: Bullet,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onInit(target, dmg){
        this.damage = dmg;
        this.node.position = target.position;
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
