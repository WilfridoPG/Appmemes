//Escucha la orientacion de la pantalla movil
/*window.addEventListener("orientationchange", function() {
	 // alert(window.orientation); 
	location.reload(true);
}, false);
*/
var canvas = new fabric.Canvas('canvas');
f = fabric.Image.filters;

/*canvas.setDimensions({
    width: $(".panel-body").width(),
    height:$(".panel-body").height(),
  });*/ 

//console.log("ancho:"+ancho+" alto:"+alto);
canvas.setDimensions({
    width:$("#contenedor").width(),
    height:$("#contenedor").height()
  });
//console.log("ancho: "+screen.width +" largo: "+screen.height);
////////////////////////////REVISION /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //var canvas = new fabric.Canvas('canvas');
fabric.Object.prototype.transparentCorners = false;
canvas.backgroundColor = 'rgba(255,255,255, 1)';
var fondo,fbandera=0;

$("#editarfondo").prop('disabled', true);
  //descargar meme

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

 
	// cargar imagen de fondo 
document.getElementById('file-5').addEventListener("change", function (e) {
  var file = e.target.files[0];
	var reader = new FileReader();
 	reader.onload = function (event) {
    var img = new Image();
   	img.onload = function (){ 
	    var f_img = new fabric.Image(img,{left: 0,top: 0,width:canvas.width,height:canvas.height,/*angle: 30,opacity: 0.85*/});
      canvas.setBackgroundImage(f_img);
      canvas.renderAll();
   	}
   	img.src = event.target.result;
    GenerarMeme(img.src);
  }
	reader.readAsDataURL(file);
});
	// cargar imagen sobre el fondo 
document.getElementById('file-6').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result; 
   	fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({left: 10, top: 100, angle: 00,width:300, height:200,cornerStyle: 'circle',cornerSize: 20,}).scale(0.9);
      canvas.add(oImg).renderAll();
     	//canvas.setActiveObject(oImg);
     	//canvas.toDataURL({format: 'png', quality: 0.8});
   	});
    //GenerarMeme(data.src);
 	};
  reader.readAsDataURL(file);
});
	//Agrupar elementos	
$("#agrupar").on('click', function() {
  if (canvas.getActiveGroup()) {
    var activegroup = canvas.getActiveGroup();
    var objectsInGroup = activegroup.getObjects();
    activegroup.clone(function(newgroup) {
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
		    canvas.remove(object);  
	    });
      canvas.add(newgroup);  
    });
  }else{
    navigator.notification.alert("Para agrupar, seleccione dos o más elementos, haga doble clic y arrastre sobre los elementos. ", alertCallback, "Agrupar", "Aceptar");
      function alertCallback() {
      console.log("Alert is Dismissed!");
      }  
    }
    //alert("Por favor seleccione dos o más elementos");
});
	// Desagrupar Elementos	
$("#desagrupar").click(function(){
  var activeObject = canvas.getActiveObject();
  if(canvas.getActiveObject() && activeObject.type=="group"){  	
    var items = activeObject._objects;
    activeObject._restoreObjectsState();
    canvas.remove(activeObject);
    for(var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size()-1).hasControls = true;
    }
    canvas.renderAll();    
  }else
  {
    navigator.notification.alert("Selecione un elemento agrupado.", alertCallback, "Desagrupar", "Aceptar");
      function alertCallback() {
      console.log("Alert is Dismissed!");
      } 
  } // alert("Por favor seleccione elemento agrupado");
});
	// Funcion para eliminar elementos 
$('#remove').click(function(){
  var activeObject = canvas.getActiveObject(),
  activeGroup = canvas.getActiveGroup();
  if (activeObject) {
    canvas.remove(activeObject);
  }
  else if (activeGroup) {
    var objectsInGroup = activeGroup.getObjects();
    canvas.discardActiveGroup();
    objectsInGroup.forEach(function(object) {
      canvas.remove(object);
    });               
  }else{
      navigator.notification.alert("Seleccione un elemento o grupo de elementos.", alertCallback, "Eliminar", "Aceptar");
      function alertCallback() {
      console.log("Alert is Dismissed!");   
      }  
   }   
		//alert('Por favor seleccione elemento o grupo de elementos');
		//return '';
	
});
 //mandar imagen al servidor

$(".compartir").click(function(){
  $('#notific').html(" <div class='alert alert-success '  id='success-alert'><button type='button' class='close' data-dismiss='alert'>x</button><strong>Espere un momento... </strong>Se está generando el meme.</div>");
    $("#success-alert").fadeTo(5000, 1000).slideUp(1000, function(){
    $("#success-alert").slideUp(1000);
    });
    joomlaForm = document.getElementById('joomlaForm');
    joomlaForm.image.value = canvas.toDataURL();
    joomlaForm.submit();
});
/*$("#link").click(function(){
	window.plugins.socialsharing.share(null, null, null, linkservidor);
  //$("#link").hide();
});	*/
//$(window).trigger("orientationchange");

	//Generar el meme
fondos=document.getElementById("image").src; 
//GenerarMeme(fondos);

	//Volver los fondos a tamaño pequeño 
  

//agregrar personajes

	//Funcion para generar el meme de fondo
function GenerarMeme(fondos){
  $("#editarfondo").prop('disabled', false);
  fbandera=1;
	ObjetoImagen = new Image();
  //imgObj.src = url + '?' + new Date().getTime();
  ObjetoImagen.crossOrigin = 'anonymous'; 
  ObjetoImagen.onerror = function() { console.log("cross-origin image load error"); }
  ObjetoImagen.src = fondos;
  original.src=  ObjetoImagen.src; 
	filtro.src=  ObjetoImagen.src;
  filtro1.src=  ObjetoImagen.src;
  filtro2.src=  ObjetoImagen.src;
  filtro3.src=  ObjetoImagen.src;
        //filtro4.src=document.getElementById("image").src;
 	ObjetoImagen.onload = function(){
    var f_img = new fabric.Image.fromURL(ObjetoImagen.src, function( ObjetoImagen ){                
      ObjetoImagen.width = canvas.width;
      ObjetoImagen.height = canvas.height;
      canvas.setBackgroundImage(ObjetoImagen);
      canvas.renderAll();
      function removefilter(){
        ObjetoImagen.filters = []; 
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      }
      $('#original').click(function(){
        removefilter();
      });
      $('#filtro').click(function(){      
        removefilter();
        ObjetoImagen.filters.push(new fabric.Image.filters.Grayscale());
        // apply filters and re-render canvas when done
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#filtro1').click(function(){
        removefilter();
        ObjetoImagen.filters.push(new fabric.Image.filters.Invert());
       // apply filters and re-render canvas when done
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas)); 
      });
      $('#filtro2').click(function(){
        removefilter();
        ObjetoImagen.filters.push(new fabric.Image.filters.Sepia2());
        // apply filters and re-render canvas when done
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#filtro3').click(function(){
        removefilter();
        ObjetoImagen.filters.push(new fabric.Image.filters.Convolute({
        matrix:[ 1/9, 1/9, 1/9,
               1/9, 1/9, 1/9,
                1/9, 1/9, 1/9 ]
        }));
        // apply filters and re-render canvas when done
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('.brightness').on('click', function() {
          //var obj = canvas.getActiveObject();
        ObjetoImagen.filters[5] = new f.Brightness({brightness: parseInt($('#brightness-value').val(),10)});
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#brightness-value').on('change', function() {
        //var obj = canvas.getActiveObject();
        ObjetoImagen.filters[5]['brightness'] = parseInt($(this).val(),10);
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas)); 
      });                
      $('#gradient-transparency').on('click', function() {
        ObjetoImagen.filters[7] = new f.GradientTransparency({threshold: parseInt($('#gradient-transparency-value').val(),10)});
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#gradient-transparency-value').on('change', function() {
        ObjetoImagen.filters[7]['threshold'] = parseInt($(this).val(),10);
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas)); 
      }); 
      $('#pixelate').on('click', function() {
        ObjetoImagen.filters[8]= new f.Pixelate({ blocksize:parseInt($('#pixelate-value').val(),10)});
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#pixelate-value').on('change', function() {
        ObjetoImagen.filters[8]['blocksize']=parseInt($(this).val(),10);
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });
      $('#tint').on('click', function() {
        ObjetoImagen.filters[12] = new f.Tint({opacity: parseFloat($('#tint-opacity').val())});
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));                   
       //ObjetoImagen.filters[7] = new f.Saturation({saturation: parseFloat($('#tint-opacity').val())});
        //ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));                    
      });
      $('#tint-opacity').on('change', function() {                  
        ObjetoImagen.filters[12]['opacity']=parseFloat($(this).val());
        //ObjetoImagen.filters[7]['saturation']=parseFloat($(this).val());
       //applyFilterValue(6, 'contrast', parseFloat(this.value));
        ObjetoImagen.applyFilters(canvas.renderAll.bind(canvas));
      });              
    });
	};
	fondo = ObjetoImagen.src;
		
};
	//Agregar Personaje
	//Agregar Globos
function AgregarGlobos(){	
  var textglobo = document.getElementById('textoglobo').value;
  var cantidad;
  if (textglobo) {
    var valor= $('input:radio[name=optradio]:checked').val();
    //console.log(valor);
    if (valor=="1") {
      cantidad=canvas.width-100;
         //alert(canvas.height);
    }else  
    cantidad=10;
		var ObjetoImagen = new Image();
		ObjetoImagen.onload = function(){	
		  var f_img = new fabric.Image(ObjetoImagen);
		  canvas.add(f_img.set({ left:cantidad, top:100, angle:0, cornerStyle: 'circle',cornerSize: 20, }).scale(0.15));  
		  var iText7 = new fabric.Text(textglobo, {
 		    padding:0,
		    fontSize:f_img.getBoundingRectHeight() /8,
		    left:cantidad,
		    cornerStyle: 'circle',
        cornerSize: 20,
  		  top:100
		  });
		  canvas.add(iText7);
		};
    if (conexionlocal==1) {
      ObjetoImagen.src =document.getElementById("image").src; 

    }else{
      toDataURL(document.getElementById("image").src)
  .then(dataUrl => {
    //console.log('RESULT:', dataUrl)
     ObjetoImagen.src = dataUrl; 
  })
}

    //ObjetoImagen.src = document.getElementById("image").src; 
    //document.getElementById('text-cont').value=document.getElementById('textoglobo').value;
  }
  document.getElementById('textoglobo').value="";
}

	// Configuracion de texto
document.getElementById('font-family').onchange = function() {
  canvas.getActiveObject().setFontFamily(this.value);
  canvas.renderAll();
};      
        //console.log(JSON.stringify(canvas.toDatalessJSON()));
$('#izquierda').click(function(){
  canvas.getActiveObject().setTextAlign('left');
  canvas.renderAll();
});
$('#centrar').click(function(){
  canvas.getActiveObject().setTextAlign('center');
  canvas.renderAll();
});
$('#derecha').click(function(){
  canvas.getActiveObject().setTextAlign('right');
  canvas.renderAll();
});
$('.colort').click(function(){
  canvas.getActiveObject().setFill(this.value);
  canvas.renderAll();
});          
$('.colorf').click(function(){
  canvas.getActiveObject().setTextBackgroundColor(this.value);
  canvas.renderAll();
});
	// Funcion para agregar texto
function activar(){
	$("#modaltext").modal();
}
function activareditar(){
  var obj = canvas.getActiveObject();
  if(canvas.getActiveObject())
  if(obj.get('type')=='text'){
    document.getElementById('text-cont').value=obj.getText();
    $("#modaleditar").modal();
  }else{
      navigator.notification.alert("Seleccione un texto para editar. ", alertCallback, "Editar texto", "Aceptar");
      function alertCallback() {
      console.log("Alert is Dismissed!");
      }  
  }
   // alert("Selecione un texto");
   else
    {  navigator.notification.alert("Seleccione un texto para editar. ", alertCallback, "Editar texto", "Aceptar");
      function alertCallback() {
      console.log("Alert is Dismissed!");
      }  
    }
}
function agregarTexto(){
		//colort = document.getElementById("colort").value;
		//colorf = document.getElementById('.colorf').value;
	var texto = document.getElementById('textomeme').value;
	var family = document.getElementById('font-family').value;
  if (texto ) {
                //document.getElementById("tamaño").value;
		//textArriba=document.getElementById("txtTextoArriba").value;
		var Text = new fabric.Text(texto, {
		fontSize: 40,  
		left:canvas.width/3 ,
    //fontWeight: 'bold',
    //stroke: '#ff1318',
  //strokeWidth:1,
    stroke: '#c3bfbf',
    strokeWidth:0.5,
    //shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
  		top: 100,
		textAlign:'left',
    	//	backgroundColor:colorf,
    cornerStyle: 'circle',
    cornerSize: 20,
        //textBackgroundColor:
        //fontFamily: 'Impact',
  		//fontFamily: family,
  		
		});
	//iText.setColor(colort);
		canvas.add(Text);
  }
  document.getElementById('textomeme').value="";	
}
	//eventos con el mouse al seleccionar personaje y texto
canvas.on({
  'mouse:down': function(e) {
    if (e.target) {
      e.target.opacity = 0.5;
      canvas.renderAll();
      // $("#mytexto").show();
    }
  },
  'mouse:up': function(e) {
  	if (e.target) {
     	e.target.opacity = 1;
     	canvas.renderAll();
      //$("#mytexto").hide();
 		}
 	},     
  'object:moved': function(e) {
  	e.target.opacity = 0.5;
  },
  'object:modified': function(e) {
  	e.target.opacity = 1;
  }
});

/*activar los div de los filtros */
 $(".brightness").click(function () {
      activardiv("#myDIV", "#myDIV1","#myDIV2","#myDIV3");  
    } )  
 	 $("#gradient-transparency").click(function () {
    activardiv("#myDIV1","#myDIV","#myDIV2","#myDIV3");
	})
	 $("#pixelate").click(function () {
    activardiv("#myDIV2","#myDIV1","#myDIV","#myDIV3");
	})
	 $("#tint").click(function () {
    activardiv("#myDIV3","#myDIV2","#myDIV1","#myDIV");
     
	})
   function activardiv(div, div1,div2,div3){
      $(div).show();
      $(div1).hide();
      $(div2).hide();
      $(div3).hide();   
   }

$('#text-cont').keyup(function() {
    valortext($(this).val());
});
function valortext(value) {
  var obj = canvas.getActiveObject();
  if (obj) {      
      obj.setText(value);
      canvas.renderAll();  
  }
}

$('#btnDescargar').click(function(){
 
/*
  this.href = canvas.toDataURL({
    format: 'png',
    quality: 10
  });
  this.download = 'Meme.png';
  */

  window.canvas2ImagePlugin.saveImageDataToLibrary(
    function(msg){ 
      navigator.notification.alert('Se ha guardado el meme en la galería de su dispositivo, revise el directorio:'+msg, alertCallback, 'Descarga', ' Aceptar');
      function alertCallback() {
        console.log("Alert is Dismissed!");
      }       // Ext.Msg.alert('Descarga','Se ha guardado el meme en la galería de su dispositivo');
    },
    function(err){

      navigator.notification.alert('Error, no se pudo guardar el archivo.', alertCallback, 'Descarga', ' Aceptar');
      function alertCallback() {
        console.log("Alert is Dismissed!");
      }   // Ext.Msg.alert('Descarga','Error no se pudo guardar el archivo');
    },
    document.getElementById('canvas')
  );
  

});

function textoponchis(){
 var sitio = new fabric.Text("ponchisponchis.com", {
    fontSize: 10,  
    left:canvas.width-120,
    //fontWeight: 'bold',
    //stroke: '#ff1318',
  //strokeWidth:1,
    //stroke: '#c3bfbf',
    //strokeWidth:0.5,
    //shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      top: canvas.height-20,
    textAlign:'left',
      //  backgroundColor:colorf,
    cornerStyle: 'circle',
    cornerSize: 20,
    selectable:false,
    selection :false,
        //textBackgroundColor:
        //fontFamily: 'Impact',
      //fontFamily: family,
    //padding: 1,
      
    });
canvas.add(sitio);
}

textoponchis();
var conexionlocal=0;


$.ajax({
   type: "POST",
   dataType: "json",
   async : false,
   url: "https://ponchisponchis.com/Appmeme/fondo.php",
  }).done(function( data, textStatus, jqXHR ) {
    var cadena = "";
    $.each(data, function(i,filename) {
         cadena+="<li><a class='thumbnail'><img style='width:100px;' src='https://ponchisponchis.com/Appmeme/"+ filename +"' class='agregafondo' ></a></li>"; 
    });
     $('#mostrarf').html(cadena);
    
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {

  
           $('#mostrarf').html("<li><a class='thumbnail'><img  style='width:100px;' src='img/fondos/verdeclaro.png'  class='agregafondo' ></a></li><li><a class='thumbnail'><img  style='width:100px;' src='img/fondos/azulclaro.png'  class='agregafondo' ></a></li><li><a class='thumbnail'><img  style='width:100px;' src='img/fondos/amarilloclaro.png'  class='agregafondo' ></a></li><li><a class='thumbnail'><img  style='width:100px;' src='img/fondos/blanco.png'  class='agregafondo' ></a></li>");

          conexionlocal=1;

          alert("Requiere conexión con internet para poder compartir y mostrar más imágenes.");
  });
$.ajax({
   type: "POST",
   dataType: "json",
   async : false,
   url: "https://ponchisponchis.com/Appmeme/personaje.php",
  }).done(function( data, textStatus, jqXHR ) {
    cadena = "";
    $.each(data, function(i,filename) {
      cadena+="<li><a class='thumbnail'><img src='https://ponchisponchis.com/Appmeme/"+ filename +"' class='agregapersonaje resize-image' ></a></li>";            
    });
    $('#mostrarp').html(cadena);  
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
   
      $('#mostrarp').html("<li><a class='thumbnail'><img  src='img/personajes/Barralesgane.png'  class='agregapersonaje' ></a></li><li><a class='thumbnail'><img  src='img/personajes/MemoOchoaWC.png'  class='agregapersonaje' ></a></li><li><a class='thumbnail'><img  src='img/personajes/PPRoger Federer.png'  class='agregapersonaje' ></a></li><li><a class='thumbnail'><img  src='img/personajes/PPBARACK OBAMA.png'  class='agregapersonaje' ></a></li>");
      conexionlocal=1;
    
  });
$.ajax({
   type: "POST",
   dataType: "json",
   async : false,
   url: "https://ponchisponchis.com/Appmeme/globo.php",
  }).done(function( data, textStatus, jqXHR ) {
    cadena = "";
    $.each(data, function(i,filename) {
      cadena+="<li><a class='thumbnail'><img src='https://ponchisponchis.com/Appmeme/"+ filename +"' class='agregaglobo resize-image' ></a></li>";

    });
    $('#mostrarg').html(cadena);
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    
            $('#mostrarg').html("<li><a class='thumbnail'><img src='img/globos/1.png'  class='agregaglobo' ></a></li><li><a class='thumbnail'><img  src='img/globos/2.png'  class='agregaglobo' ></a></li><li><a class='thumbnail'><img  src='img/globos/3.png'  class='agregaglobo' ></a></li><li><a class='thumbnail'><img  src='img/globos/5.png'  class='agregaglobo' ></a></li>");
            conexionlocal=1;
    
  });

$(".agregafondo" ).on( "click", function() {
  fondos=document.getElementById("image").src=this.src; 
  if (conexionlocal==1) {
  GenerarMeme(fondos);
  }else
  {
  toDataURL(fondos)
  .then(dataUrl => {
    //console.log('RESULT:', dataUrl)
    GenerarMeme(dataUrl);    
  })
  }


});

 $(".agregapersonaje" ).on( "click", function() {
    document.getElementById("image").src=this.src;
    var ObjetoImagen = new Image();
    ObjetoImagen.crossOrigin = 'anonymous';
    ObjetoImagen.onload = function(){     
    var f_img = new fabric.Image(ObjetoImagen);
    canvas.add(f_img.set({ left:canvas.width/1.3, top:canvas.height/2, angle:0, cornerStyle: 'circle', cornerSize: 20, }).scale(0.35));
  }
  if (conexionlocal==1) {
    ObjetoImagen.src = document.getElementById("image").src; 

  }else
  {
  toDataURL(document.getElementById("image").src)
  .then(dataUrl => {
    //console.log('RESULT:', dataUrl)
     ObjetoImagen.src = dataUrl; 
  })  

  }   
  });

  //Volver los Globos a tamaño pequeño 
$(".agregaglobo" ).on( "click", function() {
  globos = document.getElementById("image").src=this.src;
  $("#modalglobo").modal();
});

/*

//fabric.Object.prototype.padding = 50;
 // fabric.Object.prototype.Color ='#333' ;
fabric.Object.prototype.transparentCorners = false;	
fabric.Image.fromURL('personaje1.png', function(img) {
	canvas.add(img);
	//tamano de lo cuadritos para agrandar
	//canvas.item(1)["centeredScaling"]=true;
	//canvas.item(1)["cornerSize"]=20;
	//canvas.item(0)["rotatingPointOffset"]=40;
	//canvas.item(0)["borderColor"]="#040404";
	//canvas.item(0)["cornerColor"]="#040404";
	//canvas.item(0)["hasControls"]=false;
	//canvas.item(0)["selectable"]=false;
      	
 	 });
 
*/

  
  
