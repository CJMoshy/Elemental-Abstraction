class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    init(){
        this.TITLESCREEN_SCROLL_RATE = 2.5

        //config obj
        this.gameConfig = {
            scrollRate: this.TITLESCREEN_SCROLL_RATE,
        }
    }

    //TODO: most likely refactor this into preload scene
    create(){

        //tilesprite
        this.titleScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
        
        this.add.text(game.config.width/2, game.config.height/2, 'Elemental Abstraction',{
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#FFFFFF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        
        //add character sprite
        this.player = new Player(this, 100, 325, 'player', 0).setGravity(0)
        this.player.anims.play('running_meta', true)
     

        //buttons
        this.startButton = this.add.sprite(250, 350, 'startButton').setInteractive()
        this.settingsButton = this.add.sprite(550, 350, 'settingsButton').setInteractive()
        
        //button logic
        //TODO: maybe if you want, deal with button anims, but this is not any means close to prio
        this.startButton.on('pointerdown', ()=>{
            this.scene.start('playScene', { config: this.gameConfig})
        })

        this.settingsButton.on('pointerdown', ()=>{
        })     
    }

    update(){
       this.titleScreen.tilePositionX += this.TITLESCREEN_SCROLL_RATE
    }



}