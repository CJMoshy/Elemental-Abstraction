class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver')
    }
    
    init(){
        this.newHighScore = false
        this.highScore = 0
    }
    create(data){
        //last runs score
        this.checkHighScore(data.finalScore)

    //text formatting
        this.time.delayedCall(1000, ()=> {this.sound.play('gameover') //gives cool effect

            this.add.text(game.config.width/2, game.config.height/2 - 25, 'GAME OVER',{
                fontFamily: 'Comic Sans MS',
                fontSize : '28px',
                color : '#0000FF',
                align : 'right', 
                padding : {top : 5, bottom : 5},
                fixedWidth : 0,
            }).setOrigin(0.5)

            this.scoreLeft = this.add.text(game.config.width/2 - 150, game.config.height/2 + 50, 'your score: ' + data.finalScore.toString(), {
                fontFamily: 'Comic Sans MS',
                fontSize : '20px',
                color : '#FFFFFF',
                align : 'right', 
                padding : {top : 5, bottom : 5},
                fixedWidth : 0,
            }).setOrigin(0.5)

            if(this.newHighScore){
                this.scoreLeft = this.add.text(game.config.width/2 + 150, game.config.height/2 + 50, 'new high score: ' + data.finalScore.toString(), {
                    fontFamily: 'Comic Sans MS',
                    fontSize : '20px',
                    color : '#00FF00',
                    align : 'right', 
                    padding : {top : 5, bottom : 5},
                    fixedWidth : 0,
                }).setOrigin(0.5)
            }else{
                this.scoreLeft = this.add.text(game.config.width/2 + 150, game.config.height/2 + 50, 'high score: ' + this.highScore.toString(), {
                    fontFamily: 'Comic Sans MS',
                    fontSize : '20px',
                    color : '#FF0000',
                    align : 'right', 
                    padding : {top : 5, bottom : 5},
                    fixedWidth : 0,
                }).setOrigin(0.5)
            }

        //nav buttons
            this.restartButton = this.add.sprite(game.config.width/2 - 200, 350, 'restart-button').setInteractive()  
            this.restartButton.on('pointerdown', ()=> {
                this.sound.play('click')
                this.scene.start('playScene')
            })

            this.menuButton = this.add.sprite(game.config.width/2 + 200, 350, 'menu-button').setInteractive()  
            this.menuButton.on('pointerdown', ()=> {
                this.sound.play('click')
                this.scene.start('menuScene')
            })
        })
    }

    checkHighScore(level){//credit nathan altice for the framework of this function
        //function determines if last games score is higher than locally saved highscore and responds appropriately
        if(window.localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(window.localStorage.getItem('hiscore'));
            if(level > storedScore) {    
                window.localStorage.setItem('hiscore', level.toString());
                this.highScore = level;
                this.newHighScore = true;
            }else{ 
                this.highScore = parseInt(window.localStorage.getItem('hiscore'));
                this.newHighScore = false;
            }
        }else{
            this.highScore = level;
            window.localStorage.setItem('hiscore', this.highScore.toString());
            this.newHighScore = true;
        }
    }
}