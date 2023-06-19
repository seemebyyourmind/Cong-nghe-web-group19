

cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite,
        imageList: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable(){
        var i = this.getRandomNumber(0, this.imageList.length);
        this.sprite.spriteFrame = this.imageList[i];
    },

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
});
