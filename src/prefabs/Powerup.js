class Powerup extends Item{ 
    constructor(scene, x, y, texture, frame, _name="unknown", _canMove=true, _isConsumable=true, _doesDamage=false){
        super(scene, x, y, texture, frame, _name, _canMove, _isConsumable, _doesDamage)
        this.setCollideWorldBounds(true)
    } 

    update(){
        super.update()
    }
}