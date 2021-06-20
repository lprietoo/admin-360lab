
//---------------------Variable------------------//
var selectedLab = document.getElementById("selectLab");
var lab;
var token;




//-----------------------------------------

// Asigna los tokens al laboratorio selecionado

// Detecta cambios del select laboratorios 
selectedLab.addEventListener("change", function(){
  lab = document.getElementById('selectLab').value;
});


// Guardar tokens en las colecciones "laboratorios" y "tokens"
function guardarToken() {

  var fechaCreacion = moment().format('YYYY-MM-DD hh:mm') // guarda fecha de creación
  var creacion = moment(fechaCreacion).unix() // convierte fecha a formato unix
  var fechaExp = $('#datetime').val() // guarda fecha de expiración
  var exp = moment(fechaExp, 'YYYY-MM-DD hh:mm').unix() // convierte fecha a formato unix
// Asigna los tokens al laboratorio selecionado

  // db.collection("laboratorios").doc(lab).set({ tokens:token})

  db.collection("laboratorios")
    .doc(lab)
    .update({

      tokens:firebase.firestore.FieldValue.arrayUnion(token)
  })
  .catch((error) => {
    console.error("Error ", error);
  });

  db.collection("tokens").doc(token).set({

      fechaCreacion: creacion,
      fechaExp: exp,

    }).then(function() {
      $("#btnGuardarToken").addClass("d-none")
      $("#tokenSucces").removeClass("d-none")
    })  
    .catch((error) => {
      console.error("Error ", error);
    });
}

//-----------------------------------

