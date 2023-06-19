import Path from "Path";

const EnemyWave = cc.Class({
    name: 'EnemyWave',
    properties: {
        enemyPrefab: cc.Prefab,
        amount: cc.Float,
        path: Path,
        startTime: cc.Float,
        spawnRate: cc.Float,
    },
});