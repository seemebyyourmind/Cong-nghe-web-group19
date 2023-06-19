
import Hero from 'Hero';
import UI_Gameplay from 'UI_Gameplay';

const GameManager = new cc.Class({
    extends: cc.Component,

    properties: {
        heroList: [cc.Prefab],
        gameplayUI: UI_Gameplay,
    },

    

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    },
    
    onLoad: function() {
        cc.game.addPersistRootNode(this.node);
        GameManager.instance = this;       
    },

    pauseGame(){
        cc.director.pause();
    },

    resumeGame(){
        cc.director.resume();
    }
});
