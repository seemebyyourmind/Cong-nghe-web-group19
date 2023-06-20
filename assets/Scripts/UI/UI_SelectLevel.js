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

    onLoad () {
        this.levelBtn.forEach((button, index) => {
            button.node.on(cc.Node.EventType.TOUCH_END, () => {
                this.previewLevel(index);
            }, this);
        });
    },

    previewLevel(index){
        const level = cc.instantiate(this.levelList[index]).getComponent('GameLevel');
        this.previewBG.spriteFrame = level.levelBG;
        this.previewLevelName.string = level.name;
        this.levelPreviewPanel.active = true;
        GameManager.instance.selectedLevelID = index;
    },

    closePreviewPanel(){
        this.levelPreviewPanel.active = false;
    },

    clickStartLevel(){
        cc.director.loadScene('GameplayScene');
    }

});
