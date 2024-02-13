class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(data){
        //main scrolling background
        this.scrollRate = data.config.scrollRate

        //game score and stats
        this.gameOver = false
        this.score = 0
        this.distanceTraveled = 0
        this.id_container = []
        this.id_a 
        this.id_b
        this.id_d
        this.id_e

        //obstacle height, velocity move to obstacle
        this.obstacleHeight = [430, 350]
        this.velocityx = -250

        //powerup
        this.powerupKeys = ['powerup-teal', 'powerup-blue', 'powerup-green', 'powerup-red']
        this.currentPowerup = null
 
        //player declaration
        this.player = null

        //keybinds 
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //DEBUG
        debugToggle = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.debugEnabled = true
    }

    create(){

        /*
        *  Organization (3 points)
        *  Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (1) X
        *
        * 
        *  Structure and Design (15 points)
        *  Your game should:
        *  Use multiple Scene classes (dictated by your game's style) (1) X
        *  Have some form of player input/control appropriate to your game design (1) X
        *  Include one or more animated characters that use a texture atlas* (1) X
        *  Simulate scrolling with a tileSprite (or equivalent means) (1) X
        *  Implement proper collision detection (via Arcade Physics or a custom routine) (1) X 
        *  Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1) X
        *  Be theoretically endless (1) X
        *  Be playable for at least 15 seconds for a new player of low to moderate skill (1) X
        * Properly transition between Scenes and allow the player to restart w/out having to reload the page (1) X
        * Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1) X
        * Have looping background music* (1) X
        *   
        * 
        * TODO: 
        *  Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
        *  Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)  -> have 3 need one more
        *  Run without significant crashes or errors (1) 
        *  Include in-game credits for all roles, assets, music, etc. (1)
        *  Submit a playable link on GitHub pages (1)
        *  In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (1)
        
        *
        * */

            //Winning
            //your score progresses statically
            //as you collect element powerups, you gain a permanent score multiplier
            //go as far as you can with all four powerups collected to get the highest score 

        //#######################
        //* DEBUG CODE
            debugToggle.on('down', ()=>{
                // Toggle debug mode
                this.debugEnabled = !this.debugEnabled;
        
                // Toggle debug display for all physics bodies
                this.physics.world.debugGraphic.setVisible(this.debugEnabled);
            }, this);
        //################################################################################
        
        //audio
        this.time.delayedCall(100,()=>{
            this.sound.removeAll()
            this.music = this.sound.add('main-soundtrack', {
                mute: false,
                volume: 0.1,
                rate: 1, 
                loop: true
            })
            this.music.play()
        })

        //load backgorund
        if(this.textures.exists('titleScreen')){
            this.playScreen = this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
        }

        //load player 
        if(this.textures.exists('player')){
            this.player = new Player(this, 100, 310, 'player', 0)
            this.player.anims.play('running_vanilla', true)
        }

    //text formatting
        this.scoreLeft = this.add.text(50 , 15, 'score → ' + this.score.toString(), {
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#000000',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        })

        this.multiplierText = this.add.text(50 , 50, 'elements → ' + this.player.scoreMultiplier.toString(), {
            fontFamily: 'Comic Sans MS',
            fontSize : '20px',
            color : '#000000',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        })

        this.distTrav = this.add.text(700 , 50, this.distanceTraveled + ' m', {
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#000000',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        })

        this.livesRemaining = this.add.text(650 , 350, '❤❤❤❤❤', {
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#000000',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        })

        //create a ground obj
        this.ground = this.physics.add.body(0, 700,800, 15).setCollideWorldBounds(true).setFriction(0)
        this.physics.add.collider(this.player, this.ground,null,  null, this) //manage collision with player and ground

        //generate platforms, obstacles, powerup, coins
        this.generatePlatforms()
        this.generateObstacles()
        this.time.delayedCall(5000, ()=>{this.generatePowerup()}) //wait a second (or 5) before we start powerup gen

        //increasing difficulty metric
        this.id_a = setInterval(()=>{
            if(this.velocityx > -1000 ){ //define soft max
                this.velocityx -= 10
            }
            if(this.scrollRate < 15){ // ^
                this.scrollRate += 0.2
            }
            this.music.rate += 0.001
        }, 5000)

        //update score every half second -> player is moving 2m/s
        this.id_b = setInterval(()=>{
            this.score += 1*this.player.scoreMultiplier
            this.scoreLeft.text = 'score → ' + this.score.toString()
            this.distanceTraveled += 1
            this.distTrav.text = (this.distanceTraveled.toString() + ' m')
        }, 500)

        //track all interval ids for easy cancel
        this.id_container.push(this.id_a)
        this.id_container.push(this.id_b)
    }

    update(){
        
        //end game condition
        if(this.player.lives <= 0){
            
            this.scene.pause()
            this.id_container.forEach(element => {
                clearInterval(element)
            })
            if(this.currentPowerup != null){
                clearInterval(this.currentPowerup.intervalID)
            }
            this.scene.start('GameOver', {finalScore: this.score})
        } else{
            //update scrolling screen
            this.playScreen.tilePositionX += this.scrollRate

            //update player
            this.player.update()

            //current element count
            this.multiplierText.text = 'elements → ' + this.player.scoreMultiplier.toString()

            //real time life tracking
            switch(this.player.lives){
                case 1:
                    this.livesRemaining.text = '❤'
                    break
                case 2:
                    this.livesRemaining.text = '❤❤'
                    break
                case 3:
                    this.livesRemaining.text = '❤❤❤'
                    break
                case 4:
                    this.livesRemaining.text = '❤❤❤❤'
                    break
                case 5:
                    this.livesRemaining.text = '❤❤❤❤❤'
                    break
                default:
                    break
            }
        }
    }

    //helper functions
    generatePlatforms(){  
        this.id_d = setInterval(()=>{
            let y = Math.floor(Math.random() * (325 - 150 + 1)) + 150;
            this.add.sprite(new Platform(this, 850, y, 'platform', 0))
        }, 850)
        this.id_container.push(this.id_d)
    }

    generateObstacles(){
        this.id_e = setInterval(()=>{   
            let y = Math.floor(Math.random() * (425 - 150 + 1)) + 150
            if(y < 375){
                this.add.sprite(new Obstacle(this, 790, y, 'obstacle-air', 0, 'air', true, this.velocityx))
            } else{
                this.add.sprite(new Obstacle(this, 790, y, 'obstacle-ground', 0, 'ground', true, this.velocityx))
            }     
        }, 2500)
        this.id_container.push(this.id_e)
    }
    
    //TODO: REFACTOR THIS
    generatePowerup(){
        if(this.powerupKeys.length === 0){
            return
        }
        
        // Generate a random index
        let rand = Math.floor(Math.random() * this.powerupKeys.length);
        let color = this.powerupKeys[rand]
        this.powerupKeys.splice(rand, 1);
        let y = Math.floor(Math.random() * (game.config.height));
    
        this.time.delayedCall(4000, ()=>{
            this.currentPowerup = new Powerup(this, 800, y, color, 0, color)  
        }, null, this)
    }    
}