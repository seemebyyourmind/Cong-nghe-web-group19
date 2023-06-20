import UIManager from 'UIManager';
import LevelController from 'LevelController';

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        if (LevelController.instance != null){
            LevelController.instance.quitLevel();
        }
    },

    clickPlay(){
        UIManager.instance.openUISelectLevel();
    },

    clickHero(){
        UIManager.instance.openUIHeroDetail();
    },

    clickStore() {
        UIManager.instance.openUIStore();
    }
});
