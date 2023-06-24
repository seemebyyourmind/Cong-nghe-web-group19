import UIManager from 'UIManager';

const GameDataManager = cc.Class({
    extends: cc.Component,

    properties: {
        coinAmount: 1000,
        currentUsername: cc.String,
        levelUnlocked: 0,
    },

    statics: {
        instance: null,
    },
    
    onLoad: function() {
        GameDataManager.instance = this;        
    },

    login(username, password) {

        //var url = 'https://webgame19.000webhostapp.com/gameserver.php';
        var url = 'http://localhost/gameserver.php';


        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;

                if (response == -1){
                    UIManager.instance.openMessagePanel("Username or Password incorrect!", false);
                }else{
                    // Process the response data
                    UIManager.instance.openMessagePanel("Login successfully!", true);
                    var jsonText = JSON.parse(response);

                    GameDataManager.instance.levelUnlocked = jsonText.level_unlocked;
                    GameDataManager.instance.currentUsername = username;
                    UIManager.instance.uiMainMenu.getComponent('UI_MainMenu').openUserScreen();
                }
            }
        };

        var request = 'signin';
        var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&request=' + encodeURIComponent(request);

        xhr.send(data);
    },

    signup(username, password){
        //var url = 'https://webgame19.000webhostapp.com/gameserver.php';
        var url = 'http://localhost/gameserver.php';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                if (response == -1){
                    UIManager.instance.openMessagePanel("Username already taken!", false);
                }else{
                    UIManager.instance.openMessagePanel("Signup successfully!", true);
                    GameDataManager.instance.levelUnlocked = 1;
                    GameDataManager.instance.currentUsername = username;
                    UIManager.instance.uiMainMenu.getComponent('UI_MainMenu').openUserScreen();
                }              
            }
        };

        var request = 'signup';
        var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&request=' + encodeURIComponent(request);

        xhr.send(data);
    },

    saveData(){
        //var url = 'https://webgame19.000webhostapp.com/gameserver.php';
        var url = 'http://localhost/gameserver.php';


        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var request = 'save';
        var data = 'username=' + encodeURIComponent(GameDataManager.instance.currentUsername) + '&request=' + encodeURIComponent(request) + '&value=' + encodeURIComponent(GameDataManager.instance.levelUnlocked);

        xhr.send(data);
    }
    
});


