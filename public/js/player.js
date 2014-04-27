var player = {
	acceleration: 1200,
	velocity: 1200,
	jumpSpeed: 600,
	drag: 5000,
	maxSpeed: 300
};

player.createSprite = function(image){
	player.sprite = game.add.sprite(0,0,image);
	player.sprite.anchor.setTo(.5,.5);

	player.sprite.animations.add('walk',[0,1,2,3,4,5]);
	player.sprite.animations.add('idle',[6,7]);
	player.sprite.animations.add('jump',[8]);
	player.sprite.animations.add('land',[9]);
}

player.enablePhysics = function(){
	// Enable physics on the player
	game.physics.enable(player.sprite, Phaser.Physics.ARCADE);

	 // Make player collide with world boundaries so he doesn't leave the stage
	player.sprite.body.collideWorldBounds = true;

	//Give the player drag
	player.sprite.body.drag.setTo(player.drag,0);

	//Set Speed limits
	player.sprite.body.maxVelocity.setTo(player.maxSpeed, player.maxSpeed*10);

}

player.update = function(){
	//Move the player as needed
	if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		player.sprite.body.velocity.x = -player.velocity;
		player.sprite.scale.x = -1;
		player.sprite.animations.play('walk', 10, true);
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		player.sprite.body.velocity.x = player.velocity;
		player.sprite.scale.x = 1;
		player.sprite.animations.play('walk', 10, true);
	} else {
		player.sprite.body.velocity.x = 0;
		player.sprite.animations.play('idle', 2, true);
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		player.sprite.animations.play('jump', 20, true);

	}

	//Check if on ground
    var onFloor = player.sprite.body.touching.down;

    //Jumping, 
    if (onFloor && game.input.keyboard.justPressed(Phaser.Keyboard.W, 20) && !player.sprite.body.touching.up) {
        player.sprite.body.velocity.y = -1*player.jumpSpeed;
        sfx.jump.play();
    }

}
