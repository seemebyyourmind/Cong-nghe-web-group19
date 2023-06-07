
import LevelController from 'LevelController';

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    clickPlay(){
        cc.director.loadScene('GameplayScene');
    }
});
