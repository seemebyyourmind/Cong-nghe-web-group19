import EnemyWave from 'EnemyWave';
import LevelController from 'LevelController';

const GameLevel = cc.Class({
    extends: cc.Component,

    properties: {
        Waves: [EnemyWave],
        castle: cc.Node,
        maxProgress: cc.Float,
        levelBG: cc.SpriteFrame,
        levelName: cc.String,
        enemyParent: cc.Node,

        spawning: [],
        spawnedAmount: [],
        spawningID: [],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.playtime = 0;
        for (var i = 0; i < this.Waves.length; i++){
            this.spawning[i] = false;
            this.spawnedAmount[i] = 0;
            this.spawningID[i] = 0;
        }
    },

    update (dt) {
        this.playtime += dt;
        for (var i = 0; i < this.Waves.length; i++){
            if (this.playtime >= this.Waves[i].startTime && !this.spawning[i]){
                this.schedule(this.wrapspawnEnemyOfWave.bind(this, i), 1);
                this.spawning[i] = true;
            }
        }
    },

    spawnEnemyOfWave(waveIndex){   

        let enemy = cc.instantiate(this.Waves[waveIndex].enemyPrefab);
        enemy.getComponent('Enemy').onSpawn(this.Waves[waveIndex].path);
        enemy.parent = this.enemyParent;

        this.spawnedAmount[waveIndex]++;
        
    },

    wrapspawnEnemyOfWave(waveIndex){
        if (this.spawnedAmount[waveIndex] >= this.Waves[waveIndex].amount){
            this.unschedule(this.wrapspawnEnemyOfWave);
        }else{
            this.spawnEnemyOfWave(waveIndex);
        }
    }
});
