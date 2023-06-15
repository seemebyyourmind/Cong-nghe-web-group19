import PoolManager from "PoolManager";
import Hero from "Hero";
import LevelController from "LevelController";
import GameManager from 'GameManager';

cc.Class({
    extends: cc.Component,

    properties: {
        isPlaced: cc.Boolean,
        heroPanel: cc.Node,
        heroLabel: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.showHeroPanel,this);

        this.heroLabel.forEach((sprite, index) => {
            sprite.on(cc.Node.EventType.TOUCH_END, () => {
                this.spawnHero(index);
            }, this);
        });
    },


    spawnHero(index){
        const heroList = GameManager.instance.heroList;
        let hero = cc.instantiate(heroList[index]);
        hero.parent = this.node;
        hero.getComponent("Hero").onSpawn();
        this.isPlaced = true;

        this.clickClose();
        
    },

    start () {
        
    },

    showHeroPanel(){
        const heroList = GameManager.instance.heroList;
        for (var i = 0; i < heroList.length; i++){
            const newHero = cc.instantiate(heroList[i]);
            var sprite = newHero.getComponent('Hero').avatar;
            this.heroLabel[i].active = true;
            this.heroLabel[i].getComponent(cc.Sprite).spriteFrame = sprite;
        }
        if (!this.isPlaced){
            this.heroPanel.active = true;
        }
        
    },

    clickClose(){
        this.heroPanel.active = false;
    }
});
