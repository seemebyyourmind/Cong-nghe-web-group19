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

    onInit(turretNode, target, dmg){
        this.node.position = turretNode.position;
        this.target = target;
        this.damage = dmg;
    },
    // onLoad () {},

    start () {

    },

    update (dt) {
        if (!this.target.isValid){
            this.node.destroy();
        }
        var distance = this.target.position.sub(this.node.position);
        var direct = distance.normalize().mulSelf(this.speed);

        this.node.position = cc.v2(this.node.position.x + direct.x, this.node.position.y + direct.y);
        const angle = cc.v2(0, 1).signAngle(distance.normalize()) * cc.macro.RAD_TO_DEG;
        this.node.lookAt(this.target.position);
    },

    onCollisionEnter: function (other, self) {
        other.getComponent('Enemy').getDamage(this.damage);
        this.node.destroy();
    },
});
