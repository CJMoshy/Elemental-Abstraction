class Loader extends Phaser.Scene{
    constructor(){
        super('loader')
    }

    preload(){
        //TODO: loading bar
       
        //load images
        this.load.image('titleScreen', './assets/images/title-screen.png')
        this.load.image('startButton', './assets/images/start-button-1.png')
        this.load.image('startButton2', './assets/images/start-button-2.png')
        this.load.image('settingsButton', './assets/images/settings-button.png')
        this.load.image('settingsButton2', './assets/images/settings-button-2.png')

        //character spritesheet
        this.load.atlas('player', './assets/spritesheets/player/player-spritesheet.png', './assets/spritesheets/player/player-spritesheet.json')
    }

    create(){
        //check for local storage browser support
        window.localStorage ? console.log('local storage enabled') : console.log('no local storage supported')
        
        //create animations
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'character-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })


        this.scene.start('menuScene')
    }   

}