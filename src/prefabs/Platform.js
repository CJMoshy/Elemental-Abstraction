class Platform extends Phaser.Physics.Arcade.Sprite{ //this should ideally inherit from item but there are too many properties that need definitions, would bloat item too much
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
        //Todo: this is foul that its redefined, config obj ty
        this.MIN_PLAT_BOUND = 160
        this.MAX_PLAT_BOUND = 300
    }
    

    update(){
        if(this.x < 0){ 
            if(this.alpha == 0){ //platforms start non-interactive and spawn in after their first pass
                this.setAlpha(1)
                this.body.checkCollision.up = true
            }
            this.setX(game.config.width)
            let y = Math.floor(Math.random() * (this.MAX_PLAT_BOUND - this.MIN_PLAT_BOUND + 1)) + this.MIN_PLAT_BOUND
            this.setY(y)//between y=220 and y=300)
        }
    }
}