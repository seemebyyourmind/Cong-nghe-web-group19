import UI_Gameplay from 'UI_Gameplay';

const GameManager = cc.Class({
    extends: cc.Component,

    properties: {
        heroList: [cc.Prefab],
        gameplayUI: UI_Gameplay,
        selectedLevelID: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    },
    
    onLoad() {   
        GameManager.instance = this;       
        cc.game.addPersistRootNode(this.node);
    },

    pauseGame(){
        cc.director.pause();
    },

    resumeGame(){
        cc.director.resume();
    },

});
