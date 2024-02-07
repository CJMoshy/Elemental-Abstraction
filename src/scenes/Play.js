class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(data){
        this.platforms = this.add.group()
        this.playerVector = new Phaser.Math.Vector2(0, -1)
        this.PLAVER_JUMP_VELOCITY = 500
        this.scrollRate = data.config.scrollRate
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    
    preload(){}

    create(){
        //TODO: state machine for player anims
        //TODO: powerups
            //audio
        //TODO: coin system
            //audio
        //TODO: add HUD
        //TODO: formatting, code refactor

        //TODO: feelsbadman make ALL platforms able to land (highest one is at least y>= 1 + playerboundsbox)

        this.playScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)

        this.ground = this.physics.add.body(0, 700,800, 15).setCollideWorldBounds(true)
        this.player = this.physics.add.sprite(100, 300, 'player')
        .setOrigin(1,0)
        .setScale(0.5)
        .setCollideWorldBounds(true)
        .setGravityY(1400)
        .setSize(70,240)
        
        this.beginAnimation()
        

        this.ground = this.physics.add.body(0, 700,800, 15).setCollideWorldBounds(true)

        this.generatePlatforms()
      
        //player/ground collider
        this.physics.add.collider(this.player, this.ground,null,  null, this)

        //player platform collider
        this.physics.add.collider(this.player, this.platforms,()=>{console.log('collision')},  null, this)    
    }

    update(){   

        this.platforms.children.iterate((x)=>{
            x.update()
        })
        

        this.playScreen.tilePositionX += this.scrollRate

        //jump mechanic
        this.playerVector.normalize()
        if(Phaser.Input.Keyboard.JustDown(keyJUMP)){
            this.player.anims.pause()
            this.player.setVelocity(this.PLAVER_JUMP_VELOCITY * this.playerVector.x, this.PLAVER_JUMP_VELOCITY * this.playerVector.y)
            this.time.delayedCall(500, ()=>{
                this.player.anims.resume()
            },null, null)
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

    generatePlatforms(){
        let x_init = 200
        let x_upd = x_init
        for(let i = 0; i < 4; i++){
            let y = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
            this.platforms.add(new Platform(this, x_init, y, 'platform', 0).setAlpha(0))
            console.log('created new platform at x=' + x_init)
            x_init += x_upd
        }
    }
    
    beginAnimation(){
        this.player.anims.play('running_vanilla', true)  
    }
    
}