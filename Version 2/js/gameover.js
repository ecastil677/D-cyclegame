//Objeto juego 

var GameOver = GameOver || {};

//Crear clase GameOver
GameOver = {
	preload: function () {
		musicaBtn: '',
        juego.load.image('sky', 'assets/primeros objetos/parque.png');
		juego.load.spritesheet('back', 'assets/back.png', 180, 80);
		juego.load.audio('clicBtn', 'audio/ping.mp3');
		},
	create: function () {
		juego.add.sprite(0, 0, 'sky');
		this.musicaBtn = juego.add.audio('clicBtn');
		
		juego.add.button(220, 500, 'back', this.iniciar, this, 2, 1, 0);
		scoreTexto = juego.add.text(210,200,' ',{frontSize: '32px', fill: '#00A00A'});
		scoreTexto.text = 'Final Score: ' + score;
		},

	iniciar: function () {
			this.musicaBtn.play();
			console.log('Inicia Boot.');
			juego.state.start('Boot');
			}
}