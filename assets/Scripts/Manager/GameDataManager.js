import UIManager from 'UIManager';

const GameDataManager = cc.Class({
    extends: cc.Component,

    properties: {
        coinAmount: 1000,
        levelUnlocked: 0,
    },

    statics: {
        instance: null,
    },
    
    onLoad: function() {
        GameDataManager.instance = this;        
    },

    login(username, password) {

        var url = 'http://localhost/gameserver.php';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                console.log(response);
                if (response == -1){
                    alert("Wrong username or password!");
                }else{
                    // Process the response data
                    alert("Login successfully!");
                    var jsonText = JSON.parse(response);
                    
                    console.log(jsonText.level_unlocked);
                    GameDataManager.instance.levelUnlocked = jsonText.level_unlocked;
                    UIManager.instance.uiMainMenu.getComponent('UI_MainMenu').openUserScreen();
                }
            }
        };

        var request = 'signin';
        var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&request=' + encodeURIComponent(request);

        xhr.send(data);
    },

    signup(username, password){
        var url = 'http://localhost/gameserver.php';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                if (response == -1){
                    alert("Username already taken!");
                }else{
                    alert("Signup successfully");
                    GameDataManager.instance.levelUnlocked = 1;
                    UIManager.instance.uiMainMenu.getComponent('UI_MainMenu').openUserScreen();
                }              
            }
        };

        var request = 'signup';
        var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&request=' + encodeURIComponent(request);

        xhr.send(data);
    }
    
});
