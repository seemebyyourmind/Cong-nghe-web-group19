import PoolManager from "PoolManager";
import Hero from "Hero";
import LevelController from "LevelController";

cc.Class({
    extends: cc.Component,

    properties: {
        heroPrefab: [cc.Prefab],
        isPlaced: cc.Boolean,
        heroPanel: cc.Node,
        heroLabel: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.showHeroPanel,this);

        // for (var i = 0; i < this.heroLabel.length(); i++){
        //     this.heroLabel[i].
        // }
        this.heroLabel.forEach((sprite, index) => {
            sprite.on(cc.Node.EventType.TOUCH_END, () => {
                this.spawnHero(index);
            }, this);
        });
    },


    spawnHero(index){
        if (this.isPlaced == false){
            let hero = cc.instantiate(this.heroPrefab[index]);
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
        const heroList = LevelController.instance.curLevel.getComponent('GameLevel').heroList;
        for (var i = 0; i < heroList.length; i++){
            const newHero = cc.instantiate(heroList[i]);
            var sprite = newHero.getComponent('Hero').avatar;
            this.heroLabel[i].getComponent(cc.Sprite).spriteFrame = sprite;
        }
        this.heroPanel.active = true;
    }
});
