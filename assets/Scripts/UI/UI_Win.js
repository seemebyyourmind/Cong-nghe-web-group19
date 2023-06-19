import LevelController from "LevelController";
import UIManager from 'UIManager';
cc.Class({
    extends: cc.Component,

    properties: {

    },

    clickNextLevel(){
        LevelController.instance.nextLevel();
    },

    clickHome(){
        LevelController.instance.quitLevel();
        UIManager.instance.openUIMainMenu();
    }
});
