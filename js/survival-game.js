
import MainScene from "./MainScene.js";
import NextScene from "./NextScene.js";

const myCustomCanvas = document.createElement('canvas');

myCustomCanvas.id = 'myCustomCanvas';
document.body.appendChild(myCustomCanvas);

// Configure game scene
const config = {
    width: 512,
    height: 256,
    canvas: document.getElementById('myCustomCanvas'),
    type: Phaser.CANVAS,
    parent: 'survival-game',
    scene: [MainScene, NextScene],
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
            }
        ]
    }
}

// Create new game
var game = new Phaser.Game(config);

function preload(){
    console.log("game-preload");
}

function create(){
    console.log("game-create");
}

function update(){
    console.log("game-update");
}