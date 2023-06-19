var HeroType = cc.Enum({
    Archer: 0,
    Assasin: 1,
    Mage: 2,
    Warrior: 3,
    None: 4,
});

const Upgrade = cc.Class({
    extends: cc.Component,

    properties: {
        upgradeName: cc.String,
        image: cc.SpriteFrame,
        description: cc.String,
        selected: cc.Boolean,
        heroType: HeroType.None,
        cost: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    upgradeExecute(){

    },

    findNodesByType(node, targetType, result) {
        // Check if the current node is of the desired type
        if (node != cc.director.getScene() && node.getComponent(targetType)) {
            console.log("Found");
            result.push(node);
        }
    
        // Recursively check child nodes
        var children = node.children;
        for (var i = 0; i < children.length; i++) {
            this.findNodesByType(children[i], targetType, result);
        }
    }
});
