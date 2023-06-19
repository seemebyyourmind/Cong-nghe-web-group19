import GameDataManager from 'GameDataManager';
import GameManager from 'GameManager';

cc.Class({
    extends: cc.Component,

    properties: {
        towerSkill: cc.Prefab,
        index: 0,
        cost: cc.Float,
        costText: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const skill = cc.instantiate(this.towerSkill);
        this.cost = skill.getComponent('TowerSkill').cost;
        this.costText.string = this.cost.toString();
    },


    update (dt) {
        this.getComponent('cc.Button').interactable = GameDataManager.instance.coinAmount >= this.cost;
    },

    onClickButton(){
        GameManager.instance.gameplayUI.chooseTowerSkill(this.index);
        GameDataManager.instance.coinAmount -= this.cost;
        GameManager.instance.gameplayUI.setCoinAmount(GameDataManager.instance.coinAmount);
    }
});
