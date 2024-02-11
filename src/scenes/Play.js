class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(data){

        //scene.children.exists(sprite => sprite.name === spriteName);

        //main scrolling background
        this.scrollRate = data.config.scrollRate

        //platforms
        this.platforms = this.add.group()
        this.PLATFORM_COUNT = 4
        this.platformPositions = {'platform_1': 0, 'platform_2': 0, 'platform_3': 0, 'platform_4': 0} //this holds the current x position of each platform instanciation
        this.MIN_PLAT_BOUND = 160
        this.MAX_PLAT_BOUND = 300
    
        //obstacles
        this.obstacles = this.add.group()
        this.OBSTACLE_COUNT = 4
        this.obstacleHeight = [430, 350]
        this.isObstacle = false // is obstacle on screen?

        //powerup
        this.powerupKeys = ['powerup-teal', 'powerup-blue', 'powerup-green', 'powerup-red']
        this.currentPowerup = null
 
        //TODOL fix double jump, its state machine time
        this.player = null
        this.PLAVER_JUMP_VELOCITY = 550
        this.isjumping = false
        this.playerVector = new Phaser.Math.Vector2(0, -1)

        //keybinds 
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
        //DEBUG
        debugToggle = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.debugEnabled = true
    }
    
    preload(){}

    create(){

        /*
        *  Organization (3 points)
        *  Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (1)
        *  Submit a playable link on GitHub pages (1)
        *  In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (1)
        *  Structure and Design (15 points)
        *  Your game should:

        *  Use multiple Scene classes (dictated by your game's style) (1)
        *  Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
        *  Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
        *  Have some form of player input/control appropriate to your game design (1)
        *  Include one or more animated characters that use a texture atlas* (1)
        *  Simulate scrolling with a tileSprite (or equivalent means) (1)
        *  Implement proper collision detection (via Arcade Physics or a custom routine) (1)
        *  Have looping background music* (1)
        *  Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
        *  Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
        *  Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
        *  Be theoretically endless (1)
        *  Be playable for at least 15 seconds for a new player of low to moderate skill (1)
        *  Run without significant crashes or errors (1)
        *  Include in-game credits for all roles, assets, music, etc. (1)
        *
        * */
            //Winning
            //your score progresses statically
            //as you collect element powerups, you gain a permanent score multiplier
            //go as far as you can with all four powerups collected to get the highest score 

        //############
        //TODO: state machine for player anims
        //TODO: powerups
            //audio
        //TODO: add HUD
        //TODO: formatting, code refactor

        //IDEATION ####################
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
        //#######################
        //* DEBUG CODE
            debugToggle.on('down', ()=>{
                // Toggle debug mode
                this.debugEnabled = !this.debugEnabled;
        
                // Toggle debug display for all physics bodies
                this.physics.world.debugGraphic.setVisible(this.debugEnabled);
            }, this);
        //################################################################################
        
        //load backgorund
        if(this.textures.exists('titleScreen')){
            this.playScreen = this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
        }

         //load player
        if(this.textures.exists('player')){
            this.player = new Player(this, 100, 310, 'player', 0)
            this.player.anims.play('running_vanilla', true)
        }
        //load ground
        this.ground = this.physics.add.body(0, 700,800, 15).setCollideWorldBounds(true)

        //generate platforms, obstacles, powerup, coins
        this.generatePlatforms()
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

        //update player
        this.player.update()

        //state
        this.player.FSM.step()
        
        //iterate groups
        let count = 0
        let keys = Object.keys(this.platformPositions)
        this.platforms.children.iterate((x)=>{
            x.update(keys[count++], this.platformPositions)
        })


        this.obstacles.children.iterate((x)=>{
            x.update()
        })

        //if no obstacle on screen :: TODO: maybe refactor this
        if(!this.isObstacle){
            this.generateObstacles()
        }  
    }

    //helper functions
    generatePlatforms(){
        let x_init = 200
        let x_upd = 250
        for(let i = 0; i < this.PLATFORM_COUNT; i++){
            let y = Math.floor(Math.random() * (this.MAX_PLAT_BOUND - this.MIN_PLAT_BOUND + 1)) + this.MIN_PLAT_BOUND;
            this.platforms.add(new Platform(this, x_init, y, 'platform', 0).setAlpha(0))
            x_init += x_upd
        }
    }

    generateObstacles(){
        let x = Math.floor(Math.random() * (2 - 1 + 1 ) + 1)
        this.obstacles.add(new Obstacle(this, 790, this.obstacleHeight[x - 1], 'obstacle-ground', 0, 'obstacle'))
        this.isObstacle = true
    }
    
    generatePowerup(){
        if(this.powerupKeys.length === 0){
            return
        }
        
        // Generate a random index
        let rand = Math.floor(Math.random() * this.powerupKeys.length);
        let color = this.powerupKeys[rand]
        this.powerupKeys.splice(rand, 1);

        let y = Math.floor(Math.random() * (game.config.height));

        this.time.delayedCall(1000, ()=>{
            this.currentPowerup = new Powerup(this, 800, y, color, 0, 'powerup-ready')
            this.physics.add.collider(this.player, this.currentPowerup, ()=>{    //we have to implemenmt collider here - or do we - beacause create assigns collider to null bc not generated
                this.player.setVelocity(this.player.body.velocity.x, this.player.body.velocity.y)
                this.player.lastCollision = color
                clearInterval(this.currentPowerup.intervalID) 
                this.currentPowerup.destroy()
                this.generatePowerup()
            },  null, this)  
        }, null, this)
    }
   
    
    //collision handling between obstacle and player
    handleObstacleCollision(player, obstacle){  
        let obstacleIndex = this.obstacles.getChildren().indexOf(obstacle);
        // Get the obstacle object
        console.log('collision @obst')
        //TODO: audio
        this.player.setVelocity(-100,-1)
        this.time.delayedCall(500, ()=>{this.player.setVelocityX(100)})
        this.time.delayedCall(1000, ()=>{this.player.setVelocity(0)})
        let obstacleObject = this.obstacles.getChildren()[obstacleIndex];
        obstacleObject.destroy()
        this.isObstacle = false
    }

    //TODO: coins?
    
    
}