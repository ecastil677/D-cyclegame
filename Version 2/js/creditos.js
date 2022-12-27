//Objeto juego

var Creditos = Creditos || {};

//Crear clase Creditos
Creditos = {
	preload: function () {
		musicaBtn: '',
		juego.load.image('credi', 'assets/credit.png');
		juego.load.spritesheet('back', 'assets/back.png', 180, 80);
		juego.load.audio('clicBtn', 'audio/ping.mp3');
		},
	create: function () {
		var scoreTexto;
		this.musicaBtn = juego.add.audio('clicBtn');
		juego.add.sprite(0, 0, 'credi');
        juego.add.button(430, 450, 'back', this.iniciar, this, 2, 1, 0);

		},
		iniciar: function () {
			this.musicaBtn.play();
			console.log('Inicia boot.');
			juego.state.start('Boot');
		    }

}
