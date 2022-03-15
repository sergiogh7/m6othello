var tamany; // Tamaño del tablero.
var nom1; // Nombre jugador 1.
var nom2; // Nombre jugador 2.
var tornNegre = true; // Primer turno al iniciar, comenzando con el color negro.

// Evento de escucha del boton del formulario, cuando se hace click se ejecuta la funcion.
document.getElementById("jugar").addEventListener("click", function() {
	
	// Recoge en variables los nombres de los jugadores de los inputs del formulario.
	nom1 = document.getElementById("jugador1").value;
	nom2 = document.getElementById("jugador2").value;	

	// Se asegura de que los inputs tengan algo escrito.
	if(nom1 != "" && nom2 != ""){
		// Recoge el tamaño del tablero, del input del formulario.
		tamany = document.getElementById("tamany").value;

		// Desactiva el formulario.
		document.getElementById("formStart").style.display = "none";
		
		// Cambia el display del body para mostrar el tablero, sino saldria todo desordenado.
		document.getElementsByTagName("body")[0].style.display = "inline-block";

		// Llama a las funciones:
		printarTablero(); // Muestra el tablero.
		mostrarNombres();
		centrals(); // Coloca las fichas centrales.

		// Inicia los dos contadores de fichas de los jugadores por defecto --> 2 blancas, 2 negras.
		document.getElementById('puntosJugador1').innerHTML = "2 Negras";
		document.getElementById('puntosJugador2').innerHTML = "2 Blancas";

		addCardListener(); // Escucha de las celdas del tablero, para los movimientos.

	// Si solo escribe le nombre del jugador 1.	
	}else if(nom1 != "" && nom2 == ""){
		alert("Falta el jugador 2.");
	// Si solo escribe le nombre del jugador 2.
	}else if(nom1 == "" && nom2 != ""){
		alert("Falta el jugador 1.");
	}

})

// Funcion que printa el tablero.
function printarTablero(){

	var tablero = "<div id='estados'><div id='nombresYpuntos'><div id='puntosJugador1'></div><div id='puntosJugador2'></div></div><div id='turnos'><div id='colorJugando'>TURNO</div><div id='turnoColor'></div><div id='reiniciar' onclick='reiniciarJuego()'>REINICIAR<br>JUEGO</div></div></div><br>";
	
	// Recorre el tamaño asignado (que viene por parametro) para el tablero que va a ser mostrado.
	for (var f = 1; f <= tamany; f++) {

		for (var c = 1; c <= tamany; c++) {

			
			var idCelda = f+"-"+c; // ID de las celdas.

			tablero += "<div class='celdas' id="+idCelda+" '></div>";
			
			
		}
		tablero += "<br>";

	}

	// Inserta en la pagina el tablero.
	document.getElementsByTagName('body')[0].innerHTML = tablero;
	//document.getElementById('divTablero').innerHTML = tablero;

	var nombresYpuntos = document.getElementById("nombresYpuntos");
	var puntosJugador1 = document.getElementById("puntosJugador1");
	var puntosJugador2 = document.getElementById("puntosJugador2");

	console.log(nombresYpuntos);
	console.log(puntosJugador1);

	var divNom1 = document.createElement("div");
	var divNom2 = document.createElement("div");

	var textDivNom1 = document.createTextNode(nom1);
	var textDivNom2 = document.createTextNode(nom2);

	divNom1.appendChild(textDivNom1);
	divNom2.appendChild(textDivNom2);

	nombresYpuntos.insertBefore(divNom1,puntosJugador1);
	nombresYpuntos.insertBefore(divNom2,puntosJugador2);

	muestraEstados();

}

function mostrarNombres (){


}

// Funcion que pone fichas del color correspondiente en las celdas centrales del tablero.
function centrals(){

	var blanca = "imatges/blanca.png";
	var negra = "imatges/negra.png";

	document.getElementById(tamany/2+'-'+tamany/2).style.backgroundImage = "url("+blanca+")";
	document.getElementById(tamany/2+'-'+((tamany/2)+1)).style.backgroundImage = "url("+negra+")";
	document.getElementById(((tamany/2)+1)+'-'+tamany/2).style.backgroundImage = "url("+negra+")";
	document.getElementById(((tamany/2)+1)+'-'+((tamany/2)+1)).style.backgroundImage = "url("+blanca+")";

}

// Escucha de las celdas del tablero.
function addCardListener(){	
	// Recorre el tablero.
	for (var f = 1; f <= tamany; f++) {
		for (var c = 1; c <= tamany; c++){
			// Coge la posicion de la celda, escucha si hay un click y llama a la funcion de comprobacion.
			document.getElementById(f+"-"+c).addEventListener("click", function(){clicarCela(this.id)});
			// Efectos de la celda cuando pasa el raton por encima.
			document.getElementById(f+"-"+c).addEventListener("mouseover", function(){celdafx(this.id)}); 
			document.getElementById(f+"-"+c).addEventListener("mouseout", function(){celdafx2(this.id)}); celdafx

		}
	}
}

// Cuando clicka.
function clicarCela (id){

	var imatge;

	//Comprovem que la casella estigui buida
	if(document.getElementById(id).style.backgroundImage == ""){

		// Depende turno, coloca la ficha de un color u otro.
		if(tornNegre){
			imatge = "imatges/negra.png";
		}else{
			imatge = "imatges/blanca.png";
		}

		// Si no entra al turno anterior comprueba el correcto.
		if(comprovarColocar(id,imatge)){
		
			document.getElementById(id).style.backgroundImage = "url("+imatge+")";

			if(comprobarSiguienteMovimiento(imatge)){
				
				if(tornNegre){
					
					tornNegre = false;
					muestraEstados();
					contadorColoresFichas();
				}else{
					
					tornNegre = true;
					muestraEstados();
					contadorColoresFichas();
				}

			}else{
				if(tornNegre){
					console.log("no cambio, toca torn negre");

				}else{
					console.log("no cambio, toca torn blanc");
					
				}

			}
			
		}

	}

}

// Comprueba el siguiente movimiento.
function comprobarSiguienteMovimiento(imatge){

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

	// Recoge todos los divs del tablero.
	var tablero = document.getElementsByTagName('div');

	// Recorre el tablero.
	for(let o=0; o < tablero.length; o++){

		// Recorre todos los movimientos alrededor de la ficha.
		for(let i=0; i < moviments.length; i++){

			//Agafem la posicio en la que hem clicat, separa en array de 2 posiciones.
			var posicio = tablero[o].id.split("-");

			// Primera posicion del array --> fila.
			var filUser = parseInt(posicio[0]);

			// Segunda posicion del array--> columna.
			var colUser = parseInt(posicio[1]);

			try{
				if (document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage != "" 
					&& document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage == "url("+'"'+imatge+'"'+")") {

					// Verifica si se puede colocar la ficha...
					if( trobarFitxaIgual2(moviments[i],filUser,colUser,imatge) ){
						return true;
					}				
				}
			}catch(e){}
		}
	}
	return false;
}

// Funcion que comprueba si puede colocar la ficha.
function comprovarColocar(id,imatge){
	//Agafem la posicio en la que hem clicat, separa en array de 2 posiciones.
	var posicio = id.split("-");

	// Primera posicion del array --> fila.
	var filUser = parseInt(posicio[0]);
	// Segunda posicion del array --> columna.
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

	// Indica si puede colocar la ficha.
	var potPosar = false;
	// Array donde guarda las posiciones de las fichas a cambiar.
	var posicionesFichasCambiar = [];

	// Recorre el array de movimientos.
	for (var i = 0; i < moviments.length; i++) {
		// Mira si al lado de la ficha a colocar hay una ficha del mismo color o si hay un hueco vacio. --> llama a trobaFitxa().
		try{
			if (document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage != "" 
				&& document.getElementById((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col)).style.backgroundImage != "url("+'"'+imatge+'"'+")") {
				potPosar = trobarFitxaIgual(moviments[i],filUser,colUser,imatge);

				if(potPosar){
					posicionesFichasCambiar.push((filUser+moviments[i].fil)+"-"+(colUser+moviments[i].col));
				}				
			}
		}catch(e){}
	}

	if(posicionesFichasCambiar.length > 0){
		potPosar = true;
	}

	if(!potPosar){
		alert("No pots colocar fitxa a la fila "+ filUser +" - columna "+ colUser);
	}

	return potPosar;	
}

// Funcion que busca en una direccion si el movimiento el posible.
function trobarFitxaIgual(moviments,filUser,colUser,imatge){
	// Indica si puede colocar la ficha.
	var potPosar = false;
	// posiciones de la fichas a cambiar.
	var fichasCambiar = [];

	// Mientras pueda colocar ficha y en las posiciones no haya un hueco vacio.
	while(!potPosar && document.getElementById((filUser+moviments.fil)+"-"+(colUser+moviments.col)).style.backgroundImage != ""){

		// Guarda las posiciones.
		fichasCambiar.push((filUser+moviments.fil)+"-"+(colUser+moviments.col));

		// Comprueba si las imagenes son las mismas y decide si se puede o no.
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

	// Si puede colocar las fichas, las cambia llamando a la funcion.
	if(potPosar){
		cambiarColorFichas(fichasCambiar, imatge);
	}

	return potPosar;

}

// Cambia el color de las fichas.
function cambiarColorFichas(fichasCambiar, imatge){

	// Recibe las posiciones en array y las cambia.
	for (let i = 0; i < fichasCambiar.length; i++) {
		document.getElementById(fichasCambiar[i]).style.backgroundImage = "url("+imatge+")";
		
	}
}

// Funcion que hace lo mismo que trobarFitxaIgual pero sin sustituir fichas. --> Retorna un boolean.
// Esto es para detectar psoibles movimientos.
function trobarFitxaIgual2(moviments,filUser,colUser,imatge){

	var potPosar = false;

	while(!potPosar && document.getElementById((filUser+moviments.fil)+"-"+(colUser+moviments.col)).style.backgroundImage != ""){

		if(document.getElementById((filUser+moviments.fil)+"-"+(colUser+moviments.col)).style.backgroundImage == ""){
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

// Funcion que muestra por pantalla los estados del juego.
function muestraEstados(){

	if(tornNegre){
		document.getElementById('turnoColor').innerHTML = "Negro";
	}else{
		document.getElementById('turnoColor').innerHTML = "Blanco";
	}
	
	
}

// Funcion que cuenta las fichas negras y blancas en juego.
function contadorColoresFichas(){

	// Imagenes de las fichas blancas y negas.
	var blanca = "imatges/blanca.png";
	var negra = "imatges/negra.png";

	var tamanyAmpliado = tamany * tamany; // Numero total de celdas del tablero.
	
	var numeroFichasNegras = 0; // Para guardar el numero de fichas negras en juego.
	var numeroFichasBlancas = 0; // Para guardar el numero de fichas blancas en juego.

	var fichasTotales;

	// Crea una coleccion de divs que tienen el tag 'celdas'.
	var celdasTablero = document.getElementsByClassName('celdas');

	// Rellena un array con las posiciones de todo el tablero.
	for(let t=0; t < tamanyAmpliado; t++){

			// Recoge la posicion de la celda de la coleccion de divs, que es la ID (Ejemplo: 2-5 --> fila 2 - columna 5.)
			var posicionCelda = celdasTablero.item(t).id;
			
			// Comprueba si el background es de una ficha blanca o negra.
			if(document.getElementById(posicionCelda).style.backgroundImage == "url("+'"'+blanca+'"'+")"){
				// Suma 1 al contador sea el numero de veces que entra aqui.
				numeroFichasBlancas++;
				// Inserta en los divs a traves de la id, el numero de fichas.
				document.getElementById('puntosJugador2').innerHTML = numeroFichasBlancas + " Blancas";

			}else if(document.getElementById(posicionCelda).style.backgroundImage == "url("+'"'+negra+'"'+")"){
				// Suma 1 al contador sea el numero de veces que entra aqui.
				numeroFichasNegras++;
				// Inserta en los divs a traves de la id, el numero de fichas.
				document.getElementById('puntosJugador1').innerHTML = numeroFichasNegras + " Negras";
				
			}
	}

	// En caso de que solo haya fichas blancas
	if(numeroFichasBlancas > 0 && numeroFichasNegras == 0){
		confirm("Enhorabuena " +nom2+ "! \nFichas negras: " + numeroFichasNegras + ". \nFichas blancas:" + numeroFichasBlancas + ".");

	// O fichas negras.
	}else if(numeroFichasNegras > 0 && numeroFichasBlancas == 0){
		confirm("Enhorabuena " +nom1+ "! \nFichas negras: " + numeroFichasNegras + ". \nFichas blancas:" + numeroFichasBlancas + ".");
	
	}

	fichasTotales = numeroFichasBlancas + numeroFichasNegras;

	// Detector del final de juego.
	if(fichasTotales == tamanyAmpliado){
		
		if(numeroFichasBlancas > numeroFichasNegras){
			confirm("Enhorabuena " +nom2+ "! \nFichas negras: " + numeroFichasNegras + ". \nFichas blancas:" + numeroFichasBlancas + ".");

		}else if(numeroFichasBlancas < numeroFichasNegras){
			confirm("Enhorabuena " +nom1+ "! \nFichas negras: " + numeroFichasNegras + ". \nFichas blancas:" + numeroFichasBlancas + ".");

		}else{
			confirm("Empate!");
		}

		reiniciarJuego();
	}
}

// Funcion que reincia el juego por completo.
function reiniciarJuego(){

	var reinicio = document.getElementById('reiniciar').id;
	
	if(reinicio == "reiniciar"){
		location.reload();
	}
}

// Funcion que añade un efecto rojo a la celda si el raton esta encima de ella.
function celdafx(id){
	document.getElementById(id).style.backgroundColor = "#b30000";

}

// Igual que la funcion anterior, solo que vuelve a poner la celda del color original una vez sale el raton.
function celdafx2(id){
	document.getElementById(id).style.backgroundColor = "#edb78e";
}