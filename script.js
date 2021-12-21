//Bola negra https://cdn-icons-png.flaticon.com/512/0/14.png

//Bola blanca https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Circle_-_black_simple_fullpage.svg/768px-Circle_-_black_simple_fullpage.svg.png

//Fons vermell https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Redsquare.png/600px-Redsquare.png

var tamany;

var tornNegre = true;

document.getElementById("jugar").addEventListener("click", function() {
	
	tamany = document.getElementById("tamany").value;

	document.getElementById("formStart").style.display = "none";

	document.getElementsByTagName("body")[0].style.background = "yellow";

	printarTablero();
	centrals();
	addCardListener();

})

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

	console.log(tornNegre);

	var imatge;

	//Comprovem que la casella estigui buida
	if(document.getElementById(id).style.backgroundImage == ""){

		if(tornNegre){
			imatge = "imatges/negra.png";
			tornNegre = false;
		}else{
			imatge = "imatges/blanca.png";
			tornNegre = true;
		}


		if(comprovarColocar(id,imatge)){
		
			document.getElementById(id).style.backgroundImage = "url("+imatge+")";
		
		}

	}

}

function comprovarColocar(id,imatge){

	//Agafem la posicio en la que hem clicat
	var posicio = id.split("-");

	var fil = parseInt(posicio[0]);

	var col = parseInt(posicio[1]);

	var potPosar = true;

	//console.log("Clic Usuari  url("+'"'+imatge+'"'+")");

	//console.log("Diagonal  "+(fil+1)+"-"+(col-1)+" "+document.getElementById((fil+1)+"-"+(col-1)).style.backgroundImage);



	console.log("ABANS return "+potPosar);

	return potPosar;	
}

