//Objeto juego 

var Boot = Boot || {};

//Crear clase Boot
Boot = {
	preload: function () {
		musicaBtn: '',
		juego.load.image('fondoIni', 'assets/menu.png');
		juego.load.spritesheet('botonplay', 'assets/botone222.png', 180, 80);
		juego.load.spritesheet('botoncredi', 'assets/botones2.png', 180, 80);
		juego.load.audio('musicaIni', 'audio/oedipus.mp3');
		juego.load.audio('clicBtn', 'audio/ping.mp3');
		},
	create: function () {
		juego.add.sprite(0, 0, 'fondoIni');
		this.musicaBtn = juego.add.audio('clicBtn');
		
		juego.add.button(10, 550, 'botonplay', this.iniciar, this, 2, 1, 0);
		juego.add.button(400, 550, 'botoncredi', this.creditos, this, 2, 1, 0);
		},

	iniciar: function () {
			this.musicaBtn.play();
			console.log('Inicia Instrucciones.');
			juego.state.start('Instructions');
			},
	creditos: function () {
			this.musicaBtn.play();
			console.log('Inicia creditos.');							
			juego.state.start('Creditos');	
			}
}