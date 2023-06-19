

const Castle = cc.Class({
    extends: cc.Component,

    properties: {
        maxHP: 100,
        currentHP: 100,
    },

    onCollisionEnter: function (other, self) {   
        if (other.node.group == 'Enemy'){
            let enemy = other.getComponent('Enemy');
            this.currentHP -= enemy.damage;
            enemy.onDespawn();
        }
    },
});
