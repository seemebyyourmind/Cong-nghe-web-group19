// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Hero from 'Hero';

var GameManager = new cc.Class({
    extends: cc.Component,

    properties: {
        heroList: [Hero],
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    },
    
    onLoad: function() {
        cc.game.addPersistRootNode(this.node);
        GameManager.instance = this;
        
    },

    start () {

    },
});
