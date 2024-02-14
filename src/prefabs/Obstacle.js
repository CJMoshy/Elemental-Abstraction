class Obstacle extends Item {
  constructor(scene, x, y, texture, frame, _name="obstacle", _canMove=true, v_init=-275){
    super(scene, x, y, texture, frame, _name, _canMove, v_init)

    //two obstacle types, with differnt bodys
    switch(_name){
      case 'ground':
        this.setScale(5.5)
        .setSize(12,5)
        .setOffset(10, 10)
        break
      case 'air':
        this.setScale(4)
        .setCircle(6.2, true)
        .setOffset(6.5,13.8)
        break
      default: 
        console.log('ERROR: undefined name')
    }

    //collider
    scene.physics.add.collider(scene.player, this, ()=>{
      scene.player.lives -= 1
      scene.player.resetFlag = false
      scene.player.setVelocity(-150,-1) //knockback effect
      scene.sound.play('hit')
      this.destroy()
      scene.time.delayedCall(350, ()=>{scene.player.resetFlag = true})
    }, null, this)
  }

  update(){
    super.update()
  }
}