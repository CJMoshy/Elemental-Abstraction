class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _hascoin=false){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setImmovable(true)
        this.setVelocityX(-400)
        this.setFriction(0)

        //platforms start non-interactive and spawn in after their first pass
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false
        this.body.checkCollision.up = false

        //properties
        this.hasCoin = _hascoin // does the platform have a coin on it
    }
    

    update(){
        if(this.x < 0){ 
            if(this.alpha == 0){ //platforms start non-interactive and spawn in after their first pass
                this.setAlpha(1)
                this.body.checkCollision.up = true
            }
            this.setX(game.config.width)
            this.setY(Math.floor(Math.random() * (300 - 100 + 1)) + 100)//between y=100 and y=300)
        }
    }
}