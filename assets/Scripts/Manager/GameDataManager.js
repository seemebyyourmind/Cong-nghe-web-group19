// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const GameDataManager = cc.Class({
    extends: cc.Component,

    properties: {
        coinAmount: 1000,
    },

    statics: {
        instance: null,
    },
    
    onLoad: function() {
        GameDataManager.instance = this;        
    },


    start () {

    },

    // update (dt) {},
    
});
