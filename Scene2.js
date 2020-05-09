class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  
  create() {
    // add background
    // this.background = this.add.image(0,0,"background");
    
    // add tileset
    this.background = this.add.tileSprite(0,0,config.width,config.height,"background");
    this.background.setOrigin(0,0); /* set tile offset pos */
    
    // image add call
    // this.ship1 = this.add.image(config.width/2 - 50 , config.height/2, "ship");
    // this.ship2 = this.add.image(config.width/2, config.height/2, "ship2");
    // this.ship3 = this.add.image(config.width/2 + 50, config.height/2, "ship3");
    
    // image sprite call
    this.ship1 = this.add.sprite(config.width/2 - 50 , config.height/2, "ship");
    this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
    this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
    
    // add phsyics
    this.powerUps = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 1,
        bounceY: 1
    });
    
    var maxObjects = 4;
    for( var i=0; i<=maxObjects; i++ ) {
      var powerUp = this.physics.add.sprite(16,16,"powerup");
      // add to physics club
      this.powerUps.add(powerUp); 
      powerUp.setRandomPosition(0,0,config.width,config.height);
      // play random anim
      powerUp.play( Math.random() > 0.5 ? "red" : "gray" );
      // add movement and speed
      powerUp.setVelocity(100,100);
      // add collision bounds (screen)
      powerUp.setCollideWorldBounds(true);
      // add bounce
      powerUp.setBounce(1);
    }
    
    // init animate based on animation set name/key
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    
    // player studd
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(config.width/2 + 8, config.height-64, "ship3");
    this.player.play("player_anim");
    this.player.setCollideWorldBounds(true);
    
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // set interactivity for element
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    
    // event listener
    this.input.on('gameobjectdown', this.destroyShip, this);
    
    this.add.text(20,20,"Playing Game", {
      font: "25px Arial",
      fill: "yellow"
    })
  }
  
  // move y axis
  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) 
      this.resetShipPos(ship);
  }
  
  // rotate element
  rotateShip(ship, angle) {
    ship.angle += angle;
  }
  
  // reset to position 0 of y and random x
  resetShipPos(ship) {
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }
  
  // explode anim func
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
  
  // update per sec?
  update() {
    this.player.setVelocity(0);
    this.moveShip(this.ship1,1);
    this.moveShip(this.ship2,2);
    this.moveShip(this.ship3,3);
    
    // this.rotateShip(this.ship1,1);
    // this.rotateShip(this.ship2,2);
    // this.rotateShip(this.ship3,3);
    
    // move
    this.background.tilePositionY -= 0.5;
    
    this.movePlayerManager();
    
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log("Fire!");
    }
    
  }
  
  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
    
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
    
  }
  
}