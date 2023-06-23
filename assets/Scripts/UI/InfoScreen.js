import GameDataManager from 'GameDataManager';

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
        let username = this.loginUserName.string;
        let password = this.loginPassword.string;

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

        if (username === "" || password === ""){
            alert("Cannot be empty");
        }else{
            if (password === confirmPassword){
                GameDataManager.instance.signup(username, password);
            }else{
                console.log("Password incorrect");
            }
        }

        
    },

    clickBackToLogin(){
        this.loginForm.active = true;
        this.signupForm.active = false;
    }

    
});
