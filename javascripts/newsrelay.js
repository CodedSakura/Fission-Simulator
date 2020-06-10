/* Use “ & ” for Quotation Marks in Messages */
const newsArray = [
	["News brought to you by Nuclear Experimental News Array, in partnership with Hevipelle.", true],
	["Don't worry, you'll cause more :.|:; eventually", true],
	["Scientists found out that nuclear reactors are more efficient than antimatter. Experts say the reason could be the explosions created by the antimatter made the measuring device broken beyond repair, resulting in the reading of 0.", true],
	["Martha! Why is there suddenly a reactor melting down in my backyard?", true],
	["People are complaining about radioactivity leaking from our site, Captain!. Should I silence them?", true],
	["Colonel Rhdmskyh looked over the horizon. There was nothing abnormal happening. There were no nuclear explosions, no radioactive waste leaking out, only the beautiful skyline of the city of Yhwisirk. He did not expect for it to change so suddenly, as an experiment was interfered. “Colonel! The nuclear lab-” The messenger’s voice was quickly drowned out by a shattering just a few miles away. The silhouette of a mushroom cloud could be seen in the distance. “Colonel, you know the experiment with the nucleosynthesis thing? It was sabotaged.” The colonel froze. Sabotaged? It was the first time in millennia that the Universal Nucleosynthesis Experiment had been sabotaged. More distant explosions could be heard. “I shall attend a meeting with the council members on this matter immediately,” he proclaimed. And it was done. “Colonel Rhdmskyh Swasikova of legion 8e4 at celestial body 478-X3E, report on the situation at 478-X3E immediately.” “Instructions clear, O8-CXVI. The Universal Nucleosynthesis Experiment has been sabotaged. Current situation 58,976 dead, 890,578 injured. 5 facilities were destroyed.” An awkward silence followed. O8-LIV could be heard typing vigorously. “I have compiled a list of civilizations that don’t have the best relationship with us humans. The most likely suspect would be the zalgans. Colonel, I expect you to have your army on your way to celestial body 580-Z8L immediately.”", true],
	["Tensions between Ywisirk and Blotranka continue to rise. The leader of Blotranka threatens that “if Ywisirk continues to place a 100% tax rate on imported goods” Blotranka will “leak all their personal letters which spread the propaganda that fission reactors are real”. Ywisirk's foreign affairs department has yet to respond.", true],
	["Object#: PAO-2038 Object Class: <s>Safe</s> Keter Containment Procedures: PAO-2038 is to be kept in an air-tight room which should be kept as close to a true vacuum as possible. The room should be lined with at least 10 metres of lead and insulator, and with shock-absorbent materials. Description: PAO-2038 is a metal box with dimensions 40cmx40cmx10cm. <s>PAO-2038 appears to be completely harmless but processes some anomalous properties such as not being able to be bent nor broken</s> PAO-2038 is now considered Keter class after incident 2038-1. PAO gained a white glow and converted the surrounding matter into explodium-357. It subsequently created neutrons which lead the explodium to fission, destroying most of Site-394. No more further sightings of the event have been noticed.", true],
	["Disclaimer: Redfire corp. (we, us, our company, redfire, redfire corp.) is in no way responsible or accountable for any consequences caused through the use of Redfire corp. products. These consequences may include, but are not limited to, sudden reality destabilization, time warping, molecular instability, and instant death.", true],
	["Most recently, the news relay has been hijacked by a bunch of middle-schoolers, who care about nothing but to post low-quality memes over the internet. Part of the news relay has already degraded into nothing but jokes, and BUY GOLD, BYE", true],
	["Most recently, a lawsuit has been filed by caer Srot Pwllgwyngyll of Otarensin, claiming that “reactor backwards is srotcaer” or something. He went on about something about how “srotcaer was some really special name only ment for him”. The opposition won immediately after the lawsuit was filed.", true],
	["There have been complaints against the build of a highly radioactive reactor in the middle of New York", true],
	["Sir... Sir.... SIR!!!! WHAT!!!! Ummm, there's an old man with a shotgun pointing at me wanting to know why we're burying those barrels in his backyard...", true],
	["“To reactor or not to reactor... to mine or not to mine... THAT is the true Quarry!”  -- Mine Reactor General Digger", true],
	["e is an interesting letter when pressed it seems to make things run just a bit better in the ole reactor and mine areas.... go figure!", true],
	["It's over Anakin, I have the radioactive ground!", true]
];

document.addEventListener("visibilitychange", function() {
	if (!document.hidden) {
		nextNews();
	}
}, false);
var scroll = [];
var nextNewsIndex;

function nextNews() {
	try {
		do {
			nextNewsIndex = Math.floor(Math.random() * newsArray.length)
		} 
		while (!eval(newsArray[nextNewsIndex][1]))
	} catch(e) {
			console.log("Newsarray doesn't work at idx " + nextNewsIndex)
	}
	
	scroll.forEach(function(v) {
		clearTimeout(v);
	});
	
	scroll = [];
	
	document.getElementById("news").innerHTML = newsArray[nextNewsIndex][0];
	
	let pwidth = document.getElementById("news").parentElement.clientWidth;
	let cwidth = document.getElementById("news").clientWidth;
	
	document.getElementById("news").style.transition = "";
	document.getElementById("news").style.transform = 'translateX('+pwidth+'px)';

	scroll.push(setTimeout(function() {
		let dist = pwidth + cwidth + 20;
		let rate = 100;
		let transformDuration = dist / rate;
		
		document.getElementById("news").style.transition = 'transform '+transformDuration+'s linear';
		document.getElementById("news").style.transform = 'translateX(-'+(cwidth+5)+'px)';
		scroll.push(setTimeout(nextNews, Math.ceil(transformDuration * 1000)));
	}, 100));
}