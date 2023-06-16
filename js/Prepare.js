export default class Prepare {
  static preload(scene) {
    scene.load.atlas(
      "knight",
      "assets/Sprites/knight.png",
      "assets/Sprites/knight_atlas.json"
    );
    scene.load.animation("knight", "assets/Sprites/knight_anim.json");
  }
}
