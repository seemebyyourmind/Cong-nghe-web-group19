

cc.Class({
    extends: cc.Component,

    properties: {
        upgradePanel: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    clickOpenUpgradePanel(){
        this.upgradePanel.active = true;
    },

    closeUpgradePanel(){
        this.upgradePanel.active = false;
    }
});
