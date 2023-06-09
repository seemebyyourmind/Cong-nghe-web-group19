import GameDataManager from 'GameDataManager';
import UIManager from 'UIManager';
import GameManager from 'GameManager';

cc.Class({
    extends: cc.Component,

    properties: {
        levelList: [cc.Prefab],
        levelBtn: [cc.Button],
        levelPreviewPanel: cc.Node,

        previewBG: cc.Sprite,
        previewLevelName: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable(){
        console.log(GameDataManager.instance.levelUnlocked);
        for (var i = 0; i < this.levelBtn.length; i++){
            this.levelBtn[i].interactable = false;
            console.log(i);
        }

        for (var i = 0; i < GameDataManager.instance.levelUnlocked; i++){
            this.levelBtn[i].interactable = true;
            console.log(i);
        }
    },

    onLoad () {
        this.levelBtn.forEach((button, index) => {
            button.node.on(cc.Node.EventType.TOUCH_END, () => {
                this.previewLevel(index);
            }, this);
        });      
    },

    previewLevel(index){
        if (this.levelBtn[index].interactable){
            const level = cc.instantiate(this.levelList[index]).getComponent('GameLevel');
            this.previewBG.spriteFrame = level.levelBG;
            this.previewLevelName.string = level.levelName;
            this.levelPreviewPanel.active = true;
            GameManager.instance.selectedLevelID = index;
        }
        
    },

    closePreviewPanel(){
        this.levelPreviewPanel.active = false;
    },

    clickStartLevel(){
        this.levelPreviewPanel.active = false;
        this.node.active = false;
        cc.director.loadScene('GameplayScene');
    },

    clickHomeBtn(){
        this.levelPreviewPanel.active = false;
        UIManager.instance.openUIMainMenu();
    },

});
