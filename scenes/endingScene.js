class endingScene extends Phaser.Scene {
                                                  constructor() {
    super({ key: 'endingScene' })
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
