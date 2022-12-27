//Objeto juego
//Variables
var basuras, contador = 0, intervalo, tachos, cubo, cubo_paper, cubo_org, cubo_plast, cubo_vid, cubo_trash;
var basura_0, basura_1, basura_2, basura_3, basura_4, b_correcta, t_correcta;
var score = 0, scoreTexto, conta_trash = 50, trashTexto;
var org,plast,vid,paper,trash;
var refreshIntervalId;

var Game = Game|| {};
//Crear clase Game
Game = {

    preload: function () {
        //Importar los assets de las basuras
        juego.load.image('pera', 'assets/primeros objetos/pera.png');
        juego.load.image('botella de vidrio', 'assets/primeros objetos/botellavid.png');
        juego.load.image('lata', 'assets/primeros objetos/lata.png');
        juego.load.image('bonus', 'assets/primeros objetos/reci.png');
        juego.load.image('botella1', 'assets/primeros objetos/botellita.png');
        juego.load.image('botella2', 'assets/primeros objetos/botellita5.png');
        juego.load.image('cafe', 'assets/primeros objetos/cafe.png');
        juego.load.image('apple', 'assets/primeros objetos/manzani.png');
        juego.load.image('plastico', 'assets/primeros objetos/redsolocup.png');
        juego.load.image('botella3', 'assets/primeros objetos/botella1.png');
        juego.load.image('naranja', 'assets/primeros objetos/peel11.png');
        juego.load.image('apple2', 'assets/primeros objetos/manzanita.png');
        juego.load.image('banana', 'assets/primeros objetos/guineo.png');
        juego.load.image('lata2', 'assets/primeros objetos/lata2.png');
        juego.load.image('leche', 'assets/primeros objetos/leche.png');
        juego.load.image('periodico', 'assets/primeros objetos/periodico.png');
        juego.load.image('periodico1', 'assets/primeros objetos/periodico22.png');
        juego.load.image('perita', 'assets/primeros objetos/perita.png');
        juego.load.image('pescado', 'assets/primeros objetos/pescado.png');
        juego.load.image('galleta', 'assets/primeros objetos/galleta.png');
        juego.load.image('papel1', 'assets/primeros objetos/papel1.png');
        juego.load.image('papel2', 'assets/primeros objetos/papel2.png');
        juego.load.image('plastico1', 'assets/primeros objetos/plastico1.png');
        //Tachos de basura y el fondo
     	  juego.load.image('tacho1', 'assets/primeros objetos/tacho/tachoazul.png');
     	  juego.load.image('tacho2', 'assets/primeros objetos/tacho/tachonaranja.png');
    	  juego.load.image('tacho3', 'assets/primeros objetos/tacho/tachoverde.png');
      	juego.load.image('tacho4', 'assets/primeros objetos/tacho/tachoamarillo.png');
    	  juego.load.image('tacho5', 'assets/primeros objetos/tacho/tachogris.png');
        juego.load.image('sky', 'assets/primeros objetos/parque.png');
        juego.load.image('cubo', 'assets/primeros objetos/tacho/cubo.png');
        juego.load.image('cubo_largo', 'assets/primeros objetos/tacho/cubo_largo.png');
        //Sonidos
        juego.load.audio('bien', 'audio/ping.mp3');
        juego.load.audio('mal', 'audio/menu_select.mp3');
		},
	create: function () {
        //Contador de basura inica en 50
        conta_trash = 50;
        //El score inica en 0
        score = 0;
        //Sonidos
        this.musicabien = juego.add.audio('bien');
        this.musicamal = juego.add.audio('mal');

        //Habilitar la física Arcade
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        //Fondo de Pantalla básico
        juego.add.sprite(0,0,'sky');

        //Grupo y física de los tachos
        tachos = juego.add.group();
        tachos.enableBody = true;
        /*Las colosiones son con los cubos invisibles, aquí se crean
        los grupos que permiten su clasificación (papel, vidrio, orgánico, plástico, basura)*/
        cubo_paper = juego.add.group();
        cubo_paper.enableBody = true;
        cubo_org = juego.add.group();
        cubo_org.enableBody = true;
        cubo_plast = juego.add.group();
        cubo_plast.enableBody = true;
        cubo_vid = juego.add.group();
        cubo_vid.enableBody = true;
        cubo_trash = juego.add.group();
        cubo_trash.enableBody = true;

        //Creación de cada tacho del grupo Tachos (cubos, los objetos de colisión)
        cpaper = cubo_paper.create(100,440,'cubo');
        cpaper.visible = false;
        var tacho_paper = tachos.create(-100,365,'tacho1');
        tacho_paper.angle += 0;
        tacho_paper.body.immovable = true;

        corg = cubo_org.create(510,440,'cubo');
        corg.visible = false;
        var tacho_org = tachos.create(420,365,'tacho2');
        tacho_org.angle += 0;
        tacho_org.body.immovable = true;

        cvid= cubo_vid.create(510,190,'cubo');
        cvid.visible = false;
        var tacho_vid = tachos.create(420,115,'tacho3');
        tacho_vid.angle += 0;
        tacho_vid.body.immovable = true;

        cplast = cubo_plast.create(110,190,'cubo');
        cplast.visible = false;
        var tacho_plast = tachos.create(-90,100,'tacho4');
        tacho_plast.angle += 0;
        tacho_plast.body.immovable = true;

        ctrash = cubo_trash.create(192,560,'cubo_largo');
        ctrash.visible = false;
        var tacho_trash = tachos.create(113,450,'tacho5');
        tacho_trash.body.immovable = true;

        //Grupo basuras, permite clasificar los elementos de misma categoría de reciclaje
        basura_0 = juego.add.group();
        basura_1 = juego.add.group();
        basura_2 = juego.add.group();
        basura_3 = juego.add.group();
        basura_4 = juego.add.group();

        //Habilitar físicas para los grupos de basuras
        basura_0.enableBody = true;
        basura_1.enableBody = true;
        basura_2.enableBody = true;
        basura_3.enableBody = true;
        basura_4.enableBody = true;

        //Método que llama a la función que crea un elemento de basura cada segundo
        refreshIntervalId = setInterval(this.generar_basura, 1000);
        //Colocación del texto de Score y del contador de basura faltante
        scoreTexto = juego.add.text(10,10,'Score: 0',{frontSize: '32px', fill: '#00A00A'});
        trashTexto = juego.add.text(10,50,'Trash: 50',{frontSize: '32px', fill: '#A21802'});
      },
    update: function() {
        //Índice 0: plástico, 1: vidrio, 2: papel, 3: orgánico, 4: basura sin clasificar

        /*Se chequea si hay overlap de los grupos de basuras con sus tachos correspondiente,
        en tal caso se llama a la funció reciclar (se suman puntos), de otro modo se llama
        a una función que le indica que la basura no se clasificó correctamente (función chocar)*/

        //Se revisa el overlap de las basuras en el tacho corecto
        juego.physics.arcade.overlap(basura_0, cubo_plast, this.reciclar, null, this);
        juego.physics.arcade.overlap(basura_1, cubo_vid, this.reciclar, null, this);
        juego.physics.arcade.overlap(basura_2, cubo_paper, this.reciclar, null, this);
        juego.physics.arcade.overlap(basura_3, cubo_org, this.reciclar, null, this);
        juego.physics.arcade.overlap(basura_4, cubo_trash, this.reciclar, null, this);
        //basura_0 overlap con los demás
        juego.physics.arcade.overlap(basura_0, cubo_vid, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_0, cubo_paper, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_0, cubo_org, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_0, cubo_trash, this.chocar, null, this);
        //basura_1 overlap con los demás
        juego.physics.arcade.overlap(basura_1, cubo_plast, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_1, cubo_paper, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_1, cubo_org, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_1, cubo_trash, this.chocar, null, this);
        //basura_2 overlap con los demás
        juego.physics.arcade.overlap(basura_2, cubo_vid, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_2, cubo_plast, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_2, cubo_org, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_2, cubo_trash, this.chocar, null, this);
        //basura_3 overlap con los demás
        juego.physics.arcade.overlap(basura_3, cubo_vid, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_3, cubo_paper, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_3, cubo_plast, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_3, cubo_trash, this.chocar, null, this);
        //basura_4 overlap con los demás
        juego.physics.arcade.overlap(basura_4, cubo_vid, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_4, cubo_paper, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_4, cubo_plast, this.chocar, null, this);
        juego.physics.arcade.overlap(basura_4, cubo_plast, this.chocar, null, this);
    },

    //Función que crea la basura
    generar_basura: function()
    {
      //x,y son las coordenadas de la basura
      //indice indica qué elemento de basura se creará
      var x, y, indice;
      y = 0;
      //Para crear un elemento random de basura se genera un índice random de un rango de 1-25
      indice = Math.round((Math.random()*25)+1);
      //Para que la posición de un elemento sea random pero dentro del rango 160-410
      x = Math.round((Math.random()*250)+122);

      switch (indice)
      {
       case 1:
          /*Se crea el elemento basura con respecto a su grupo correspondiente
          y se habilitan sus propiedades (estas eran habilitadas en una función
          que era llamada, pero al importar el juego al menú, este llamado dejó de funcionar :,( )*/
          org = basura_3.create(x,y,'pera');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 2:
          vid = basura_1.create(x,y,'botella de vidrio');
          vid.body.gravity.y = 70;
          vid.inputEnabled = true;
          vid.input.enableDrag(true);
       break;
       case 3:
          trash = basura_4.create(x,y,'lata');
          trash.body.gravity.y = 70;
          trash.inputEnabled = true;
          trash.input.enableDrag(true);
       break;
       case 4:
          //basura[] = basuras.create(x,y,'bonus');
       break;
       case 5:
          plast = basura_0.create(x,y,'botella1');
          plast.body.gravity.y = 70;
          plast.inputEnabled = true;
          plast.input.enableDrag(true);
       break;
       case 6:
          plast = basura_0.create(x,y,'botella2');
          plast.body.gravity.y = 70;
          plast.inputEnabled = true;
          plast.input.enableDrag(true);
       break;
       case 7:
          trash = basura_4.create(x,y,'cafe');
          trash.body.gravity.y = 70;
          trash.inputEnabled = true;
          trash.input.enableDrag(true);
       break;
       case 8:
          org = basura_3.create(x,y,'apple');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 9:
          plast = basura_0.create(x,y,'plastico');
          plast.body.gravity.y = 70;
          plast.inputEnabled = true;
          plast.input.enableDrag(true);
       break;
       case 10:
          vid = basura_1.create(x,y,'botella3');
          vid.body.gravity.y = 70;
          vid.inputEnabled = true;
          vid.input.enableDrag(true);
       break;
       case 11:
          org = basura_3.create(x,y,'naranja');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 12:
          org = basura_3.create(x,y,'apple2');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 13:
          org = basura_3.create(x,y,'banana');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 15:
          trash = basura_4.create(x,y,'lata2');
          trash.body.gravity.y = 70;
          trash.inputEnabled = true;
          trash.input.enableDrag(true);
       break;
       case 16:
          paper = basura_2.create(x,y,'leche');
          paper.body.gravity.y = 70;
          paper.inputEnabled = true;
          paper.input.enableDrag(true);
       break;
       case 17:
          paper = basura_2.create(x,y,'periodico');
          paper.body.gravity.y = 70;
          paper.inputEnabled = true;
          paper.input.enableDrag(true);
       break;
       case 18:
          paper = basura_2.create(x,y,'periodico1');
          paper.body.gravity.y = 70;
          paper.inputEnabled = true;
          paper.input.enableDrag(true);
       break;
       case 19:
          org = basura_3.create(x,y,'perita');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       case 20:
          org = basura_3.create(x,y,'pescado');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
          case 21:
          paper = basura_2.create(x,y,'papel1');
          paper.body.gravity.y = 70;
          paper.inputEnabled = true;
          paper.input.enableDrag(true);
       break;
       case 22:
          paper = basura_2.create(x,y,'papel2');
          paper.body.gravity.y = 70;
          paper.inputEnabled = true;
          paper.input.enableDrag(true);
       break;
       case 23:
          plast = basura_0.create(x,y,'botella2');
          plast.body.gravity.y = 70;
          plast.inputEnabled = true;
          plast.input.enableDrag(true);
       break;
       case 24:
          org = basura_3.create(x,y,'galleta');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
       break;
       default:
          org = basura_3.create(x,y,'pera');
          org.body.gravity.y = 70;
          org.inputEnabled = true;
          org.input.enableDrag(true);
      }
      //Cuando conta_trash sea 0 el juego terminará
      if (this.conta_trash <= 0)
      {
        console.log('Inicia GameOver.');//Se pasa a otra escena al acabar el juego
        juego.state.start('GameOver',true,false,score);
        clearInterval(refreshIntervalId);//Se destruye al setInterval que crea la basura
      }
    },

    //Si la basura se metió en el tacho correcto se llama a esta función
    reciclar: function(basura, cubo)//basura: grupo del elemento; cubo: el tacho con el que hubo overlap
    {
      this.musicabien.play();//Se reproduce un sonido que indica que se clasificó correctamente
      conta_trash--;//El contador de basura disminuye
      trashTexto.text = 'Trash: ' + conta_trash;//Se actualiza el texto de la basura faltante
      basura.kill();//Se elimina el elemento de basura
      score += 50;//Se dan puntos al Score
      scoreTexto.text = 'Score: ' + score; //Se actualiza el texto del Score
    },

    //Si la basura se metió en un tacho incorrecto se llama a esta función
    chocar: function(basura, cubo) //basura: grupo del elemento; cubo: el tacho con el que hubo overlap
    {
      this.musicamal.play();//Se reproduce un sonido que indica que se clasificó incorrectamente
      conta_trash--; //El contador de basura disminuye
      trashTexto.text = 'Trash: ' + conta_trash;//Se actualiza el texto de la basura faltante
      basura.kill();//Se elimina el elemento de basura
      popUpIncorrecto = juego.add.text(250,580,'WRONG!',{frontSize: '32px', fill: '#A21802'});//Se muestra "WRONG!"
      setInterval(this.matarPopUpI,1000);//Se llama a la función que mata al texto "WRONG!"
    },

    matarPopUpI: function()//Función que elimina los textos de WRONG!
    {
      popUpIncorrecto.kill();
    }
}
