import PoolManager from "PoolManager";
import Hero from "Hero";
import LevelController from "LevelController";

cc.Class({
    extends: cc.Component,

    properties: {
        heroPrefab: cc.Prefab,
        isPlaced: cc.Boolean,
        heroPanel: cc.Node,
        heroLabel: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.showHeroPanel,this);

        for (var i = 0; i < this.heroLabel.length; i++){
            this.heroLabel[i].on(cc.Node.EventType.TOUCH_START,this.spawnHero, this);
        }
    },


    spawnHero(){
        if (this.isPlaced == false){
            let hero = cc.instantiate(this.heroPrefab);
            hero.parent = this.node;
            hero.getComponent("Hero").onSpawn();
            this.isPlaced = true;

            this.heroPanel.destroy();
        } 
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },

    showHeroPanel(){
        console.log(LevelController.instance.curLevel.heroList);
        for (var i = 0; i < LevelController.instance.curLevel.heroList.length; i++){
            this.heroLabel[i].getComponent(Sprite).spriteframe = LevelController.instance.curLevel.heroList[i].getComponent('Hero').avatar;
        }
        this.heroPanel.active = true;
    }
});
