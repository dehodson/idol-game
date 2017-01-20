
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

function breedTikis(parent1, parent2, mutationChance){
	var sweetness = ((parent1.sweetness + parent2.sweetness) / 2) + (Math.random() * mutationChance);
	var spiciness = ((parent1.spiciness + parent2.spiciness) / 2) + (Math.random() * mutationChance);
	var stinkiness = ((parent1.stinkiness + parent2.stinkiness) / 2) + (Math.random() * mutationChance);
	var prettiness = ((parent1.prettiness + parent2.prettiness) / 2) + (Math.random() * mutationChance);

	return new Tiki(sweetness, spiciness, stinkiness, prettiness);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//testing

var test = new Tiki(Math.random() * 5, Math.random() * 5, Math.random() * 5, Math.random() * 5);
document.getElementById("tiki-1-tooltip").innerHTML = test.getName() + " Tiki<br />";
document.getElementById("tiki-1-tooltip").innerHTML += test.getDescription();