class endingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'endingScene' })
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
    this.load.image('phaser', 'assets/phaser.png')

    this.load.image('sound-on', 'assets/sound-on.png')
    this.load.image('sound-off', 'assets/sound-off.png')
    this.load.audio('bgm', 'sounds/bgm.mp3')
    this.load.audio('zap', 'sounds/zap.mp3')
    this.load.audio('explode', 'sounds/explode.mp3')
    this.load.audio('collect-coin', 'sounds/collect-coin.mp3')
    this.load.audio('teleport', 'sounds/teleport.mp3')
  }

  create() {
    // Add credits text
    this.add
      .text(350, 100, 'Created by:', { fontSize: '32px', fill: '#fff' })
      .setOrigin(0.5)
    this.add
      .text(350, 150, 'Sumit', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    this.add
      .text(350, 200, 'RJ@672003', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    this.add
      .text(350, 250, 'amitsuthar', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    this.add
      .text(350, 300, 'Harshil08', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)

    // Add thank you message
    this.add
      .text(350, 400, 'Thank you for playing!', {
        fontSize: '48px',
        fill: '#fff',
      })
      .setOrigin(0.5)

    // Add button to return to main menu
    const playAgainButton = this.add
      .text(350, 500, 'Play Again', { fontSize: '32px', fill: '#00ffff' })
      .setOrigin(0.5)
    playAgainButton.setInteractive({ useHandCursor: true })

    // Change color to red when hovering over the button
    playAgainButton.on('pointerover', () => {
      playAgainButton.setFill('#ff0000')
    })

    // Change color back to cyan when not hovering over the button
    playAgainButton.on('pointerout', () => {
      playAgainButton.setFill('#00ffff')
    })

    playAgainButton.on('pointerdown', () => {
      this.scene.start('loadingScene')
    })
  }
}
