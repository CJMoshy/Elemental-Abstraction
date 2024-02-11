class Item extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _name='unknown', _canMove=false, _isConsumable=false, _doesDamage=false){  
        super(scene, x, y, texture, frame)
    
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //non physical
        this.name = _name
        this.canMove = _canMove
        this.intervalID = null

        //!non-physical
        this.INITAL_VELOCITY = -250
        this.MAX_VELOCITY = 250

        if(this.canMove){
            let vector = new Phaser.Math.Vector2(1, 0)//all objects initally move left only
            vector.normalize()
            this.setVelocity(this.INITAL_VELOCITY * vector.x, this.INITAL_VELOCITY * vector.y)  
        }
    }

    update(){
        if(this.x <= 0){
            this.setX(game.config.width)
        }
    }    
}