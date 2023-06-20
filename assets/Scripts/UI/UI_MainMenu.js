import UIManager from 'UIManager';

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    clickPlay(){
        UIManager.instance.openUISelectLevel();
    },

    clickHero(){
        UIManager.instance.openUIHeroDetail();
    }
});
