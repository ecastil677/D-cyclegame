//Objeto juego 

var Music = Music || {};

//Crear clase Music
Music = {
	preload: function () {
		juego.load.audio('musica', 'audio/reciclaje.mp3');
		},
	create: function () {
		var musica = juego.add.audio('musica');
		musica.play();
        },
    update: function(){
		console.log('Inicia Boot.');
        juego.state.start('Boot');

    }
}