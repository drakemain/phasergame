import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    this.loaderBg;
    this.loaderBar;
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    
    this.load.image('diamond', 'assets/test/diamond.png');
    this.load.image('wall', 'assets/test/platform.png');
    this.load.image('vertWall', 'assets/test/platformVert.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.audio('gameMusic', ['assets/audio/splash.mp3']);
  }

  create () {
    this.loaderBar.cropEnabled = false;
  }

  update () {
    if (this.cache.isSoundDecoded('gameMusic')) {
      this.state.start('Game');
    }
  }
}
