//General Key:
// 0 - nothing
// 1 - dark solid
// 2 - light solid
// 3 - Player Start


var rooms = {
	tileSize: 80,
	tileColors: ["#1C2619","#23CC23","#048C00", "player", "#FFF1EE"]
};

rooms.startingRoom ={
	 data: [
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 1,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
      ],
      width: 12,
      height: 9 
};