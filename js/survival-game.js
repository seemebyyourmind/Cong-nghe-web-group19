
import MainScene from "./MainScene.js";

// Configure game scene
const config = {
    width: 512,
    height: 256,
    backgroundColor: '#123456',
    type: Phaser.AUTO,
    parent: 'survival-game',
    scene: [MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y:0},
        }
    },
    plugins: {
        scene: [
        {
            plugin: PhaserMatterCollisionPlugin.default, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
    
            // Note! If you are including the library via the CDN script tag, the plugin 
            // line should be:
            // plugin: PhaserMatterCollisionPlugin.default
            }
        ]
    }
}

// Create new game
new Phaser.Game(config);