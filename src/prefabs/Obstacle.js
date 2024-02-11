class Obstacle extends Item {
  constructor(scene, x, y, texture, frame, _name="obstacle", _canMove=true, v_init=-275){
    super(scene, x, y, texture, frame, _name, _canMove, v_init)
    this.setScale(5.5)
    .setSize(12,5)
    .setOffset(10, 10)
    .setImmovable(true)


    scene.physics.add.collider(scene.player, this, ()=>{
      console.log('collision @obst')
      scene.player.lives -= 1
      console.log(scene.player.lives)
      scene.player.resetFlag = false
      scene.player.setVelocity(-150,-1) //knockback
      this.destroy()
      scene.time.delayedCall(350, ()=>{scene.player.resetFlag = true})
    }, null, this)
  }

  update(){
    super.update()
  }
}