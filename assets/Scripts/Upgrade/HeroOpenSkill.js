import Upgrade from 'Upgrade';

cc.Class({
    extends: Upgrade,

    properties: {
        heroList: [],
    },

    upgradeExecute(){
        
        var targetType;
        switch(this.heroType) {
            case 0:
                targetType = 'Archer';
                break;
            case 1:
                targetType = 'Assasin';
                break;
            case 2:
                targetType = 'Mage';
                break;
            case 3:
                targetType = 'Warrior';
                break;
            default:
                
          }
        this.findNodesByType(cc.director.getScene(), targetType, this.heroList);
        console.log(this.heroList.length);
        for (var i = 0; i < this.heroList.length; i++){
            this.heroList[i].getComponent('Hero').isOpenSkill = true;
        }

        this.selected = true;
    },

});
