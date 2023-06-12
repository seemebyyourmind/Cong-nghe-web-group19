// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const UIManager = cc.Class({
    extends: cc.Component,

    properties: {
        uiGameplay: cc.Node,
        uiMainMenu: cc.Node,
        uiHeroDetail: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    },
    onLoad () {
        UIManager.instance = this;
    },

    start () {

    },

    openUIGameplay(){
        this.uiMainMenu.active = false;
        this.uiHeroDetail.active = false;
        this.uiGameplay.active = true;
    },

    openUIMainMenu(){
        this.uiMainMenu.active = true;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
    },

    openUIHeroDetail(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = true;
    }
});
