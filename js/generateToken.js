// imprime token al seleccionar un laboratorio

  document.getElementById("selectLab").addEventListener("change", function(){
      $longitud = 7; //numero de caracteres
      $clave = generarClave($longitud); 
      document.querySelector("#result").innerHTML = $clave;
      token = $clave
      $("#btnGuardarToken").removeClass('disabled')
  });

  document.querySelector("#btnGuardarToken").addEventListener("click",function(){
      guardarToken() 
      $("#selectLab").addClass('disabled')
      $("#result").addClass('disabled')
      $("#btnGuardarToken").addClass('disabled')
  });

// Reestablece funcionalidad
  document.querySelector("#btnNuevoToken").addEventListener("click",function(){
    $("#selectLab").removeClass('disabled')
    $("#result").removeClass('disabled')
    $("#btnGuardarToken").removeClass("d-none")
    $("#tokenSucces").addClass("d-none")
    document.getElementById('selectLab').value = 'select'
    document.querySelector("#result").innerHTML = '';
  });
  
  /*Función principal | Generador de tokens */
  function generarClave(long)
  {
      /*caracteres permitidos*/
      var caracteres = "Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$",
          clave = '',
          numero;
  
      /*creacion de token*/
      for(var i=0;i<long;i++)
      {
          numero = getNumero( 0, caracteres.length );
          clave += caracteres.substring( numero, numero + 1 );
      }
      return clave;
  }
  
  
  /*Función para generar un numero aleatorio*/
  function getNumero(min,max)
  {
      return Math.floor( Math.random() * ( max - min ) ) + min;
  }
