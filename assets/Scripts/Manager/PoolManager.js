// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var PoolManager = cc.Class({
    extends: cc.Component,

    properties: {
        ObjectPrefabs: [cc.Prefab],
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    },
    
    onLoad() {
        PoolManager.instance = this;

        this.enemyPool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.ObjectPrefabs[0]); // create node instance
            this.enemyPool.put(enemy); // populate your pool with put method
        }
    },

    spawnEnemy(){
        let enemy = null;
        if (this.enemyPool.size() > 0) { // use size method to check if there're nodes available in the pool
            enemy = this.enemyPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            enemy = cc.instantiate(this.ObjectPrefabs[0]);
        }
        enemy.parent = this.node; // add new enemy node to the node tree
        enemy.getComponent('Enemy').onSpawn();
    },

    deSpawnEnemy(enemy){
        this.enemyPool.put(enemy);
        console.log(enemy.parent);
    },
});
