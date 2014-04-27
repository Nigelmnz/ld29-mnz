var sfx = {};

sfx.preload = function(){
	game.load.audio('talk_sfx', 'assets/talk.wav');
	game.load.audio('jump_sfx', 'assets/jump.wav');
	game.load.audio('press_hi_sfx', 'assets/press_hi.wav');
	game.load.audio('press_lo_sfx', 'assets/press_lo.wav');
}

sfx.setupSound = function(){
	sfx.talk = game.add.audio('talk_sfx',.05,false);
	sfx.jump = game.add.audio('jump_sfx',.05,false);
	sfx.pressHi = game.add.audio('press_hi_sfx',.02,false);
	sfx.pressLo = game.add.audio('press_lo_sfx',.02,false);
}