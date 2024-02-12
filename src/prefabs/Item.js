//Item base class defines all game objects that are not the player
//class handles movement of items as well as tracks important information about the items
class Item extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _name='unknown', _canMove=false, v_init=-250){  
        super(scene, x, y, texture, frame)
    
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //non physical
        this.name = _name
        this.canMove = _canMove
        this.intervalID = null

        //!non-physical
        this.INITAL_VELOCITY = v_init
        this.MAX_VELOCITY = 250

        if(this.canMove){
            let vector = new Phaser.Math.Vector2(1, 0)//all objects initally move left only
            vector.normalize()
            this.setVelocity(this.INITAL_VELOCITY * vector.x, this.INITAL_VELOCITY * vector.y)  
        }

        //forced update without needing to explicitly call update for each item that inherits
        scene.events.on('update', this.update, this)
    }

    update(){
        if(this.x < 0){
            this.destroy()
        }
    }    
}