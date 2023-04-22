export default class NextScene extends Phaser.Scene{
    constructor(){
        super("nextScene");
    }

    create(){
        this.add.text(20, 20, "Next Scene");

        this.changeSceneKey = this.input.keyboard.addKeys({
            change: Phaser.Input.Keyboard.KeyCodes.N,
        })
    }

    update(){
        if (this.changeSceneKey.change.isDown){
            this.scene.start("mainScene");
        }
    }



}
    