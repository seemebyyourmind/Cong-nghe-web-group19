// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    uiAbout: cc.Node,
    uiSignUp: cc.Node,
    uiLogin: cc.Node,
    uiBegin: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  clickLogin() {
    this.uiBegin.active = false;
    this.uiLogin.active = true;
  },
  clickCreate() {
    this.uiBegin.active = false;
    this.uiSignUp.active = true;
  },
  clickAbout() {
    this.uiBegin.active = false;
    this.uiAbout.active = true;
  },

  // update (dt) {},
});
