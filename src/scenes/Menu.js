class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    init(){
        this.TITLESCREEN_SCROLL_RATE = 2.5 //endless runner core mechanic

        //config obj
        this.gameConfig = {
            scrollRate: this.TITLESCREEN_SCROLL_RATE,
        }
    }

    create(){

        //tilesprite
        this.titleScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
        
        //title
        this.add.text(game.config.width/2, game.config.height/2 - 25, 'Elemental Abstraction',{
            fontFamily: 'Comic Sans MS',
            fontSize : '30px',
            fontStyle: 'italic',
            color : '#FFFFFF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)
  
        //add character sprite
        this.player = new Player(this, 100, 325, 'player', 0).setGravity(0)
        this.player.anims.play('running_meta', true)
     
        //buttons
        this.startButton = this.add.sprite(250, 350, 'start-button').setInteractive()
        this.infoButton = this.add.sprite(550, 350, 'info-button').setInteractive()
        
        //button logic
        this.startButton.on('pointerdown', ()=>{
            this.sound.play('click')
            this.scene.start('playScene', { config: this.gameConfig})
        })

        this.infoButton.on('pointerdown', ()=>{
            this.sound.play('click')
            this.scene.start('Credits')
        })     
    }

    update(){
       this.titleScreen.tilePositionX += this.TITLESCREEN_SCROLL_RATE //make screen scroll!
    }
}