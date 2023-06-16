
import Hero from 'Hero';

const GameManager = new cc.Class({
    extends: cc.Component,

    properties: {
        heroList: [cc.Prefab],
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
