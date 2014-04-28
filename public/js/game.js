//Global Vars//
var GAME_HEIGHT = 1080;
var GAME_WIDTH = 1920;
var world;
var exits;
var GRAVITY = 1500;
var fx;
var scene = 0;
var floor;
var r_wall;
var l_wall;
var m_wall;
var background;
var falseBackground;
// var t_wall;

//*Display the game**//
var game = new Phaser.Game(GAME_WIDTH,GAME_HEIGHT, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});

function preload(){
	game.load.image('player', "/assets/player.png");
	game.load.image('friend', "/assets/friend.png");
	game.load.image('code', "/assets/screenshot.png");
	game.load.spritesheet('player_map', "/assets/player_map.png", 80, 240, 10);
	sfx.preload();
}

function create(){
	//Set Background
	// game.stage.backgroundColor = "#1C2619";
	background = game.add.sprite(0,200,'code');

	bitmap = game.add.bitmapData(GAME_WIDTH,GAME_HEIGHT);
	ctx = bitmap.context;
	ctx.fillStyle = "#1C2619";
	ctx.fillRect(0, 0, GAME_WIDTH,GAME_HEIGHT);
	falseBackground = game.add.sprite(0, 0, bitmap);

	game.world.setBounds(0, 0, 1920, 1080);

	// Show FPS
	game.time.advancedTiming = true;
	fpsText = game.add.text(
		20, GAME_HEIGHT - 30, '0 FPS', { font: '16px Lato', fill: '#ffffff' }
	);

	//Capture Keys
	game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.A,
		Phaser.Keyboard.D,
		Phaser.Keyboard.W,
		Phaser.Keyboard.W,
		Phaser.Keyboard.F,
		Phaser.Keyboard.SPACEBAR,
		Phaser.Keyboard.ONE
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
		fpsText.setText(game.time.fps*1492 + '*10^23 FPS');
	}

	//Make sure the player and world collide
	game.physics.arcade.collide(player.sprite, world);

	//Check for collision with the "floor"
	game.physics.arcade.collide(floor,player.sprite, function(){
		if(scene === 3){
			scene = 4;
			friend.dialogueCount = 0;
			sfx.talk.play();
		}
	});

	game.physics.arcade.collide(r_wall,player.sprite,function(){
		if(scene === 4 && friend.dialogueCount === friend.dialogue[scene].length - 1){
			scene = 5;
			friend.dialogueCount = 0;
			sfx.talk.play();
		}

	});

	game.physics.arcade.collide(m_wall,player.sprite,function(){
		if(scene === 5 && friend.dialogueCount === friend.dialogue[scene].length - 1){
			scene = 6;
			friend.dialogueCount = 0;
			sfx.talk.play();
			codeBox.variables[1].unlocked = true;
		}

	},function(){
		return scene !== 6;
	});

	game.physics.arcade.collide(l_wall,player.sprite,function(){
		if(scene === 6 && friend.dialogueCount === friend.dialogue[scene].length - 1){
			scene = 7;
			friend.dialogueCount = 0;
			sfx.talk.play();
		}

	});

	//Update Characters
	player.update();
	friend.update();

	//Update UI
	codeBox.update();

	if(scene === 8){
		world.destroy();
		exits.destroy();
		m_wall.destroy();
		friend.dialogueCount = 0;
		sfx.talk.play();
		scene = 9;
	}

	if(scene === 10){
		player.sprite.bringToTop();
		friend.dialogueCount = 0;
		sfx.talk.play();
		scene = 11;

	}

	if(scene === 12 && friend.dialogueCount === friend.dialogue[scene].length - 1){
		simulation.destroy();
	}


}

function render(){
	// game.debug.body(player.sprite);
	// game.debug.body(exits);
	// game.debug.cameraInfo(game.camera, 500, 32);
	// game.debug.spriteCoords(player.sprite, 32, 32);


}

///*************Game Functions****************////

function buildRoom(room){
	//*Mid Wall*//
	bitmap = game.add.bitmapData(100,500);
	ctx = bitmap.context;
	ctx.fillStyle = "#1C2619";
	ctx.fillRect(0, 0, 100,500);
	m_wall = game.add.sprite(GAME_WIDTH/2 +400, GAME_HEIGHT-500, bitmap);
	game.physics.enable(m_wall, Phaser.Physics.ARCADE);
	m_wall.body.immovable = true;
	m_wall.body.allowGravity = false;


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
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, GAME_WIDTH, 100);
	floor = game.add.sprite(0, GAME_HEIGHT - 1, bitmap);
	game.physics.enable(floor, Phaser.Physics.ARCADE);
	floor.body.immovable = true;
	floor.body.allowGravity = false;

	//"Right Wall*
	bitmap = game.add.bitmapData(100,GAME_HEIGHT);
	ctx = bitmap.context;
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, 100,GAME_HEIGHT);
	r_wall = game.add.sprite(GAME_WIDTH -1, 0, bitmap);
	game.physics.enable(r_wall, Phaser.Physics.ARCADE);
	r_wall.body.immovable = true;
	r_wall.body.allowGravity = false;

	//*Left Wall*
	bitmap = game.add.bitmapData(100,GAME_HEIGHT);
	ctx = bitmap.context;
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, 100,GAME_HEIGHT);
	l_wall = game.add.sprite(-99, 0, bitmap);
	game.physics.enable(l_wall, Phaser.Physics.ARCADE);
	l_wall.body.immovable = true;
	l_wall.body.allowGravity = false;


}



