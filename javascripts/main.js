function getDefaultData() {
	return {
		version: {
			alpha: 0, 
			beta: 9
		},
		options: {
			notation: "Scientific",
			notationNo: 0
		},
		navigation: {
			naviTab: "production"
		},
		energy: new Decimal(80),
		eff: {
			bought: 0,
			cost: new Decimal("1e+3"),
			costMult: new Decimal("1e+1"),
			costMultMult: new Decimal(10),
			mult: new Decimal(1),
			multMult: new Decimal(1.1)
		},
		reactor: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+6"), new Decimal("1e+9"), new Decimal("1e+13"), new Decimal("1e+18"), new Decimal("1e+24")],
			costMult: [new Decimal("1e+3"), new Decimal("1e+4"), new Decimal("1e+5"), new Decimal("1e+6"), new Decimal("1e+8"), new Decimal("1e+10"), new Decimal("1e+12"), new Decimal("1e+15")],
			bought: [0, 0, 0, 0, 0, 0, 0, 0],
			mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
			costMultMult: new Decimal(10),
			multMult: new Decimal(2),
		},
		meteor: {
			shower: 0,
			meteorMult: new Decimal(2),
			time: 0
		},
		nanites: {
			nanites: new Decimal(0),
			upgrades: [0, false, false],
			lastNanites: new Decimal(0)
		},
		time: 0,
		lastUpdate: Date.now()
	}
}
const elements = ["Thorium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];
const isotopes = ["Thorium-232", "Uranium-235", "Neptunium-237", "Plutonium-241", "Americium-243", "Curium-247", "Berkelium-247", "Californium-252"];


function getType(x) {
	return (typeof x);
}

function hardReset() {
	let tab = player.navigation;
	player = getDefaultData();
	player.navigation.naviTab = tab.naviTab;
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.naviTab = tab;
}

function update() {
	updateNaniteResearch();
	updateNaniteUpgrades();
	updateMeteor();
	updateReactors();
	updateEff();
	updateEnergy();
}

/*Initialise Game*/
var player = getDefaultData();
init_game();

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	saveGame();
}, 15000);

var mainGameLoop = window.setInterval(function() {
	if (Date.now() > player.lastUpdate) {
		simulateTime(Date.now() - player.lastUpdate);
	}
	update();
	player.lastUpdate = Date.now();
}, 50);

var timerLoop = window.setInterval(function() {
	player.time += 0.05;
	player.meteor.time += 0.05;
}, 50);