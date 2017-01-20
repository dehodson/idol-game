
var Tiki = function(sweetness, spiciness, stinkiness, prettiness){
	this.sweetness = sweetness;
	this.spiciness = spiciness;
	this.stinkiness = stinkiness;
	this.prettiness = prettiness;
}

Tiki.prototype.getDescription(){
	var kind = "";

	if(this.sweetness > 3 && this.spiciness > 3 && this.stinkiness > 3 && this.prettiness > 3){
		kind = "Ultimate";
	}
}

function breedTikis(parent1, parent2, mutationChance){
	var sweetness = ((parent1.sweetness + parent2.sweetness) / 2) + (math.Random() * mutationChance);
	var spiciness = ((parent1.spiciness + parent2.spiciness) / 2) + (math.Random() * mutationChance);
	var stinkiness = ((parent1.stinkiness + parent2.stinkiness) / 2) + (math.Random() * mutationChance);
	var prettiness = ((parent1.prettiness + parent2.prettiness) / 2) + (math.Random() * mutationChance);

	return new Tiki(sweetness, spiciness, stinkiness, prettiness);
}