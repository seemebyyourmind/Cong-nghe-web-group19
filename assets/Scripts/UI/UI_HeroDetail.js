import GameManager from 'GameManager';
import UIManager from'UIManager';
cc.Class({
    extends: cc.Component,

    properties: {
        heroLabel: [cc.Node],
        physicDMG_text: cc.Label,
        magicDMG_text: cc.Label,
        atkSPD_text: cc.Label,

        skillImg: cc.Node,
        skillDescription: cc.Label,
        heroAnimation: cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const heroList = GameManager.instance.heroList;
        for (var i = 0; i < heroList.length; i++){
            const newHero = cc.instantiate(heroList[i]);
            var sprite = newHero.getComponent('Hero').avatar;
            this.heroLabel[i].active = true;
            this.heroLabel[i].getComponent(cc.Sprite).spriteFrame = sprite;
        }

        this.heroLabel.forEach((sprite, index) => {
            sprite.on(cc.Node.EventType.TOUCH_END, () => {
                this.displayHero(index);
            }, this);
        });
    },

    displayHero(index){
        const heroList = GameManager.instance.heroList;
        const newHero = cc.instantiate(heroList[index]).getComponent('Hero');

        this.physicDMG_text.string = newHero.physicDMG.toString();
        this.magicDMG_text.string = newHero.magicDMG.toString();
        this.atkSPD_text.string = newHero.attackSPD.toString();

        const skill = cc.instantiate(newHero.skill).getComponent('Hero_Skill');
        this.skillImg.getComponent(cc.Sprite).spriteFrame = skill.skillImg;
        this.skillDescription.string = skill.skillDescription;

        const clips = this.heroAnimation.getClips();
        this.heroAnimation.play(clips[index].name);
    },

    clickHomeBtn(){
        UIManager.instance.openUIMainMenu();
    }

    
});
