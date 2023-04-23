class loadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'loadingScene' })
  }

  preload() {
    // Load assets for the game
    this.load.image('background', 'assets/background.png')
    this.load.spritesheet('loading', 'assets/loading.png', {
      frameWidth: 66,
      frameHeight: 66,
    })
    this.load.spritesheet('blob', 'assets/blob.png', {
      frameWidth: 24,
      frameHeight: 24,
    })
    this.load.image('portal', 'assets/portal.png')
    this.load.image('laser_blue_vert', 'assets/laser_blue_vert.png')
    this.load.image('laser_blue_horiz', 'assets/laser_blue_horiz.png')
    this.load.image('laser_violet_vert', 'assets/laser_violet_vert.png')
    this.load.image('laser_violet_horiz', 'assets/laser_violet_horiz.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('explosion', 'assets/explosion.png')
    this.load.spritesheet('coins', 'assets/coins.png', {
      frameWidth: 192,
      frameHeight: 171,
    })
    this.load.image('sound-on', 'assets/sound-on.png')
    this.load.image('sound-off', 'assets/sound-off.png')
    this.load.audio('bgm', 'sounds/bgm.mp3')
  }

  create() {
    this.background = this.add
      .image(0, 0, 'background')
      .setScale(1.6, 1.33)
      .setOrigin(0)

    this.add.image(60, 60, 'portal').setScale(1.15)

    this.laser = this.add.image(100, 150, 'laser_violet_horiz')
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        this.laser.setTint(0xff0000)
        this.time.delayedCall(200, () => {
          this.laser.clearTint()
        })
      },
    })

    this.anims.create({
      key: 'coin-spin',
      frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })
    this.coin = this.add
      .sprite(60, 220, 'coins')
      .setScale(0.15)
      .play('coin-spin')

    this.bomb = this.add.image(480, 100, 'bomb')
    this.tweens.add({
      targets: this.bomb,
      alpha: 0,
      ease: 'Linear',
      duration: 500,
      repeat: -1,
      yoyo: true,
    })

    this.add.image(500, 200, 'blob')

    this.add
      .text(100, 40, 'Portal: \nEscape the maze \nusing this portal', {
        fontSize: '16px',
        fill: '#5d00ff',
      })
      .setFontStyle('bold')

    this.add
      .text(180, 120, 'Lasers: \nAvoid the lasers. \nTouching them will throw \nyou back to Level 1', {
        fontSize: '16px',
        fill: '#5d00ff',
      })
      .setFontStyle('bold')

    this.add
      .text(90, 200, 'Coins: \nEach coin is worth 10 points. \nCollect as many as you can!', {
        fontSize: '16px',
        fill: '#5d00ff',
      })
      .setFontStyle('bold')

    this.add
      .text(520, 60, 'Bombs: \nBombs explode \nwhen timer runs\nout.\nEscape before\nthat!', {
        fontSize: '16px',
        fill: '#5d00ff',
      })
      .setFontStyle('bold')

    this.add
      .text(520, 190, 'Blob: \nHelp blob to \nescape!!!', {
        fontSize: '16px',
        fill: '#5d00ff',
      })
      .setFontStyle('bold')

    this.add
      .graphics()
      .fillStyle(0x00fffe, 1) // Set the fill color to cyan
      .fillRoundedRect(50, 275, 600, 50, 10)

    this.add.text(285, 285, 'LOADING...', {
      fontSize: '32px', 
      fill: '#188fff',
    }).setFontStyle('bold')

    // Create loading animation
    this.anims.create({
      key: 'loading',
      frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 11 }),
      frameRate: 25,
      repeat: -1,
    })

    // Add loading sprite and play animation
    this.loading = this.add.sprite(50, 300, 'loading').play('loading')

    // Create tween to move loading sprite
    this.tweens.add({
      targets: this.loading,
      x: 625,
      ease: 'Linear',
      duration: 2000,
      repeat: 5,
      yoyo: false,
      onComplete: () => {
        // Start the next scene after loading completes
        this.scene.start('Level1')
      },
    })

    this.add.text(250, 450, '𝕋𝕚𝕞-𝔼-𝕊𝕔𝕒𝕡𝕖', {
      fontSize: '32px',
      fill: '#7B32FA',
    })
    this.add.text(200, 480, 'Escape before Time runs out!!!', {
      fontSize: '18px',
      fill: '#ff0000'
    }).setFontStyle('bold')

  }
}
