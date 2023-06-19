import Upgrade from 'Upgrade';
import GameDataManager from 'GameDataManager';
import GameManager from 'GameManager';

cc.Class({
    extends: cc.Component,

    properties: {
        upgrade:{
            default: null,
            type: Upgrade,
        },

        upgradeName: cc.Label,
        upgradeImg: cc.Sprite,
        upgradeDescription: cc.Label,
        upgradeCost: cc.Label,
        isSelected: cc.Boolean,
        cost: cc.Float,

    },

    setUpgrade(upgrade){      
        this.upgrade = upgrade;
        this.upgradeName.string = this.upgrade.upgradeName;
        this.upgradeImg.spriteFrame = this.upgrade.image;
        this.upgradeDescription.string = this.upgrade.description;
        this.upgradeCost.string = this.upgrade.cost.toString();
        this.isSelected = false;
        this.cost = this.upgrade.cost;
        this.getComponent('cc.Button').interactable = this.cost <= GameDataManager.instance.coinAmount;
    },

    clickUpgrade(){   
        this.upgrade.upgradeExecute();
        GameDataManager.instance.coinAmount -= this.cost; 
        GameManager.instance.gameplayUI.setCoinAmount(GameDataManager.instance.coinAmount.toString());
        GameManager.instance.gameplayUI.updateButton();
        this.isSelected = true;
        GameManager.instance.gameplayUI.closeUpgradePanel();
    }
});
