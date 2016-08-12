/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.inputKeys = this.input.keyboard.createCursorKeys();

    this.walls = this.add.physicsGroup();
    this.walls.enableBody = true;

    this.player = this.game.add.sprite(
      this.game.world.centerX
      , this.game.world.centerY
      , 'diamond');
    this.physics.arcade.enable(this.player);

    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Awesome Game 10/10 5 stars');
    banner.font = 'Nunito'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)

    this.music = this.add.audio('gameMusic');
    this.music.play();

    this.topWall = this.createWall(
      this.game.world.centerX - 200
      , this.game.world.centerY - 216
      , 'wall'
    );
    this.bottomWall = this.createWall(
      this.game.world.centerX - 200
      , this.game.world.centerY + 216
      , 'wall'
    );
    this.rightWall = this.createWall(
      this.game.world.centerX + 168
      , this.game.world.centerY - 184
      , 'vertWall'
    );
    this.leftWall = this.createWall(
      this.game.world.centerX - 200
      , this.game.world.centerY - 184
      , 'vertWall'
    );

    // set the sprite width to 30% of the game width
    // setResponsiveWidth(this.mushroom, 30, this.game.world)
    // this.game.add.existing(this.mushroom)
  }

  update () {
    this.playerMovement();

    this.physics.arcade.collide(this.player, this.walls)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }

  playerMovement() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.inputKeys.left.isDown) {
      this.player.body.velocity.x = -100;
    } else if (this.inputKeys.right.isDown) {
      this.player.body.velocity.x = 100;
    }

    if (this.inputKeys.up.isDown) {
      this.player.body.velocity.y = -100;
    } else if (this.inputKeys.down.isDown) {
      this.player.body.velocity.y = 100;
    }
  }

  createWall(x, y, asset) {
    let wall = this.add.sprite(x, y, asset);

    this.walls.add(wall);

    wall.body.immovable = true;

    return wall;
  }
}