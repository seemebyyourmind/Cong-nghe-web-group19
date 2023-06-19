// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    usernameLabel: cc.Label,

    passwordLabel: cc.Label,

    usernameTextBox: cc.EditBox,

    passwordTextBox: cc.EditBox,

    loginButton: cc.Button,

    logErr: cc.Node,
  },

  onLoad() {
    // Hàm này được gọi khi component được tạo và liên kết với một node
    // Được sử dụng để khởi tạo các thành phần và thiết lập sự kiện
    // Khởi tạo các thành phần UI và gán sự kiện
    // Ví dụ:
  },
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},
  clickSubmit() {
    if (this.loginButton !== null)
      this.loginButton.node.on("click", this.onLoginButtonClick, this);
  },

  // this.Destion.string = err;

  clickCloseErr() {
    this.logErr.active = false;
  },
  onLoginButtonClick() {
    console.log(this.usernameTextBox.string);
    console.log(this.passwordTextBox.string);
    this.logErr.active = true;
    console.log(this.logErr);
  },

  // var username = this.usernameTextBox.getString();
  // var password = this.passwordTextBox.getString();
  // console.log(username, password);

  // update (dt) {},
});
