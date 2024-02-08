class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    init(){
        this.TITLESCREEN_SCROLL_RATE = 2.5
        this.titleScreen

        //config obj
        this.gameConfig = {
            scrollRate: this.TITLESCREEN_SCROLL_RATE,
        }
    }

    //TODO: most likely refactor this into preload scene
    create(){

        //tilesprite
        this.titleScreen =  this.add.tileSprite(0,0, 800, 450, 'titleScreen').setOrigin(0)
    
        
        //add character sprite
        this.player = this.add.sprite(100, 320, 'player').setOrigin(1,0).setScale(0.5)
        this.player.anims.play('running_meta', true)
       

        //buttons
        this.startButton = this.add.sprite(200, 350, 'startButton').setInteractive()
        this.startButton2 = this.add.sprite(200, 350, 'startButton2').setAlpha(0)
        this.settingsButton = this.add.sprite(600, 350, 'settingsButton').setInteractive()
        this.settingsButton2 = this.add.sprite(600, 350, 'settingsButton2').setAlpha(0)
        
        //button logic
        this.startButton.on('pointerdown', ()=>{
            this.startButton.setAlpha(0)
            this.startButton2.setAlpha(1)
            setTimeout(()=>{
                this.startButton.setAlpha(1)
                this.startButton2.setAlpha(0) 
            }, 150)
            console.log('startButton was clicked')
            this.scene.start('playScene', { config: this.gameConfig})
            //TODO: Add sound
        })

        this.settingsButton.on('pointerdown', ()=>{
            this.settingsButton.setAlpha(0)
            this.settingsButton2.setAlpha(1)
            setTimeout(()=>{
                this.settingsButton.setAlpha(1)
                this.settingsButton2.setAlpha(0) 
            }, 150)
            console.log('settingsButton was clicked')
            //TODO: Add sound
        })     
    }

    update(){
       this.titleScreen.tilePositionX += this.TITLESCREEN_SCROLL_RATE
    }



}