import GameDataManager from 'GameDataManager';
import UIManager from 'UIManager';

cc.Class({
    extends: cc.Component,

    properties: {
        loginForm: cc.Node,
        loginUserName: cc.Label,
        loginPassword: cc.Label,

        signupForm: cc.Node,
        signupUserName: cc.Label,
        signupPassword: cc.Label,
        signupConfirmPw: cc.Label,
    },

    clickLogin(){
        let username = this.loginUserName.string.trim();
        let password = this.loginPassword.string.trim();

        GameDataManager.instance.login(username, password);
    },

    clickCreateNewAcc(){
        this.loginForm.active = false;
        this.signupForm.active = true;
    },

    clickSignup(){
        let username = this.signupUserName.string.trim();
        let password = this.signupPassword.string.trim();
        let confirmPassword = this.signupConfirmPw.string.trim();

        if (username.length < 5){
            UIManager.instance.openMessagePanel("Username must be 5 characters at least!", false);
        }else if (password.length < 6){   
            UIManager.instance.openMessagePanel("Password must be 6 characters at least!", false);
        }
        else if (username === "" || password === ""){
            UIManager.instance.openMessagePanel("Info cannot be empty!", false);
        }else{
            if (password === confirmPassword){
                GameDataManager.instance.signup(username, password);
            }else{
                UIManager.instance.openMessagePanel("Password does not match!", false);
            }
        }

        
    },

    clickBackToLogin(){
        this.loginForm.active = true;
        this.signupForm.active = false;
    }

    
});
