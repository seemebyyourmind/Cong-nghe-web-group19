// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// Import the functions you need from the SDKs you need
import UIManager from "UIManager";

cc.Class({
  extends: cc.Component,

  properties: {
    usernameLabel: cc.Label,

    passwordLabel: cc.Label,

    usernameTextBox: cc.EditBox,

    passwordTextBox: cc.EditBox,

    loginButton: cc.Button,

    logErr: cc.Node,
    ErrText: cc.Label,

    UsernameRequire: cc.Label,
    PasswordRequire: cc.Label,
    uiMainMenu: cc.Node,
    uiLogin: cc.Node,
    uiBegin: cc.Node,
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

  clickBack() {
    this.uiLogin.active = false;
    this.uiBegin.active = true;
  },
  clickCloseErr() {
    this.logErr.active = false;
  },
  onLoginButtonClick() {
    var username = this.usernameTextBox.string;
    var password = this.passwordTextBox.string;
    // var childnode = this.logErr.getChildByName("Description");

    if (username.length < 6 && password.length < 8) {
      this.UsernameRequire.string = "!!! Username at least 6 character.";
      this.PasswordRequire.string = "!!! Password at least 8 character.";
    } else if (username === "") {
      this.PasswordRequire.string = "";

      this.UsernameRequire.string = "!!! Username at least 6 character.";
    } else if (password === "") {
      this.UsernameRequire.string = "";
      this.PasswordRequire.string = "!!! Password at least 8 character.";
    } else {
      // Thực hiện các tác vụ khác khi dữ liệu hợp lệ
      this.UsernameRequire.string = "";
      this.PasswordRequire.string = "";

      var data = {
        username: this.usernameTextBox.string,
        password: this.passwordTextBox.string,
        action: "login", // Hoặc "register" tùy thuộc vào yêu cầu
      };
      console.log(data);
      // Gửi yêu cầu đến máy chủ
      fetch("http://localhost/testapi/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
          // Xử lý phản hồi từ máy chủ
          if (responseData.success === "ok") {
            this.uiLogin.active = false;
            this.uiMainMenu.active = true;
          } else if (responseData.success === "fail") {
            this.logErr.active = true;
            this.ErrText.string = "Invalid login credentials!!!";
          }

          // Xử lý phản hồi ở đây
        })
        .catch((error) => {
          // Xử lý lỗi khi gửi yêu cầu đến máy chủ
          console.log("Error:", error);
        });
    }
  },

  // var username = this.usernameTextBox.getString();
  // var password = this.passwordTextBox.getString();
  // console.log(username, password);

  // update (dt) {},
});
