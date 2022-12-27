//Objeto juego 

var Instructions = Instructions || {};

//Crear clase Instructions
Instructions = {
	preload: function () {
		musicaBtn: '',
		juego.load.image('fondoIni', 'assets/instrucciones.png');
		juego.load.spritesheet('botonplay', 'assets/botones1.png', 180, 80);
		juego.load.audio('clicBtn', 'audio/ping.mp3');
		},
		
	create: function () {
		juego.add.sprite(0, 0, 'fondoIni');
		this.musicaBtn = juego.add.audio('clicBtn');
		juego.add.button(230, 120, 'botonplay', this.iniciar, this, 2, 1, 0);
		},

	iniciar: function () {
			this.musicaBtn.play();
			console.log('Inicia videojuego.');
			juego.state.start('Game');
			}
}