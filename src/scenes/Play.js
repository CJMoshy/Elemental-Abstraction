class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(data){
        //TODO: platforms, elements, ART...
        this.platforms = []
        this.playerVector = new Phaser.Math.Vector2(0, -1)
        this.PLAVER_JUMP_VELOCITY = 500
        this.scrollRate = data.config.scrollRate
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    
    preload(){
        this.load.image('platform', './assets/images/platform.png')
    }

    create(){
        this.titleScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)

        this.player = this.physics.add.sprite(100, 300, 'player').setOrigin(1,0).setScale(0.5)
        .setCollideWorldBounds(true)
        .setGravityY(1400)
        .setSize(70,240)
        
        this.beginAnimation()
        

        this.ground = this.physics.add.body(0, 700,800, 15)
        .setCollideWorldBounds(true)

        this.platform = new Platform(this, 200, 200, 'platform', 0)
      

        //player/ground collider
        this.physics.add.collider(this.player, this.ground,null,  null, this)
    }

    update(){     
        this.titleScreen.tilePositionX += this.scrollRate

        //jump mechanic
        this.playerVector.normalize()
        if(Phaser.Input.Keyboard.JustDown(keyJUMP)){
            this.player.setVelocity(this.PLAVER_JUMP_VELOCITY * this.playerVector.x, this.PLAVER_JUMP_VELOCITY * this.playerVector.y)
        }

        //powerups can afect color of character
        //add elements
        //affect color
            //fire turns him red...
            //interacts with ice obstacles on the map...
            //POWERUPS
                //four main powerups
                    //earth, air, fire, water
                        //guarenteed grab
            //map theme
                //changes based on elements
            //Character theme
                //different elements affect different limbs
                //omnipimp char
                //you get an ability when you collect all three elemets

            //game plays out for at least 30 seconds

    }
    
    beginAnimation(){
        this.player.anims.play('running', true)  
    }
    
}