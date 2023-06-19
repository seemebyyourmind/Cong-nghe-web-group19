import LevelController from "LevelController";
import UIManager from 'UIManager';
cc.Class({
    extends: cc.Component,

    properties: {

    },

    clickReplay(){
        LevelController.instance.replay();
        UIManager.instance.openUIGameplay();
    },

    clickHome(){
        LevelController.instance.quitLevel();
        UIManager.instance.openUIMainMenu();
    }
});
