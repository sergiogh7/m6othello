//Bola negra https://cdn-icons-png.flaticon.com/512/0/14.png

//Bola blanca https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Circle_-_black_simple_fullpage.svg/768px-Circle_-_black_simple_fullpage.svg.png

//Fons vermell https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Redsquare.png/600px-Redsquare.png

var tamany;

var nom1;

var nom2;

var tornNegre = true;

document.getElementById("jugar").addEventListener("click", function() {
	
	nom1 = document.getElementById("jugador1").value;

	nom2 = document.getElementById("jugador2").value;	

	if(nom1 != "" && nom2 != ""){
		tamany = document.getElementById("tamany").value;

		document.getElementById("formStart").style.display = "none";

		document.getElementsByTagName("body")[0].style.background = "yellow";

		printarTablero();
		centrals();
		addCardListener();
	}

})

function mostrarEstat(){


	
}

function printarTablero(){

	console.log(tamany);

	var tablero = ""; 

	for (var f = 1; f <= tamany; f++) {

		tablero += "<br>";
		
		for (var c = 1; c <= tamany; c++) {
		
				tablero += "<div id="+f+"-"+c+"></div>";

		}

	}

	document.getElementsByTagName('body')[0].innerHTML = tablero;

}

function centrals(){

	console.log("Centrals "+ tamany);

	var blanca = "imatges/blanca.png";
	var negra = "imatges/negra.png";

	document.getElementById(tamany/2+'-'+tamany/2).style.backgroundImage = "url("+blanca+")";
	document.getElementById(tamany/2+'-'+((tamany/2)+1)).style.backgroundImage = "url("+negra+")";
	document.getElementById(((tamany/2)+1)+'-'+tamany/2).style.backgroundImage = "url("+negra+")";
	document.getElementById(((tamany/2)+1)+'-'+((tamany/2)+1)).style.backgroundImage = "url("+blanca+")";

}

function addCardListener(){	

	for (var f = 1; f <= tamany; f++) {
		for (var c = 1; c <= tamany; c++){
			
			document.getElementById(f+"-"+c).addEventListener("click", function(){clicarCela(this.id)});

		}
	}

}

function clicarCela (id){
	
	console.log("ID "+id);

	console.log("Torn "+tornNegre);

	var imatge;

	//Comprovem que la casella estigui buida
	if(document.getElementById(id).style.backgroundImage == ""){

		if(tornNegre){
			imatge = "imatges/negra.png";
		}else{
			imatge = "imatges/blanca.png";
		}


		if(comprovarColocar(id,imatge)){
		
			document.getElementById(id).style.backgroundImage = "url("+imatge+")";
			
			if(tornNegre){
				tornNegre = false;
			}else{
				tornNegre = true;
			}

		}

	}

}

function comprovarColocar(id,imatge){

	//Agafem la posicio en la que hem clicat
	var posicio = id.split("-");

	var filUser = parseInt(posicio[0]);

	var colUser = parseInt(posicio[1]);

	var moviments = [
		{
			'fil' : 0,
			'col' : -1
		},
		{
			'fil' : -1,
			'col' : -1
		},	
		{
			'fil' : -1,
			'col' : 0
		},
		{
			'fil' : -1,
			'col' : +1
		},
		{
			'fil' : 0,
			'col' : +1
		},
		{
			'fil' : +1,
			'col' : +1
		},
		{
			'fil' : +1,
			'col' : 0
		},
		{
			'fil' : +1,
			'col' : -1
		},					
	];

	var potPosar = false;

	for (var i = 0; i < moviments.length; i++) {
		//console.log(i + " " +document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage);
		try{
			if (!potPosar && document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage != "" && document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage != "url("+'"'+imatge+'"'+")") {
				potPosar = trobarFitxaIgual(moviments[i],filUser,colUser,imatge);
			}
		}catch(e){}

	}

	console.log(potPosar);

	if(!potPosar){
		alert("No pots colocar fitxa a "+ filUser +" - "+ colUser);
	}

	return potPosar;	
}

function trobarFitxaIgual(moviments,filUser,colUser,imatge){

	//console.log("Dins funcio trobarFitxaIgual "+moviments.col);

	var potPosar = false;

	while(!potPosar && document.getElementById((filUser+moviments.fil)+"-"+(colUser+moviments.col)).style.backgroundImage != ""){

		console.log("Fil "+moviments.fil);
		console.log("Col "+moviments.col);

		if(document.getElementById((filUser+moviments.fil)+"-"+(colUser+moviments.col)).style.backgroundImage != "url("+'"'+imatge+'"'+")"){
			potPosar = false;
		}else{
			potPosar = true;
		}

		if (moviments.fil != 0) {
			if(moviments.fil < 0){
				moviments.fil--;
			}else{
				moviments.fil++;
			}
		}

		if (moviments.col != 0) {
			if(moviments.col < 0){
				moviments.col--;
			}else{
				moviments.col++;
			}
		}

	}

	return potPosar;

}
