// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class(
  {
    extends: cc.Component,

    properties: {
      usernameLabel: cc.Label,
      usernameTextBox: cc.EditBox,

      passwordLabel: cc.Label,
      passwordTextBox: cc.EditBox,

      emailLabel: cc.Label,
      emailTextBox: cc.EditBox,

      password2Label: cc.Label,
      password2TextBox: cc.EditBox,

      loginButton: cc.Button,
      logErr: cc.Node,
      ErrText: cc.Label,

      usernameRequire: cc.Label,
      passwordRequire: cc.Label,
      emailRequire: cc.Label,
      password2Require: cc.Label,

      uiSignUp: cc.Node,
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

    clickBack() {
      this.uiSignUp.active = false;
      this.uiBegin.active = true;
    },
    clickCloseErr() {
      this.logErr.active = false;
    },
    onLoginButtonClick() {
      var username = this.usernameTextBox.string;
      var password = this.passwordTextBox.string;
      var email = this.emailTextBox.string;
      var password2 = this.password2TextBox.string;

      if (username.length < 6) {
        this.usernameRequire.string = "!!! Username at least 6 character.";
      } else {
        this.usernameRequire.string = " ";
      }
      if (password.length < 8) {
        this.passwordRequire.string = "!!! Password at least 8 character.";
      } else {
        this.passwordRequire.string = " ";
      }

      if (password !== password2) {
        this.password2Require.string = "!!! The password do not match.";
      } else {
        this.password2Require.string = " ";
      }

      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        this.emailRequire.string = "!!! The email is invalid. ";
      } else {
        this.emailRequire.string = " ";
      }
      if (
        username.length > 6 &&
        password.length > 8 &&
        password === password2 &&
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
      ) {
        var data = {
          username: this.usernameTextBox.string,
          password: this.passwordTextBox.string,
          email: this.emailTextBox.string,
          level: "1",
          action: "register", // Hoặc "register" tùy thuộc vào yêu cầu
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
            return response.json();
          })
          .then((responseData) => {
            console.log(responseData);
            // Xử lý phản hồi từ máy chủ
            if (responseData.success === "fail") {
              if (responseData.error === "username") {
                this.logErr.active = true;
                this.ErrText.string = "Username already exists";
              }
              if (responseData.error === "email") {
                this.logErr.active = true;
                this.ErrText.string = "Email already exists";
              }
            }
            if (responseData.success === "ok") {
              this.logErr.active = true;
              this.ErrText.string = "Account created. Please log in.";
              this.uiSignUp.active = false;
              this.uiLogin.active = true;
            }
            // Xử lý phản hồi ở đây
          })
          .catch((error) => {
            // Xử lý lỗi khi gửi yêu cầu đến máy chủ
            console.log("Error:", error);
          });
        // this.logErr.active = true;
      }
    },
    // console.log(this.usernameTextBox.string);
    // console.log(this.passwordTextBox.string);
    // console.log(this.password2TextBox.string);
    // console.log(this.emailTextBox.string);
    // this.logErr.active = true;
  }

  // var username = this.usernameTextBox.getString();
  // var password = this.passwordTextBox.getString();
  // console.log(username, password);

  // update (dt) {},
);
