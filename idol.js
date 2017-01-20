
// Credits to Teddy Garland for the color blending function
function blend_colors(color1, color2, percentage)
{
    color1 = color1 || '#000000';
    color2 = color2 || '#ffffff';
    percentage = percentage || 0.5;

    if (color1.length != 4 && color1.length != 7)
        throw new error('colors must be provided as hexes');

    if (color2.length != 4 && color2.length != 7)
        throw new error('colors must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
        throw new error('percentage must be between 0 and 1');

    if (color1.length == 4)
        color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
    else
        color1 = color1.substring(1);
    if (color2.length == 4)
        color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
    else
        color2 = color2.substring(1);   

    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

    var color3 = [ 
        (1 - percentage) * color1[0] + percentage * color2[0], 
        (1 - percentage) * color1[1] + percentage * color2[1], 
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];

    color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

    return color3;
}

function int_to_hex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
}

var Tiki = function(sweetness, spiciness, stinkiness, prettiness){
	this.sweetness = sweetness;
	this.spiciness = spiciness;
	this.stinkiness = stinkiness;
	this.prettiness = prettiness;
}

Tiki.prototype.getDescription = function(){
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

function breedTikis(parent1, parent2, mutationChance){
	var sweetness = ((parent1.sweetness + parent2.sweetness) / 2) + (Math.random() * mutationChance);
	var spiciness = ((parent1.spiciness + parent2.spiciness) / 2) + (Math.random() * mutationChance);
	var stinkiness = ((parent1.stinkiness + parent2.stinkiness) / 2) + (Math.random() * mutationChance);
	var prettiness = ((parent1.prettiness + parent2.prettiness) / 2) + (Math.random() * mutationChance);

	return new Tiki(sweetness, spiciness, stinkiness, prettiness);
}