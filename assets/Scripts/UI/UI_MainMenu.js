import UIManager from 'UIManager';
import LevelController from 'LevelController';

cc.Class({
    extends: cc.Component,

    properties: {
        infoScreen: cc.Node,
        userScreen: cc.Node,
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
    },

    openUserScreen(){
        this.infoScreen.active = false;
        this.userScreen.active = true;
    },

    openInfoScreen(){
        this.infoScreen.active = true;
        this.userScreen.active = false;
    }
});
