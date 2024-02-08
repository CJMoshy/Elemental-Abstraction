class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(data){

        //main scrolling background
        this.playScreen = null
        this.scrollRate = data.config.scrollRate

        //platforms
        this.platforms = this.add.group()
    
        this.obstacles = this.add.group()
        this.OBSTACLE_COUNT = 4
        this.obstacleHeight = [430, 350]
        this.isObstacle = false // is obstacle on screen?

        this.currentPowerup = null
 
        //TODOL fix double jump, its state machine time
        this.player = null
        this.PLAVER_JUMP_VELOCITY = 500
        this.isjumping = false
        this.playerVector = new Phaser.Math.Vector2(0, -1)
       
        //keybindings
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //DEBUG
        debugToggle = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.debugEnabled = true
    }
    
    preload(){}

    create(){
        //WIN CONDIITON
        // THERE ARE SPIKES AT THE BACK OF THE SCREEN
        // DONT GET PUSHED BY TH OBSTACLES
        //TODO: Obstacles
        //TODO: state machine for player anims
        //TODO: powerups
            //audio
        //TODO: coin system
            //audio
        //TODO: add HUD
        //TODO: formatting, code refactor

        //TODO: feelsbadman make ALL platforms able to land (highest one is at least y>= 1 + playerboundsbox)

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

        //* DEBUG CODE
            debugToggle.on('down', ()=>{
                // Toggle debug mode
                this.debugEnabled = !this.debugEnabled;
        
                // Toggle debug display for all physics bodies
                this.physics.world.debugGraphic.setVisible(this.debugEnabled);
            }, this);
        //################################################################################
      

        //load playscreen
        if (this.textures.exists('titleScreen')) {
            this.playScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
        } else {
            console.log('texture error');
        }

        //load ground
        this.ground = this.physics.add.body(0, 700,800, 15).setCollideWorldBounds(true)

        //load player
        this.player = this.physics.add.sprite(100, 300, 'player')
        .setOrigin(1,0)
        .setScale(0.5)
        .setCollideWorldBounds(true)
        .setGravityY(1400)
        .setSize(70,240)
        
        //playeraimation state on player
        this.beginAnimation()

        //generate platforms, obstacles, powerup, coins
        this.generatePlatforms()
        this.generateObstacles()
        this.generatePowerup()

        //physics

        //player/ground collider
        this.physics.add.collider(this.player, this.ground,null,  null, this)
        //player platform collider
        this.physics.add.collider(this.player, this.platforms,()=>{console.log('collision @plat')},  null, this) 
        
        this.physics.add.collider(this.player, this.obstacles, this.handleObstacleCollision,  null, this)    
    }

    update(){

        //update scrolling screen
        this.playScreen.tilePositionX += this.scrollRate

        //iterate groups
        this.platforms.children.iterate((x)=>{
            x.update()
        })
        this.obstacles.children.iterate((x)=>{
            x.update()
        })
       // this.currentPowerup.update()

        //if no obstacle on screen :: TODO: maybe refactor this
        if(!this.isObstacle){
            this.generateObstacles()
        }
      
        //jump mechanic
        this.playerVector.normalize()
        if(!this.isjumping && Phaser.Input.Keyboard.JustDown(keyJUMP)){
            this.isjumping = true
            this.player.anims.pause()
            this.player.setVelocity(this.PLAVER_JUMP_VELOCITY * this.playerVector.x, this.PLAVER_JUMP_VELOCITY * this.playerVector.y)
            this.time.delayedCall(500, ()=>{
                this.player.anims.resume()
                this.isjumping = false
            },null, null)
        }

    }


    //helper functions
    generatePlatforms(){
        let x_init = 200
        let x_upd = x_init
        for(let i = 0; i < 4; i++){
            let y = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
            this.platforms.add(new Platform(this, x_init, y, 'platform', 0).setAlpha(0))
            x_init += x_upd
        }
    }

    generateObstacles(){
        let x = Math.floor(Math.random() * (2 -1 + 1 ) + 1)
        this.obstacles.add(new Obstacle(this, 790, this.obstacleHeight[x - 1], 'platform', 0, 'ojb1'))
        this.isObstacle = true
    }
    
    generatePowerup(){
        this.currentPowerup = new Powerup(this, 600, 400,'powerup', 0, 'powerup-ready')
        this.currentPowerup.setBounce
    }

    beginAnimation(){
        this.player.anims.play('running_vanilla', true)  
    }
    


    //collision handling between obstacle and player
    handleObstacleCollision(player, obstacle){
        
        let obstacleIndex = this.obstacles.getChildren().indexOf(obstacle);
        // Get the obstacle object
        console.log('collision @obst')
        let obstacleObject = this.obstacles.getChildren()[obstacleIndex];
        obstacleObject.destroy()
        this.isObstacle = false
    }

    //TODO: collision handling between powerup and player
    //TODO: coins?
    
    
}