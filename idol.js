
var Tiki = function(sweetness, spiciness, stinkiness, prettiness, id){
	this.sweetness = sweetness;
	this.spiciness = spiciness;
	this.stinkiness = stinkiness;
	this.prettiness = prettiness;
	this.id = id;
}

Tiki.prototype.getName = function(){
	var kind = "";

	if(this.sweetness > 3 && this.spiciness > 3 && this.stinkiness > 3 && this.prettiness > 3){
		kind = "Ultimate";
	}else if(this.sweetness > 3 && this.spiciness > 3 && this.stinkiness > 3){
		kind = "Nauseating";
	}else if(this.sweetness > 3 && this.stinkiness > 3 && this.prettiness > 3){
		kind = "Perfumed";
	}else if(this.sweetness > 3 && this.spiciness > 3 && this.prettiness > 3){
		kind = "Adorable";
	}else if(this.spiciness > 3 && this.stinkiness > 3 && this.prettiness > 3){
		kind = "Flambe";
	}else if(this.sweetness > 3 && this.spiciness > 3){
		kind = "Tamarind";
	}else if(this.sweetness > 3 && this.stinkiness > 3){
		kind = "Fragrant";
	}else if(this.sweetness > 3 && this.prettiness > 3){
		kind = "Candy";
	}else if(this.spiciness > 3 && this.stinkiness > 3){
		kind = "Odious";
	}else if(this.spiciness > 3 && this.prettiness > 3){
		kind = "Pepper";
	}else if(this.stinkiness > 3 && this.prettiness > 3){
		kind = "Durian";
	}else if(this.sweetness > 3){
		kind = "Sweet";
	}else if(this.spiciness > 3){
		kind = "Spicy";
	}else if(this.stinkiness > 3){
		kind = "Stinky";
	}else if(this.prettiness > 3){
		kind = "Pretty";
	}else{
		kind = "Normal";
	}

	return kind;
}

Tiki.prototype.getDescription = function(){
	var description = "";

	if(this.sweetness <= .5 && this.spiciness <= .5 && this.stinkiness <= 3 && this.prettiness <= 3){
		description = "Just a normal Tiki.<br />";
	}else{
		if(this.sweetness > 5){
			description += "<span class=\"sweet\">Extremely sweet.</span><br />";
		}else if(this.sweetness > 3){
			description += "<span class=\"sweet\">Very sweet.</span><br />";
		}else if(this.sweetness > 2){
			description += "<span class=\"sweet\">Fairly sweet.</span><br />";
		}else if(this.sweetness > 1){
			description += "<span class=\"sweet\">Kind of sweet.</span><br />";
		}else if(this.sweetness >= .5){
			description += "<span class=\"sweet\">Tastes a little sweet.</span><br />"
		}
		if(this.spiciness > 5){
			description += "<span class=\"spicy\">Extremely spicy.</span><br />";
		}else if(this.spiciness > 3){
			description += "<span class=\"spicy\">Very spicy.</span><br />";
		}else if(this.spiciness > 2){
			description += "<span class=\"spicy\">Fairly spicy.</span><br />";
		}else if(this.spiciness > 1){
			description += "<span class=\"spicy\">Kind of spicy.</span><br />";
		}else if(this.spiciness >= .5){
			description += "<span class=\"spicy\">Slightly hot to taste.</span><br />"
		}
		if(this.stinkiness > 5){
			description += "<span class=\"stinky\">Extremely stinky.</span><br />";
		}else if(this.stinkiness > 3){
			description += "<span class=\"stinky\">Very stinky.</span><br />";
		}else if(this.stinkiness > 2){
			description += "<span class=\"stinky\">Fairly stinky.</span><br />";
		}else if(this.stinkiness > 1){
			description += "<span class=\"stinky\">Kind of stinky.</span><br />";
		}else if(this.stinkiness >= .5){
			description += "<span class=\"stinky\">Smells a little bit.</span><br />"
		}
		if(this.prettiness > 5){
			description += "<span class=\"pretty\">Extremely pretty.</span><br />";
		}else if(this.prettiness > 3){
			description += "<span class=\"pretty\">Very pretty.</span><br />";
		}else if(this.prettiness > 2){
			description += "<span class=\"pretty\">Fairly pretty.</span><br />";
		}else if(this.prettiness > 1){
			description += "<span class=\"pretty\">Kind of pretty.</span><br />";
		}else if(this.prettiness >= .5){
			description += "<span class=\"pretty\">Looks nice.</span><br />";
		}
	}

	description += "Level "+Math.floor((this.sweetness + this.spiciness + this.prettiness + this.stinkiness) * 10);

	return description;
}

Tiki.prototype.makeHTML = function(){
	var kind = this.getName().toLowerCase() + "idol";
	var string = "<div class=\"outside\" id=\""+this.id+"-outside\"><div class=\""+kind+" idol\" id=\""+this.id+"\" draggable=\"true\" ondragstart=\"drag(event)\">";
	string += "</div><span class=\"tooltip\" id=\""+this.id+"-tooltip\">"+this.getName()+" Tiki<br/>"+this.getDescription()+"</span></div>";

	return string;
}

function breedTikis(parent1, parent2, mutationChance, negativeMutation){
	var sweetness = ((parent1.sweetness + parent2.sweetness) / 2) + ((Math.random() - negativeMutation) * mutationChance);
	var spiciness = ((parent1.spiciness + parent2.spiciness) / 2) + ((Math.random() - negativeMutation) * mutationChance);
	var stinkiness = ((parent1.stinkiness + parent2.stinkiness) / 2) + ((Math.random() - negativeMutation) * mutationChance);
	var prettiness = ((parent1.prettiness + parent2.prettiness) / 2) + ((Math.random() - negativeMutation) * mutationChance);

	if(sweetness < 0){sweetness = 0;}
	if(spiciness < 0){spiciness = 0;}
	if(stinkiness < 0){stinkiness = 0;}
	if(prettiness < 0){prettiness = 0;}

	var id = "tiki-"+numTikis;
	numTikis += 1;

	return new Tiki(sweetness, spiciness, stinkiness, prettiness, id);
}

var bins  = [null, null, null, null, null, null];
var table = [null, null];
var tikis = {};
var numTikis = 0;
var cash = 100000;
var breedingTime = 35;
var mutationChance = .6;
var negativeMutation = .5;
var breedingCounter = 0;

var upgradeTable = {
	"incense": 0,
	"uranium": 0,
	"serum":   0,
	"auto":    false,
	"bins":    0
}

var unlockedTikis = ["normal"];

function addCash(number){
	cash += number;
	document.getElementById("cash").innerHTML = cash.toFixed(2);
	document.getElementById("shop-cash").innerHTML = cash.toFixed(2);
}

function spendCash(number){
	cash -= number;
	document.getElementById("cash").innerHTML = cash.toFixed(2);
	document.getElementById("shop-cash").innerHTML = cash.toFixed(2);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.parentNode.id);
    ev.dataTransfer.setData("name", ev.target.id);
}

function dropBin(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var name = ev.dataTransfer.getData("name");
    var tiki = document.getElementById(data);

	if(ev.target.className == "bin" && bins[parseInt(ev.target.id.substring(9)) - 1] == null){
		if(tiki.parentNode.className == "bin"){
			bins[parseInt(tiki.parentNode.id.substring(9)) - 1] = null;
		}else if(tiki.parentNode.className == "table"){
			table[parseInt(tiki.parentNode.id.substring(6)) - 1] = null;
		}
		bins[parseInt(ev.target.id.substring(9)) - 1] = tikis[name];
		ev.target.appendChild(tiki);
	}
}

function dropTable(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var name = ev.dataTransfer.getData("name");
    var tiki = document.getElementById(data);

	if(ev.target.className == "table" && table[parseInt(ev.target.id.substring(6)) - 1] == null){
		if(tiki.parentNode.className == "bin"){
			bins[parseInt(tiki.parentNode.id.substring(9)) - 1] = null;
		}else if(tiki.parentNode.className == "table"){
			table[parseInt(tiki.parentNode.id.substring(6)) - 1] = null;
		}
		table[parseInt(ev.target.id.substring(6)) - 1] = tikis[name];
		ev.target.appendChild(tiki);
	}
}

function addToBin(tiki){
	for(var spot in bins){
		if(bins[spot] == null){
			bins[spot] = tiki;
			document.getElementById("tiki-bin-"+(parseInt(spot)+1)).innerHTML = tiki.makeHTML();
			break;
		} 
	}
}

function sell(ev){
	ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var name = ev.dataTransfer.getData("name");
    var tiki = document.getElementById(data);

    if(tiki.parentNode.className == "bin"){
		bins[parseInt(tiki.parentNode.id.substring(9)) - 1] = null;
	}else if(tiki.parentNode.className == "table"){
		table[parseInt(tiki.parentNode.id.substring(6)) - 1] = null;
	}

	addCash(tikis[name].sweetness + tikis[name].spiciness + tikis[name].prettiness + tikis[name].stinkiness);
	delete tikis[name];

	tiki.parentNode.removeChild(tiki);
}

function sellAll(){
	for(var i = 0; i < bins.length; i++){
		if(bins[i] != null){
			var element = document.getElementById(bins[i].id);
			var tiki = tikis[bins[i].id];
			addCash(tiki.sweetness + tiki.spiciness + tiki.prettiness + tiki.stinkiness);
			delete tikis[bins[i].id];
			bins[i] = null;
			element.parentNode.removeChild(element);
		}
	}
}

function binEmpty(){
	var result = false;

	for(var item in bins){
		if(bins[item] == null){
			result = true;
			break;
		}
	}

	return result;
}

function sellWorstTiki(){
	var worst = Infinity;
	var index = 0;

	for(var item in bins){
		if(bins[item] != null){
			if(bins[item].sweetness + bins[item].spiciness + bins[item].prettiness + bins[item].stinkiness < worst){
				worst = bins[item].sweetness + bins[item].spiciness + bins[item].prettiness + bins[item].stinkiness;
				index = item;
			}
		}
	}

	var element = document.getElementById(bins[index].id);
	var tiki = tikis[bins[index].id];
	addCash(tiki.sweetness + tiki.spiciness + tiki.prettiness + tiki.stinkiness);
	delete tikis[bins[index].id];
	bins[index] = null;
	element.parentNode.removeChild(element);
}

function pickUp(){
	if(binEmpty()){
		var id = "tiki-"+numTikis;
		numTikis += 1;
		var tiki = new Tiki(.25, .25, .25, .25, id);
		tikis[tiki.id] = tiki;
		addToBin(tikis[tiki.id]);
	}
}

function openShop(){
	document.getElementById("upgrades").style.visibility = "visible";
}

function closeShop(){
	document.getElementById("upgrades").style.visibility = "hidden";
}

function openGallery(){
	document.getElementById("tikis").style.visibility = "visible";
}

function closeGallery(){
	document.getElementById("tikis").style.visibility = "hidden";
}

function upgrade(name){
	if(name == "incense"){
		var price = (((upgradeTable.incense * upgradeTable.incense) * 100) + 50);
		if(cash >= price){
			spendCash(price);
			upgradeTable.incense += 1;
			breedingTime -= 10;

			if(breedingTime < 0){
				breedingTime = 1;
				document.getElementById("upgrade-breeding-button").innerHTML = "Sold Out!";
				document.getElementById("upgrade-breeding-button").className = "sold-out";
			}else{
				document.getElementById("upgrade-breeding-price").innerText = (((upgradeTable.incense * upgradeTable.incense) * 100) + 50);
			}
		}
	}else if(name == "uranium"){
		var price = (((upgradeTable.uranium * upgradeTable.uranium) * 150) + 150);
		if(cash >= price){
			spendCash(price);
			upgradeTable.uranium += 1;
			mutationChance += .2;
			document.getElementById("upgrade-uranium-price").innerText = (((upgradeTable.uranium * upgradeTable.uranium) * 150) + 150);
		}
	}else if(name == "serum"){
		var price = (((upgradeTable.serum * upgradeTable.serum) * 100) + 200);
		if(cash >= price){
			spendCash(price);
			upgradeTable.serum += 1;
			negativeMutation -= .1;

			if(negativeMutation <= 0.01){
				negativeMutation = 0;
				document.getElementById("upgrade-serum-button").innerHTML = "Sold Out!";
				document.getElementById("upgrade-serum-button").className = "sold-out";
			}else{
				document.getElementById("upgrade-serum-price").innerText = (((upgradeTable.serum * upgradeTable.serum) * 100) + 200);
			}
		}
	}else if(name == "auto"){
		var price = 250;
		if(cash >= price){
			spendCash(price);
			upgradeTable.auto = true;

			document.getElementById("upgrade-auto-button").innerHTML = "Sold Out!";
			document.getElementById("upgrade-auto-button").className = "sold-out";
		}
	}else if(name == "bins"){
		var price = (((upgradeTable.bins * upgradeTable.bins) * 10) + 25);
		if(cash >= price){
			spendCash(price);
			upgradeTable.bins += 1;
			document.getElementById("tiki-bin-"+(6 + upgradeTable.bins)).className = "bin";
			bins.push(null);

			if(upgradeTable.bins == 12){
				document.getElementById("upgrade-bins-button").innerHTML = "Sold Out!";
				document.getElementById("upgrade-bins-button").className = "sold-out";
			}else{
				document.getElementById("upgrade-bins-price").innerText = (((upgradeTable.bins * upgradeTable.bins) * 10) + 25);
			}
		}
	}
}

function gameTick(){

	if(!binEmpty() && upgradeTable.auto){
		sellWorstTiki();
	}

	if(table[0] != null && table[1] != null && binEmpty()){
		breedingCounter += 1;
		if(breedingCounter > breedingTime){
			breedingCounter = breedingTime;
		}
		document.getElementById("breeding-bar-inner").style.width = ((breedingCounter / breedingTime) * 20) + "vmin";
	} else {
		breedingCounter = 0;
		document.getElementById("breeding-bar-inner").style.width = ((breedingCounter / breedingTime) * 20) + "vmin";
	}

	if(breedingCounter >= breedingTime){
		if(table[0] != null && table[1] != null){
			var tiki = breedTikis(table[0], table[1], mutationChance, negativeMutation);
			var type = tiki.getName().toLowerCase();

			if(unlockedTikis.indexOf(type) == -1){
				unlockedTikis.push(type);
				document.getElementById(type+"-tiki").className = "tiki-unlock";
			}

			tikis[tiki.id] = tiki;
			addToBin(tikis[tiki.id]);
		}
		breedingCounter = 0;
	}
}

window.setInterval(gameTick, 100)