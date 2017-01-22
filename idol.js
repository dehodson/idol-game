
var Tiki = function(sweetness, spiciness, stinkiness, prettiness){
	this.sweetness = sweetness;
	this.spiciness = spiciness;
	this.stinkiness = stinkiness;
	this.prettiness = prettiness;
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
		description = "Just a normal Tiki.";
	}else{
		if(this.sweetness > 5){
			description += "<span class=\"sweet\">Extremely sweet.</span><br />";
		}else if(this.sweetness > 3){
			description += "<span class=\"sweet\">Very sweet.</span><br />";
		}else if(this.sweetness > 2){
			description += "<span class=\"sweet\">Fairly sweet.</span><br />";
		}else if(this.sweetness > 1){
			description += "<span class=\"sweet\">Kind of sweet.</span><br />";
		}else{
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
		}else{
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
		}else{
			description += "<span class=\"stinky\">Smells a little bit.</span><br />"
		}
		if(this.prettiness > 5){
			description += "<span class=\"pretty\">Extremely pretty.</span>";
		}else if(this.prettiness > 3){
			description += "<span class=\"pretty\">Very pretty.</span>";
		}else if(this.prettiness > 2){
			description += "<span class=\"pretty\">Fairly pretty.</span>";
		}else if(this.prettiness > 1){
			description += "<span class=\"pretty\">Kind of pretty.</span>";
		}else{
			description += "<span class=\"pretty\">Looks nice.</span>"
		}
	}

	return description;
}

Tiki.prototype.makeHTML = function(id){
	var string = "<div class=\"outside\" id=\""+id+"-outside\"><div class=\"idol\" id=\""+id+"\" draggable=\"true\" ondragstart=\"drag(event)\">";
	string += "</div><span class=\"tooltip\" id=\""+id+"-tooltip\">"+this.getName()+" Tiki<br/>"+this.getDescription()+"</span></div>";

	return string;
}

function breedTikis(parent1, parent2, mutationChance){
	var sweetness = ((parent1.sweetness + parent2.sweetness) / 2) + (Math.random() * mutationChance);
	var spiciness = ((parent1.spiciness + parent2.spiciness) / 2) + (Math.random() * mutationChance);
	var stinkiness = ((parent1.stinkiness + parent2.stinkiness) / 2) + (Math.random() * mutationChance);
	var prettiness = ((parent1.prettiness + parent2.prettiness) / 2) + (Math.random() * mutationChance);

	return new Tiki(sweetness, spiciness, stinkiness, prettiness);
}

var bins  = [null, null, null, null];
var table = [null, null];
var tikis = {};
var numTikis = 0;

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

	if(ev.target.className != "idol" && bins[parseInt(ev.target.id.substring(9)) - 1] == null){
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

	if(ev.target.className != "idol" && table[parseInt(ev.target.id.substring(6)) - 1] == null){
		if(tiki.parentNode.className == "bin"){
			bins[parseInt(tiki.parentNode.id.substring(9)) - 1] = null;
		}else if(tiki.parentNode.className == "table"){
			table[parseInt(tiki.parentNode.id.substring(6)) - 1] = null;
		}
		table[parseInt(ev.target.id.substring(6)) - 1] = tikis[name];
		ev.target.appendChild(tiki);
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

	console.log(tikis[name].sweetness + tikis[name].spiciness + tikis[name].prettiness + tikis[name].stinkiness);
	delete tikis[name];

	tiki.parentNode.removeChild(tiki);
}

function gameTick(){
	if(table[0] != null && table[1] != null){
		tikis["tiki-"+numTikis] = breedTikis(table[0], table[1], 1);
		bins[3] = tikis["tiki-"+numTikis];
		document.getElementById("tiki-bin-4").innerHTML = tikis["tiki-"+numTikis].makeHTML("tiki-"+numTikis);
		numTikis += 1;
	}
}

//testing

var test = new Tiki(Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5);
document.getElementById("tiki-bin-1").innerHTML = test.makeHTML("tiki-0");
bins[0] = test;
tikis["tiki-0"] = test;

var test2 = new Tiki(Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5);
document.getElementById("tiki-bin-2").innerHTML = test2.makeHTML("tiki-1");
bins[1] = test2;
tikis["tiki-1"] = test2;

numTikis = 2;
