
import PoolManager from "PoolManager";

const Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        damage: 10,
        speed: 1,
        target: cc.Node,
        isSetFreeze: false,
        freezeTime: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onInit(turretNode, target, dmg){
        this.node.position = turretNode.position;
        this.target = target;
        this.damage = dmg;
    },
    // onLoad () {},

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    update (dt) {
        if (!this.target.isValid){
            this.node.destroy();
        }else{
            var distance = this.target.position.sub(this.node.position);
            var direct = distance.normalize().mulSelf(this.speed);

            this.node.position = cc.v2(this.node.position.x + direct.x, this.node.position.y + direct.y);
            
            const angleRadians = Math.atan2(distance.x, distance.y);
            const angleDegrees = cc.misc.radiansToDegrees(angleRadians);

            this.node.angle = -angleDegrees;
        }
        
    },

    onCollisionEnter: function (other, self) {   
        if (this.isSetFreeze){
            other.getComponent('Enemy').setFreeze(this.freezeTime);
        }
        other.getComponent('Enemy').getDamage(this.damage);
        this.node.destroy();
    },
});
