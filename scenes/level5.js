class Level5 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level5' })
  }

  create() {
    this.bgm = this.sound.add('bgm', { loop: true }) // Background music

    // Add the background image
    this.add.image(350, 300, 'background').setScale(1.6, 1.325)

    // Add the portal image
    this.portal = this.physics.add
      .image(610, 400, 'portal')
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
    this.player = this.physics.add.sprite(40, 60, 'blob')

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
        mute: !musicstarted,
      })
      this.time.delayedCall(250, () => {
        this.player.setVisible(false)
        this.spacePressed = false
        this.bgm.stop()
        musicStarted = false
        window.alert('YOU WIN!!')
        this.scene.start('endingScene')
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
      const coin = this.add.sprite(i * 50 + 160, 135, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 415, 135, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 415, 395, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 160, 395, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 160, 185, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 415, 185, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 415, 445, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(i * 50 + 160, 445, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(210, i * 50 + 240, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 3; i++) {
      const coin = this.add.sprite(465, i * 50 + 240, 'coins')
      coin.setScale(0.15)
      coinsGroup.add(coin)
    }

    for (let i = 0; i < 8; i++) {
      const coin = this.add.sprite(i * 50 + 160, 535, 'coins')
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

    this.lasers.create(335, 150, 'laser_violet_vert')
    this.lasers.create(335, 90, 'laser_blue_horiz')
    this.lasers.create(335, 430, 'laser_violet_vert')

    this.lasers.create(135, 420, 'laser_violet_vert')
    this.lasers.create(535, 420, 'laser_violet_vert')
    this.lasers.create(135, 155, 'laser_violet_vert')
    this.lasers.create(535, 155, 'laser_violet_vert')

    this.lasers.create(335, 490, 'laser_blue_horiz')

    this.lasers.create(270, 290, 'laser_blue_vert')
    this.lasers.create(400, 290, 'laser_blue_vert')

    this.lasers.create(205, 420, 'laser_violet_horiz')
    this.lasers.create(465, 420, 'laser_violet_horiz')

    this.lasers.create(205, 160, 'laser_violet_horiz')
    this.lasers.create(465, 160, 'laser_violet_horiz')
    this.lasers.create(75, 215, 'laser_violet_horiz')
    this.lasers.create(615, 215, 'laser_violet_horiz')
    this.lasers.create(75, 360, 'laser_violet_horiz')
    this.lasers.create(615, 360, 'laser_violet_horiz')

    this.movingLaser1 = this.physics.add.sprite(210, 360, 'laser_violet_horiz')
    this.movingLaser2 = this.physics.add.sprite(460, 220, 'laser_violet_horiz')
    this.movingLaser3 = this.physics.add.sprite(90, 290, 'laser_violet_horiz')
    this.movingLaser4 = this.physics.add.sprite(618, 290, 'laser_violet_horiz')
    this.movingLaser5 = this.physics.add.sprite(20, 290, 'laser_violet_vert')
    this.movingLaser6 = this.physics.add.sprite(685, 290, 'laser_violet_vert')
    this.movingLaser7 = this.physics.add.sprite(205, 490, 'laser_violet_horiz')
    this.movingLaser8 = this.physics.add.sprite(465, 585, 'laser_violet_horiz')
    this.movingLaser9 = this.physics.add.sprite(205, 90, 'laser_violet_horiz')
    this.movingLaser10 = this.physics.add.sprite(465, 15, 'laser_violet_horiz')

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser1],
      x: 470,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser2],
      x: 200,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser3], // Left horz
      x: 200,
      duration: 900,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser4], // Right Horz
      x: 470,
      duration: 900,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser5], // Left Vert
      x: 135,
      duration: 900,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser6], // Right vert
      x: 530,
      duration: 900,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser7], // bottom left
      y: 585,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser8], // Bottom Right
      y: 490,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser9], // top left
      y: 15,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    })

    this.laserTween = this.tweens.add({
      targets: [this.movingLaser10], // top Right
      y: 90,
      duration: 800,
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

    // Set up a collider for the moving laser 4 and the player
    this.physics.add.collider(this.player, this.movingLaser4, () => {
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

    // Set up a collider for the moving laser 5 and the player
    this.physics.add.collider(this.player, this.movingLaser5, () => {
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

    // Set up a collider for the moving laser 6 and the player
    this.physics.add.collider(this.player, this.movingLaser6, () => {
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

    // Set up a collider for the moving laser 7 and the player
    this.physics.add.collider(this.player, this.movingLaser7, () => {
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

    // Set up a collider for the moving laser 8 and the player
    this.physics.add.collider(this.player, this.movingLaser8, () => {
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

    // Set up a collider for the moving laser 9 and the player
    this.physics.add.collider(this.player, this.movingLaser9, () => {
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

    // Set up a collider for the moving laser 10 and the player
    this.physics.add.collider(this.player, this.movingLaser10, () => {
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

    // Add a timer event to blink the moving laser 4's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser4) {
          // Change its tint color to red
          this.movingLaser4.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser4.clearTint()
          })
        }
      },
    })

    // Add a timer event to blink the moving laser 5's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser5) {
          // Change its tint color to red
          this.movingLaser5.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser5.clearTint()
          })
        }
      },
    })

    // Add a timer event to blink the moving laser 6's color red every 3 seconds
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser6) {
          // Change its tint color to red
          this.movingLaser6.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser6.clearTint()
          })
        }
      },
    })

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser7) {
          // Change its tint color to red
          this.movingLaser7.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser7.clearTint()
          })
        }
      },
    })

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser8) {
          // Change its tint color to red
          this.movingLaser8.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser8.clearTint()
          })
        }
      },
    })

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser9) {
          // Change its tint color to red
          this.movingLaser9.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser9.clearTint()
          })
        }
      },
    })

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        // Check if the moving laser sprite exists
        if (this.movingLaser10) {
          // Change its tint color to red
          this.movingLaser10.setTint(0xff0000)

          // Add a short delay before changing the tint color back to the original
          this.time.delayedCall(500, () => {
            // Change the tint color back to the original
            this.movingLaser10.clearTint()
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
    this.bomb1 = this.bombs.create(340, 50, 'bomb')
    this.bomb2 = this.bombs.create(340, 300, 'bomb')
    this.bomb3 = this.bombs.create(340, 550, 'bomb')

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
      .text(350, 300, 'Press SPACE to play!\n LEVEL - 5', {
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
      delay: 1000,
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
      delay: 1400, // in ms
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
          this.bgm.stop()
          musicStarted = false
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
      if (!musicStarted) {
        musicStarted = true
        this.bgm.play()
        this.bgm.on('complete', () => {
          this.bgm.play()
        })
      }

      this.soundButton.setInteractive()

      // Hide the instructions
      this.instructionText.setVisible(false)

      // Pause the bomb timer
      this.timer.paused = true
    }

    // Decrease the bar fill amount if space bar is pressed
    if (this.spacePressed) {
      this.barFillAmount -= 0.001
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
      musicStarted = false
      this.soundButton.setTexture('sound-off')
    } else {
      this.bgm.play()
      musicStarted = true
      this.soundButton.setTexture('sound-on')
    }
  }
}

this.game.scene.add('Level5', Level5, true)
