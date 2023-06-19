import GameDataManager from 'GameDataManager';
import LevelController from 'LevelController';
import Upgrade from 'Upgrade';
import GameManager from 'GameManager';

cc.Class({
    extends: cc.Component,

    properties: {
        upgradePanel: cc.Node,
        upgradeButton: [cc.Button],
        upgradePrefab: [cc.Prefab],

        towerLifeBar: cc.ProgressBar,
        towerLifeText: cc.Label,

        coinAmount: cc.Label,
        refreshButton: cc.Button,

        upgradeList: [Upgrade],

        skillCursor: cc.Node,

        upgradeBar: cc.ProgressBar,
        upgradeMaxValue: cc.Float,
        upgradeCurrentValue: cc.Float,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
        for (var i = 0; i < this.upgradePrefab.length; i++){
            var upgrade = cc.instantiate(this.upgradePrefab[i]).getComponent('Upgrade');
            this.upgradeList.push(upgrade);
        }

        this.upgradeCurrentValue = 0;
        this.refreshUpgrade();

        this.castle = LevelController.instance.curLevel.getComponent('GameLevel').castle.getComponent('Castle');
        this.setTowerLifeBar(this.castle.currentHP, this.castle.maxHP);
    },

    chooseTowerSkill(index){
        this.skillCursor.active = true;
        this.skillCursor.getComponent('MagicCursor').onInit(index);
    },

    closeUpgradePanel(){
        cc.director.resume();
        this.upgradePanel.active = false;
    },

    refreshUpgrade(){
        var i, j, k;
        do{
            i = this.getRandomNumber(0, this.upgradeList.length);
            j = this.getRandomNumber(0, this.upgradeList.length);
            k = this.getRandomNumber(0, this.upgradeList.length);
        }while(i == j || i == k || j == k || this.upgradeList[i].selected || this.upgradeList[j].selected || this.upgradeList[k].selected);

        this.upgradeButton[0].getComponent('UpgradeButton').setUpgrade(this.upgradeList[i]);
        this.upgradeButton[1].getComponent('UpgradeButton').setUpgrade(this.upgradeList[j]);
        this.upgradeButton[2].getComponent('UpgradeButton').setUpgrade(this.upgradeList[k]);

        this.refreshButton.interactable = GameDataManager.instance.coinAmount >= 50;
        
    },

    update(){
        if (this.castle){
            this.setTowerLifeBar(this.castle.currentHP, this.castle.maxHP);
        }

        this.setUpgradeBar();
    },

    setTowerLifeBar(curValue, maxValue){
        this.towerLifeBar.progress = curValue / maxValue;
        this.towerLifeText.string = curValue + "/" + maxValue;
    },

    setCoinAmount(value){
        this.coinAmount.string = value;
    },

    clickRefreshUpgrade(){       
        GameDataManager.instance.coinAmount -= 50;
        this.setCoinAmount(GameDataManager.instance.coinAmount);
        this.refreshUpgrade();
    },

    updateButton(){
        for (var i = 0; i < this.upgradeButton.length; i++){
            this.upgradeButton[i].interactable = (this.upgradeButton[i].getComponent('UpgradeButton').cost <= GameDataManager.instance.coinAmount) && (!this.upgradeButton[i].getComponent('UpgradeButton').isSelected);
        }
    },

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    setUpgradeBar(){
        this.upgradeBar.progress = this.upgradeCurrentValue / this.upgradeMaxValue;
        if (this.upgradeCurrentValue >= this.upgradeMaxValue){
            this.upgradeCurrentValue = 0;
            this.refreshUpgrade();
            this.upgradePanel.active = true;
            cc.director.pause();
        }
    }
});
