//Global Vars//
var GAME_HEIGHT = 1080;
var GAME_WIDTH = 1920;
var world;
var exits;
var GRAVITY = 1500;
var fx;
var scene = 0;
var floor;

//*Display the game**//
var game = new Phaser.Game(GAME_WIDTH,GAME_HEIGHT, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});

function preload(){
	game.load.image('player', "/assets/player.png");
	game.load.image('friend', "/assets/friend.png");
	game.load.spritesheet('player_map', "/assets/player_map.png", 80, 240, 10);
	sfx.preload();
}

function create(){
	//Set Background
	game.stage.backgroundColor = "#1C2619";

	// Show FPS
	game.time.advancedTiming = true;
	fpsText = game.add.text(
		20, GAME_HEIGHT - 20, '0 FPS', { font: '16px Lato', fill: '#ffffff' }
	);

	online.connect(function(){
		game.add.text(80, GAME_HEIGHT - 20, 'Sockets connected.', { font: '16px Lato', fill: '#ffffff'});
	})

	//Capture Keys
	game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.A,
		Phaser.Keyboard.D,
		Phaser.Keyboard.W,
		Phaser.Keyboard.W,
		Phaser.Keyboard.F,
		Phaser.Keyboard.SPACEBAR
	]);

	//Fullscreen Hotkey
	fullScreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
	fullScreenKey.onDown.add(function(){
		game.scale.startFullScreen(false); //bool controls AA
	}, this);

	//Sound
	sfx.setupSound();

	//Gravity.
	game.physics.arcade.gravity.y = GRAVITY;

	//Add Player
	player.createSprite('player_map');
	player.enablePhysics();
	
	//Add Friend
	friend.createSprite('friend');

	//Build Room
	buildRoom(rooms.startingRoom);

	//Make sure heroes are on top
	player.sprite.bringToTop();
	friend.sprite.bringToTop();

	//create codebox
	codeBox.createSprite();

	//Have friend start talking
	friend.talk();

}

function update(){
	//Keep game window same as browser window
	util.resizeGame(game);

	//Update FPS
	if (game.time.fps !== 0) {
		fpsText.setText(game.time.fps + ' FPS');
	}

	//Make sure the player and world collide
	game.physics.arcade.collide(player.sprite, world);

	//Check for collision with the "floor"
	game.physics.arcade.collide(floor,player.sprite, function(){
		if(scene !== 4){
			scene = 4;
			friend.dialogueCount = 0;
			sfx.talk.play();
		}

	});

	//Update Characters
	player.update();
	friend.update();

	//Update UI
	codeBox.update();

}

function render(){
	// game.debug.body(player.sprite);
	// game.debug.body(exits);

}

///*************Game Functions****************////

function buildRoom(room){
	world = game.add.group();
	exits = game.add.group();

	mapWidth = room.width * rooms.tileSize;
	mapHeight = room.height * rooms.tileSize;

	room.data.forEach(function(tile, index){
		x = (index % room.width)*rooms.tileSize;
		y = Math.floor(index / room.width)*rooms.tileSize;

		if(tile === 3){ //Place player
			player.sprite.x = x + mapWidth/2 + player.sprite.width/2;
			player.sprite.y = y + mapHeight/2 - player.sprite.height*1.5;
			friend.sprite.x = player.sprite.x + 100;
			friend.sprite.y = player.sprite.y - 100;

		}else if(tile === 0){

		}else{ //Draw tile
			bitmap = game.add.bitmapData(rooms.tileSize, rooms.tileSize);
			ctx = bitmap.context;
			ctx.fillStyle = rooms.tileColors[tile];
			ctx.fillRect(0, 0, rooms.tileSize, rooms.tileSize);
			block = game.add.sprite(GAME_WIDTH/2 - mapWidth/2 + x, GAME_HEIGHT/2 - mapHeight/2 + y, bitmap);
			game.physics.enable(block, Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.allowGravity = false;
			if(tile === 4){ //Exit Tiles
				exits.add(block);
			}else{
				world.add(block);
			}
		}
	});

	//"Floor"
	bitmap = game.add.bitmapData(GAME_WIDTH,100);
	ctx = bitmap.context;
	ctx.fillStyle = "#333333"
	ctx.fillRect(0, 0, GAME_WIDTH, 100);
	floor = game.add.sprite(0, GAME_HEIGHT - 1, bitmap);
	game.physics.enable(floor, Phaser.Physics.ARCADE);
	floor.body.immovable = true;
	floor.body.allowGravity = false;


}



