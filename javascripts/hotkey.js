const key = Mousetrap;

key.bind("m", buyMaxAll);
key.bind("e", buyMaxEff);
for (let tier = 0; tier < 8; tier++) {
	key.bind((tier+1).toString(), function() {
		buyMaxReactor(tier);
	});
}

key.bind("n", function(){
	buyMaxNucleosynthesis();
});

key.bind("r", function(){
	buyNaniteResearch();
});