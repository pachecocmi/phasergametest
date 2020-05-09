class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  preload() {
    // load for image
    this.load.image("background", "https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fbackground.png?v=1588661821864");
    
    let assets = [
      {name: "ship", link:"https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fship.png?v=1588663131455", fW:16, fH:16},
      {name: "ship2", link:"https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fship2.png?v=1588663134823", fW:32, fH:16},
      {name: "ship3", link:"https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fship3.png?v=1588663137691", fW:32, fH:32},
      {name: "explosion", link:"https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fexplosion.png?v=1588663128842", fW:16, fH:16},
      {name: "powerup", link:"https://cdn.glitch.com/5c463e96-dea8-423c-a1a3-b5b41471e844%2Fpower-up.png?v=1588664379516", fW:16, fH:16},
    ];
    
    assets.forEach((asset)=>{
      // load for sprites
      this.load.spritesheet(asset.name, asset.link, {
        frameWidth: asset.fW,
        frameHeight: asset.fH
      });
    });
    
  }
  
  create() {
    this.add.text(20,20,"Loading Game...");
    this.scene.start("playGame");
    
    // animation cycle for ships
    let animations = [
      { key: "ship1_anim", frames: this.anims.generateFrameNumbers("ship"), frameRate: 20, repeat: -1 },
      { key: "ship2_anim", frames: this.anims.generateFrameNumbers("ship2"), frameRate: 20, repeat: -1 },
      { key: "ship3_anim", frames: this.anims.generateFrameNumbers("ship3"), frameRate: 20, repeat: -1 },
      { key: "player_anim", frames: this.anims.generateFrameNumbers("ship3"), frameRate: 20, repeat: -1 },
      { key: "explode", frames: this.anims.generateFrameNumbers("explosion"), frameRate: 20, repeat: 0, hideOnComplete: true },
      { key: "red", frames: this.anims.generateFrameNumbers("powerup", { start: 0, end: 1 }), frameRate: 20, repeat: -1 },
      { key: "gray", frames: this.anims.generateFrameNumbers("powerup", { start: 2, end: 3 }), frameRate: 20, repeat: -1 }
    ];
    
    animations.forEach((animation)=>{
      this.anims.create(animation);
    });
    
  }
  
}