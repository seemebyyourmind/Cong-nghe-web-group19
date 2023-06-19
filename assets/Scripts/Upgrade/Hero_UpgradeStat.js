import Upgrade from 'Upgrade';

var StatType = cc.Enum({
    physicDMG: 0,
    magicDMG: 1,
    atkSPD: 2,
    range: 3,
    freezeTime: 4,
    None: 5,
});

cc.Class({
    extends: Upgrade,

    properties: {
        heroList: [],
        statType: StatType.None,
        statValue: cc.Float,
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

        var statType;
        

        this.findNodesByType(cc.director.getScene(), targetType, this.heroList);
        console.log(this.heroList.length);
        for (var i = 0; i < this.heroList.length; i++){
            var hero = this.heroList[i].getComponent('Hero');

            switch(this.statType) {
                case 0:
                    hero.physicDMG *= this.statValue;
                    break;
                case 1:
                    hero.magicDMG *= this.statValue;
                    break;
                case 2:
                    hero.attackSPD *= this.statValue;
                    break;
                case 3:
                    hero.collider.radius *= this.statValue;
                    break;
                case 4:
                    hero.freezeTime += this.statValue;
                    break;
                default:
                    
            }
        }

        this.selected = true;
    },
});
