import MessagePanel from 'MessagePanel';

const UIManager = cc.Class({
    extends: cc.Component,

    properties: {
        uiGameplay: cc.Node,
        uiMainMenu: cc.Node,
        uiSelectLevel: cc.Node,
        uiHeroDetail: cc.Node,
        uiLose: cc.Node,
        uiWin: cc.Node,
        uiLoading: cc.Node,
        messagePanel: MessagePanel,
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
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiLoading.active = false;
        this.uiSelectLevel.active = false;
    },

    openUIMainMenu(){
        this.uiMainMenu.active = true;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiLoading.active = false;
        this.uiSelectLevel.active = false;
    },

    openUIHeroDetail(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = true;
        this.uiLose.active = false;
        this.uiLoading.active = false;
        this.uiWin.active = false;
        this.uiSelectLevel.active = false;
    },

    openUILose(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
        this.uiLose.active = true;
        this.uiWin.active = false;
        this.uiLoading.active = false;
        this.uiSelectLevel.active = false;
    },

    openUIWin(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
        this.uiLose.active = false;
        this.uiWin.active = true;
        this.uiSelectLevel.active = false;
        this.uiLoading.active = false;
    },

    openUILoading(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiSelectLevel.active = false;
        this.uiLoading.active = true;
    },

    openUISelectLevel(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = false;
        this.uiLose.active = false;
        this.uiWin.active = false;
        this.uiSelectLevel.active = true;
        this.uiLoading.active = false;
    },

    openUIStore(){
        this.uiMainMenu.active = false;
        this.uiGameplay.active = false;
        this.uiHeroDetail.active = true;
        this.uiLose.active = false;
        this.uiLoading.active = false;
        this.uiWin.active = false;
        this.uiSelectLevel.active = false;
    },

    openMessagePanel(message, state){
        this.messagePanel.onOpen(message, state);
    }
});
