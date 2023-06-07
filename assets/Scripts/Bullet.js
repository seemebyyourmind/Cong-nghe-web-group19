// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import PoolManager from "PoolManager";

var Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        damage: 10,
        speed: 1,
        target: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onInit(turretNode, target){
        this.node.position = turretNode.position;
        this.target = target;
    },
    // onLoad () {},

    start () {

    },

    update (dt) {
        var distance = this.target.position.sub(this.node.position);
        var direct = distance.normalize().mulSelf(this.speed);

        this.node.position = cc.v2(this.node.position.x + direct.x, this.node.position.y + direct.y);
    },

    onCollisionEnter: function (other, self) {
        other.getComponent('Enemy').getDamage(this.damage);
        PoolManager.instance.deSpawnBullet(this.node);
    },
});
