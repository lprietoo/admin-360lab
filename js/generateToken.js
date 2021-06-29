//---------------variables--------------------//
var selectedLab = document.getElementById("selectLab");
var lab;

// imprime token al seleccionar un laboratorio

  selectedLab.addEventListener("change", function(){
    // Detecta cambios del select laboratorios 
      lab = document.getElementById('selectLab').value;

    //token
      $longitud = 15; //numero de caracteres
      $clave = generarClave($longitud); 
      document.querySelector("#result").innerHTML = $clave;
      token = $clave
      
      $("#btnGuardarToken").removeClass('disabled')
      $("#datetime").removeClass('disabled')
  });


  document.querySelector("#btnGuardarToken").addEventListener("click",function(){
      
      if($("#datetime").val() ===''){
        $("#errorFecha").removeClass('d-none')
      }else{
        $("#selectLab").addClass('disabled')
      $("#result").addClass('disabled')
        $("#errorFecha").addClass('d-none')
        $("#datetime").addClass('disabled')
        guardarToken()
        $("#btnGuardarToken").addClass('disabled') 
      }
      
  });

  document.getElementById("datetime").addEventListener("click", function(){
    $("#errorFecha").addClass('d-none')
  });

// Reestablece funcionalidad
  document.querySelector("#btnNuevoToken").addEventListener("click",function(){
    $("#selectLab").removeClass('disabled')
    $("#result").removeClass('disabled')
    $("#datetime").addClass('disabled')
    $("#btnGuardarToken").removeClass("d-none")
    $("#tokenSucces").addClass("d-none")
    document.getElementById('selectLab').value = 'select'
    document.querySelector("#result").innerHTML = '';
    document.querySelector("#datetime").value = '';
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


  // datetimepicker

  $("#datetime").datetimepicker({
    format: "yyyy/mm/dd hh:mm",
    autoclose: true,
    showMeridian: true,
    pickerPosition: "bottom-left"
});