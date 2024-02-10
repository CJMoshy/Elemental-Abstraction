class Platform extends Phaser.Physics.Arcade.Sprite{ //this should ideally inherit from item but there are too many properties that need definitions, would bloat item too much
    constructor(scene, x, y, texture, frame, _hascoin=false, currentpos = []){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setImmovable(true)
        this.setVelocityX(-400)
        this.setFriction(0)
        this.setOrigin(1)

        //platforms start non-interactive and spawn in after their first pass
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false
        this.body.checkCollision.up = false

        //properties
        this.hasCoin = _hascoin // does the platform have a coin on it
        this.canReset = false
        this.count = 0
        //Todo: this is foul that its redefined, config obj ty
        this.MIN_PLAT_BOUND = 160
        this.MAX_PLAT_BOUND = 300
    }
    

    update(name, platformPos={}){
        //anytime this moves, we update its current x position
        platformPos[name] = this.x
        
        this.count = 0
        let values = Object.values(platformPos); //refrence all the current x positions
        for (let value of values) {
            if(value < 700){ //if the platform is not in the 'spawn' area
                if(this.count < 4){
                    this.count++
                }
            }
        }

        if(this.count === 4){
            this.canReset = true    //only reset platform to other side if no platforms are in spawn area 
        }

        if(this.x < 0){ 
            if(this.alpha == 0){ //platforms start non-interactive and spawn in after their first pass
                this.setAlpha(1)
                this.body.checkCollision.up = true
            }
            if(this.canReset){
                this.canReset = false
                if(this.x < -150 || this.x > 800){ //only resize y when the platform is not on camera
                    this.setY(Math.floor(Math.random() * (this.MAX_PLAT_BOUND - this.MIN_PLAT_BOUND + 1)) + this.MIN_PLAT_BOUND)
                }
                this.scene.time.delayedCall(150, ()=> { //give the update loop a (mili)second to actually update
                    this.setX(game.config.width)
                })
            }
        }
    }
}