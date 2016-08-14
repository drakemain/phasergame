/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.inputKeys = this.input.keyboard.addKeys({
      'up': Phaser.KeyCode.W,
      'down': Phaser.KeyCode.S,
      'left': Phaser.KeyCode.A,
      'right': Phaser.KeyCode.D
    });

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
    this.music.volume = .25;
    this.music.play();

    this.createWallHorizontal(
      this.game.world.centerX - (32 * 8) - 16
      , this.game.world.centerY - (32 * 8) - 16
      , 16, 'wall'
    );
    this.createWallVertical(
      this.game.world.centerX - (32 * 8) + 16
      , this.game.world.centerY - (32 * 8) - 16
      , 16, 'wall'
    );
    this.createWallVertical(
      this.game.world.centerX + (32 * 8) - 16
      , this.game.world.centerY - (32 * 8) - 16
      , 16, 'wall'
    );
    this.createWallHorizontal(
      this.game.world.centerX - (32 * 8) - 16
      , this.game.world.centerY + (32 * 8) + 16
      , 16, 'wall'
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
    const moveSpeed = 200;

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.inputKeys.left.isDown) {
      this.player.body.velocity.x = -moveSpeed;
    } else if (this.inputKeys.right.isDown) {
      this.player.body.velocity.x = moveSpeed;
    }

    if (this.inputKeys.up.isDown) {
      this.player.body.velocity.y = -moveSpeed;
    } else if (this.inputKeys.down.isDown) {
      this.player.body.velocity.y = moveSpeed;
    }
  }

  createWallSegment(x, y, asset) {
    let wall = this.add.sprite(x, y, asset);

    this.walls.add(wall);

    wall.body.immovable = true;

    console.log('Creating wall: ', x, y);
  }

  createWallVertical(startPosx, startPosY, len, asset) {
    const tileSize = 32;

    var posx = startPosx;
    var posy = startPosY;

    for (var i = 0; i < len; i++) {
      posy += tileSize;

      this.createWallSegment(posx, posy, 'wall');
    }
  }

  createWallHorizontal(startPosx, startPosY, len, asset) {
    const tileSize = 32;

    var posx = startPosx;
    var posy = startPosY;

    for (var i = 0; i < len; i++) {
      posx += tileSize;

      this.createWallSegment(posx, posy, 'wall');
    }
  }
}