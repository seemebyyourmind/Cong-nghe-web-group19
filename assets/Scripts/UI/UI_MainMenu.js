
import LevelController from 'LevelController';
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
        cc.director.loadScene('GameplayScene');
        UIManager.instance.openUIGameplay();
    },

    clickHero(){
        UIManager.instance.openUIHeroDetail();
    }
});
