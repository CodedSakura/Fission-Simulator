function getDefaultData() {
	return {
		version: {
			x: 0,
			alpha: 1,
			beta: 5
		},
		
		options: {
			notation: "Scientific",
			notationNo: 0
		},
		navigation: {
			naviTab: "production",
			production: "resources"
		},
		
		unlocked: {
				naniteUps: 0,
				meltdown: 0,
				decayHasten: 0
		},
		energy: new Decimal(100),
		totalEnergy: new Decimal(100),
		fuel: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		
		eff: {
			bought: 0,
			cost: new Decimal("1e3"),
			costMult: new Decimal("1e1"),
			costMultMult: new Decimal(10),
			mult: new Decimal(1),
			multMult: new Decimal(1.1)
		},
		mine: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e4"), new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24")],
			costMult: [new Decimal("1e3"), new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e10"), new Decimal("1e12"), new Decimal("1e15")],
			bought: [0, 0, 0, 0, 0, 0, 0, 0],
			mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
			costMultMult: new Decimal(10),
			multMult: new Decimal(2),
		},
		reactor: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e4"), new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24")],
			costMult: [new Decimal("1e3"), new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e10"), new Decimal("1e12"), new Decimal("1e15")],
			bought: [0, 0, 0, 0, 0, 0, 0, 0],
			mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
			costMultMult: new Decimal(10),
			multMult: new Decimal(2),
		},
		
		meteor: {
			shower: 0,
			meteorMult: new Decimal(2)
		},
		
		nanites: {
			nanites: new Decimal(0),
			total: new Decimal(0),
			lastResearch: new Decimal(0),
			ups: {
				0: 0,
				11: 0,
				21: 0,
				22: 0,
				31: 0,
				32: 0,
				41: 0,
				42: 0
			},
			effUpCost: new Decimal(1),
		},
		
		meltdown: {
			corium: new Decimal(0),
			total: new Decimal(0),
			energyGoal: Decimal.pow(2, 1024),
			time: 0
		},
		
		time: 0,
		timeOnline: 0,
		lastUpdate: Date.now()
	}
}
const mining = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];
const fissile = ["Thorium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];
const isotopes = ["Thorium-232", "Uranium-235", "Neptunium-237", "Plutonium-241", "Americium-243", "Curium-247", "Berkelium-247", "Californium-252"];
const LEF = ["LET", "LEU", "LENp", "LEPu", "LEAm", "LECu", "LEBk", "LECf"];
const kgLEFJ = [new Decimal(1), new Decimal(4), new Decimal(16), new Decimal(64), new Decimal(256), new Decimal(1024), new Decimal(4096), new Decimal(16384)];
const JkgLEF = [new Decimal(2), new Decimal(8), new Decimal(32), new Decimal(128), new Decimal(512), new Decimal(2048), new Decimal(8192), new Decimal(32768)];

var focused = true;
window.onfocus = function() {  
  focused=true;  
}
window.onblur = function() {  
  focused=false;  
}  

function hardReset() {
	showNaviTab("production");
	showProdTab("resources"); 
	player = getDefaultData();
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}

function updateUI() {
	updateUIEnergy();
	updateUIFuel();
	updateUIMines();
	updateUIReactors();
	updateUIEff();
	updateUIMeteor();
	updateUINaniteUps();
	updateUINaniteResearch();
	updateUIMeltdown();
	updateUIStats();
}
function updateGame(tickInterval) {
	simulateMines(tickInterval);
	simulateFuel(tickInterval);
	simulateReactors(tickInterval);
	simulateEnergy(tickInterval);
}

var player = getDefaultData();

/*Game Loops*/
var saveGameLoop = setInterval(function() {
	saveGame();
}, 15000);

var updateGameLoop = setInterval(function() {
	if (Date.now() > player.lastUpdate + 1000 && focused) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	updateGame(25);
	player.lastUpdate = Date.now();
}, 25);

var updateUILoop = setInterval(function() {
	updateUI();
}, 50);

var timerLoop = setInterval(function() {
	player.time += 50;
	player.time = floor(player.time);
	player.timeOnline += 50;
	player.timeOnline = floor(player.timeOnline);
	player.meltdown.time += 50;
	player.meltdown.time = floor(player.meltdown.time);
}, 50);