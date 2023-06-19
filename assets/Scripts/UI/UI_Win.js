import LevelController from "LevelController";
import UIManager from 'UIManager';
cc.Class({
    extends: cc.Component,

    properties: {

    },

    clickNextLevel(){
        LevelController.instance.nextLevel();
        UIManager.instance.openUIGameplay();
    },

    clickHome(){
        LevelController.instance.quitLevel();
        UIManager.instance.openUIMainMenu();
    }
});
