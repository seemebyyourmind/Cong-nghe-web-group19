// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import PoolManager from "PoolManager";

cc.Class({
    extends: cc.Component,

    properties: {
        targetList: [cc.Node],
        atkCD: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.OnButtonPress,this);
    },


    OnButtonPress(){
        console.log(this.node.position);
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },

    update (dt) {
        if (this.atkCD <= 0){
            if (this.getTarget() != null){
                this.fireBullet(this.getTarget());
                this.atkCD = 2;
            }
        }else{
            this.atkCD -= dt;
        }
    },

    onCollisionEnter: function (other, self) {
        this.targetList.push(other.node);
    },

    onCollisionExit: function (other, self){
        this.targetList.pop(other.node);
    },

    fireBullet(target){
        PoolManager.instance.spawnBullet(this, target);
    },

    getTarget(){
        for (var i = 0; i < this.targetList.length; i++){
            if (this.targetList[i].position.sub(this.node.position).mag() < 80){
                return this.targetList[i];
            }
        }
    }


});
