class Listener extends Phaser.Scene{
    constructor(){
        super('Listener')
    }
    
    init(){
        this.newHighScore = false
        this.highScore = 0
    }
    create(data){

        this.checkHighScore(data.finalScore)

        this.time.delayedCall(1000, ()=> {this.sound.play('gameover')

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',{
                fontFamily: 'Comic Sans MS',
                fontSize : '28px',
                color : '#0000FF',
                align : 'right', 
                padding : {top : 5, bottom : 5},
                fixedWidth : 0,
            }).setOrigin(0.5)

             //score text 
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
            this.restartButton = this.add.sprite(game.config.width/2 - 200, 350, 'restart-button').setInteractive()  
            this.restartButton.on('pointerdown', ()=> {
                console.log('restart was clicked')
                this.scene.start('playScene')
            })

            this.menuButton = this.add.sprite(game.config.width/2 + 200, 350, 'menu-button').setInteractive()  
            this.menuButton.on('pointerdown', ()=> {
                console.log('menu was clicked')
                this.scene.start('menuScene')
            })
        })
    }

    checkHighScore(level){

        if(window.localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(window.localStorage.getItem('hiscore'));
            console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                console.log(`New high score: ${level}`);
                window.localStorage.setItem('hiscore', level.toString());
                this.highScore = level;
                this.newHighScore = true;
            }else{
                console.log('No new high score :/');
                this.highScore = parseInt(window.localStorage.getItem('hiscore'));
                this.newHighScore = false;
            }
        }else{
            console.log('No high score stored. Creating new.');
            this.highScore = level;
            window.localStorage.setItem('hiscore', this.highScore.toString());
            this.newHighScore = true;
        }
}

}