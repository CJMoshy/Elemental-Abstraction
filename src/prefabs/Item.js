class Item extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _name='unknown', _canMove=false, _isConsumable=false, _doesDamage=false){  
        super(scene, x, y, texture, frame)
    
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        //non-physical
        this.name = _name
        this.canMove = _canMove
        this.isConsumable = _isConsumable
        this.doesDamage = _doesDamage

        //!non-physical
        this.INITAL_VELOCITY = -250

        //implementing clock

        if(this.canMove){
            let vector = new Phaser.Math.Vector2(1, 0)//all objects initally move left only
            vector.normalize()
            this.setVelocity(this.INITAL_VELOCITY * vector.x, this.INITAL_VELOCITY * vector.y)  
        }

        
        if(this.canMove){  
            this.setVelocityX(-200)
        }

        if(this.name == 'powerup-ready'){
            this.beginPowerupMovement()
            //TODO: anim
        }

       
    }

    //TODO: update function
    update(){
        //handle states
        if(this.x <= 0){
            this.setX(game.config.width)
        }
    }

    beginPowerupMovement(){
        let x = [1,-1]
        let count
        setInterval(()=>{ 
            let vector = new Phaser.Math.Vector2(x[count], 0)//all objects initally move left only
            vector.normalize()
            this.setVelocity(this.INITAL_VELOCITY * vector.x, this.INITAL_VELOCITY * vector.y)    
            if(count === 0){
                count = 1
            }else {
                count = 0
            }
        }, 500  )
    }
}