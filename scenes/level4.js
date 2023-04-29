class Level4 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level4' })
  }

  create() {
    this.bgm = this.sound.add('bgm', { loop: true }) // Background music

    // Add the background image
    this.add.image(350, 300, 'background').setScale(1.6, 1.325)

    // Add the portal image
    this.portal = this.physics.add
      .image(630, 550, 'portal')
      .setImmovable(true)
      .setOrigin(0.5)

    // Create an invisible sprite that matches the size and position of the portal image
    this.portalCollider = this.physics.add
      .sprite(350, 50, null)
      .setImmovable(true)
      .setVisible(false)
    this.portalCollider.setSize(this.portal.width, this.portal.height)
    this.portalCollider.setPosition(this.portal.x, this.portal.y)

    // Create the player sprite
    this.player = this.physics.add.sprite(70, 50, 'blob')

    // Set the player's drag to control its movement
    this.player.setDrag(1000)

    // Set world bounds to the dimensions of the background image
    this.physics.world.setBounds(8, 8, 682, 582)

    // Set player body to collide with the world bounds
    this.player.setCollideWorldBounds(true)

    // Add a collider for the portal image
    this.physics.add.collider(this.player, this.portalCollider, () => {
      this.player.setVelocity(0)
      this.player.active = false // set player to inactive so it doesn't move anymore
      this.player.setPosition(this.portal.x, this.portal.y)
      this.player.setScale(0.5) // set the scale of the blob to half of its original size
      this.sound.play('teleport', {
        mute: !musicStarted,
      })
      this.time.delayedCall(250, () => {
        this.player.setVisible(false)
        this.spacePressed = false
        this.bgm.stop()
        musicStarted = false
        window.alert('Level Cleared!!\nPress OK to move to next level')
        this.scene.start('Level5')
      })
    })

    // Add animations for the coin sprite
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    // Create a group for the coins
    const coinsGroup = this.physics.add.group()

    // Add coins to the group
    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 110, 185, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 5; i++) {
      const coin = this.add.sprite(245, i * 50 + 190, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 110, 395, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 327, 65, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 575, 65, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 575, 355, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 280, 485, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 425, 435, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 425, 175, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 4; i++) {
      const coin = this.add.sprite(625, i * 50 + 135, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 4; i++) {
      const coin = this.add.sprite(75, i * 50 + 125, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 4; i++) {
      const coin = this.add.sprite(75, i * 50 + 325, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 7; i++) {
      const coin = this.add.sprite(350, i * 50 + 135, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    // Play the animation on all the coins
    coinsGroup.playAnimation('spin')

    // Create a text object to display the score
    this.scoreText = this.add.text(475, 20, 'Score: ' + score, {
      fontSize: '32px',
      fill: '#fff',
    })
    this.scoreText.setDepth(1)

    // Add collider between the player and coins group
    this.physics.add.overlap(this.player, coinsGroup, (player, coin) => {
      // Calculate distance between player and coin
      const distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        coin.x,
        coin.y
      )

      // Only remove coin if it's close enough to the player
      if (distance < 50) {
        // Remove the coin from the game
        coin.destroy()

        this.sound.play('collect-coin', {
          mute: !musicStarted,
        })

        // Update the score
        score += 10
        this.scoreText.setText('Score: ' + score)
      }
    })

    // Lasers
    this.lasers = this.physics.add.staticGroup()
    this.lasers.create(150, 85, 'laser_violet_vert')
    this.lasers.create(210, 155, 'laser_blue_horiz')

    this.lasers.create(270, 225, 'laser_blue_vert')
    this.lasers.create(270, 350, 'laser_blue_vert')
    this.lasers.create(75, 300, 'laser_violet_horiz')
    this.lasers.create(210, 420, 'laser_violet_horiz')

    this.lasers.create(400, 400, 'laser_violet_vert')
    this.lasers.create(400, 260, 'laser_violet_vert')
    this.lasers.create(400, 160, 'laser_violet_vert')
    this.lasers.create(75, 510, 'laser_violet_horiz')

    this.movingLaser1 = this.physics.add.sprite(150, 220, 'laser_violet_vert')

    this.lasers.create(470, 460, 'laser_blue_horiz')
    this.lasers.create(470, 200, 'laser_blue_horiz')
    this.lasers.create(625, 330, 'laser_violet_horiz')
    this.lasers.create(330, 510, 'laser_blue_horiz')
    this.lasers.create(380, 90, 'laser_blue_horiz')
    this.lasers.create(625, 90, 'laser_blue_horiz')

    this.lasers.create(400, 525, 'laser_violet_vert')

    this.movingLaser2 = this.physics.add.sprite(350, 330, 'laser_violet_horiz')
    this.movingLaser3 = this.physics.add.sprite(550, 145, 'laser_violet_vert')

    // Moving lasers 1 & 2
    this.laserTween = this.tweens.add({
      targets: [this.movingLaser1],
      y: 355,
      duration: 900,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })
    // moving laser 3
    this.laserTween = this.tweens.add({
      targets: [this.movingLaser3],
      y: 265,
      duration: 1000,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })
    this.laserTween = this.tweens.add({
      targets: [this.movingLaser2],
      x: 480,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    // Set up a collider for the moving laser 1 and the player
    this.physics.add.collider(this.player, this.movingLaser1, () => {
      this.sound.play('zap', {
        mute: !musicStarted,
      })
      window.alert('Game Over')
      this.spacePressed = false
      score = 0
      this.bgm.stop()
      musicStarted = false
      this.scene.start('Level1')
    })

    // Set up a collider for the moving laser 2 and the player
    this.physics.add.collider(this.player, this.movingLaser2, () => {
      this.sound.play('zap', {
        mute: !musicStarted,
      })
      window.alert('Game Over')
      this.spacePressed = false
      score = 0
      this.bgm.stop()
      musicStarted = false
      this.scene.start('Level1')
    })

    // Set up a collider for the moving laser 3 and the player
    this.physics.add.collider(this.player, this.movingLaser3, () => {
      this.sound.play('zap', {
        mute: !musicStarted,
      })
      window.alert('Game Over')
      this.spacePressed = false
      score = 0
      this.bgm.stop()
      musicStarted = false
      this.scene.start('Level1')
    })

    // Set up a collider for other (static) lasers ans player
    this.physics.add.collider(this.player, this.lasers, () => {
      this.sound.play('zap', {
        mute: !musicStarted,
      })
      window.alert('Game Over')
      this.spacePressed = false
      score = 0
      this.bgm.stop()
      musicStarted = false
      this.scene.start('Level1')
    })

    // Add a timer event to blink the moving laser 1's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser1) {
          // Change its tint color to red
          this.movingLaser1.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser1.clearTint()
          })
        }
      },
    })

    // Add a timer event to blink the moving laser 2's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser2) {
          // Change its tint color to red
          this.movingLaser2.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser2.clearTint()
          })
        }
      },
    })

    // Add a timer event to blink the moving laser 3's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser3) {
          // Change its tint color to red
          this.movingLaser3.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser3.clearTint()
          })
        }
      },
    })

    // Add a timer event to blink the laser color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Get all the laser sprites
        const lasers = this.lasers.getChildren()

        // Loop through each laser sprite and change its tint color to red
        lasers.forEach((laser) => {
          laser.setTint(0xff0000)
        })

        // Add a short delay before changing the tint color back to the original
        this.time.delayedCall(200, () => {
          // Loop through each laser sprite and change its tint color back to the original
          lasers.forEach((laser) => {
            laser.clearTint()
          })
        })
      },
    })

    // Create bombs
    this.bombs = this.physics.add.staticGroup()
    this.bomb1 = this.bombs.create(220, 80, 'bomb')
    this.bomb2 = this.bombs.create(220, 300, 'bomb')
    this.bomb3 = this.bombs.create(220, 525, 'bomb')

    // Make bombs blink
    this.tweens.add({
      targets: [this.bomb1, this.bomb2, this.bomb3],
      alpha: 0,
      ease: 'Linear',
      duration: 500,
      repeat: -1,
      yoyo: true,
    })

    // Instructions
    this.instructionText = this.add
      .text(350, 300, 'Press SPACE to play!\n LEVEL - 4', {
        fontSize: '32px',
        fill: '#9d00ff',
        align: 'center',
      })
      .setFontStyle('bold')
    this.instructionText.setOrigin(0.5)

    // Create explosion sprite
    this.explosion1 = this.add.image(this.bomb1.x, this.bomb1.y, 'explosion')
    this.explosion2 = this.add.image(this.bomb2.x, this.bomb2.y, 'explosion')
    this.explosion3 = this.add.image(this.bomb3.x, this.bomb3.y, 'explosion')

    // Set the anchor point to the center of the sprite
    this.explosion1.setOrigin(0.5)
    this.explosion2.setOrigin(0.5)
    this.explosion3.setOrigin(0.5)

    // Hide the sprite initially
    this.explosion1.setVisible(false)
    this.explosion2.setVisible(false)
    this.explosion3.setVisible(false)

    // Time bar
    this.timeLimit = 70
    this.timer = this.time.addEvent({
      delay: 1200,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    })
    this.timeLimit--
    this.barFillAmount = this.timeLimit / 60
    this.bar = this.add.graphics()
    this.bar.fillStyle(0x39ff14, 1)
    this.bar.fillRect(0, 0, this.barFillAmount * 200, 20)
    this.bar.x = 10
    this.bar.y = 10
    this.abilityDurationText = this.add
      .text(this.bar.x + 23, this.bar.y, '💣 Time Left 💣', {
        fontSize: '20px',
        fill: '#fd1c03',
        align: 'center',
      })
      .setFontStyle('bold')

    // Explosion
    this.timer = this.time.addEvent({
      delay: 1000, // in ms
      callback: () => {
        this.bomb1.destroy()
        this.bomb2.destroy()
        this.bomb3.destroy()

        // Show the explosion sprite
        this.explosion1.setVisible(true)
        this.explosion2.setVisible(true)
        this.explosion3.setVisible(true)

        // Trigger the alert after the explosion animation finishes
        this.time.delayedCall(2, () => {
          this.sound.play('explode', {
            mute: !musicStarted,
          })
          this.bgm.stop()
          musicStarted = false
          window.alert('Game Over')
          this.spacePressed = false
          score = 0
          this.scene.start('Level1')
        })
      },
      loop: true,
      paused: true,
    })

    // Sound Button
    if (soundButtonOn) {
      this.soundButton = this.add.sprite(665, 565, 'sound-on')
    } else {
      this.soundButton = this.add.sprite(665, 565, 'sound-off')
    }
    this.soundButton.disableInteractive()
    this.soundButton.on('pointerdown', this.toggleSound, this)
  }

  update() {
    // Player Movements
    const cursors = this.input.keyboard.createCursorKeys()

    if (this.player.active && this.spacePressed) {
      if (cursors.left.isDown) {
        this.player.setVelocityX(-200)
      } else if (cursors.right.isDown) {
        this.player.setVelocityX(200)
      } else {
        this.player.setVelocityX(0)
      }

      if (cursors.up.isDown) {
        this.player.setVelocityY(-200)
      } else if (cursors.down.isDown) {
        this.player.setVelocityY(200)
      } else {
        this.player.setVelocityY(0)
      }
    }

    // Check if space bar is pressed
    if (
      this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)
    ) {
      this.spacePressed = true

      // Start background music
      if (!musicStarted && soundButtonOn) {
        musicStarted = true
        this.bgm.play()
        this.bgm.on('complete', () => {
          this.bgm.play()
        })
      }

      this.soundButton.setInteractive()

      // Hide the instructions
      this.instructionText.setVisible(false)
    }

    // Decrease the bar fill amount if space bar is pressed
    if (this.spacePressed) {
      this.barFillAmount -= 0.0015
      this.bar.clear()
      this.bar.fillStyle(0x39ff14, 1)
      this.bar.fillRect(0, 0, this.barFillAmount * 200, 20)

      // Check if the bar is empty
      if (this.barFillAmount <= 0) {
        // Start the bomb timer
        this.timer.paused = false
        this.barFillAmount = 0
      }
    }
  }

  toggleSound() {
    if (this.bgm.isPlaying) {
      this.bgm.stop()
      soundButtonOn = false
      musicStarted = false
      this.soundButton.setTexture('sound-off')
    } else {
      this.bgm.play()
      soundButtonOn = true
      musicStarted = true
      this.soundButton.setTexture('sound-on')
    }
  }
}

this.game.scene.add('Level4', Level4, true)
