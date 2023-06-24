import LevelController from 'LevelController';

const Castle = cc.Class({
    extends: cc.Component,

    properties: {
        maxHP: 100,
        currentHP: 100,
        isLose: cc.Boolean,
    },

    start(){
        this.isLose = false;
    },

    onCollisionEnter(other, self) {   
        if (other.node.group == 'Enemy'){
            let enemy = other.getComponent('Enemy');
            this.currentHP -= enemy.damage;
            enemy.onDespawn();
            if (this.currentHP <= 0 && !this.isLose){
                LevelController.instance.loseLevel();
                this.isLose = true;
            }
        }
    },
});
