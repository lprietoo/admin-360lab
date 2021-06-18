
//---------------------Variable------------------//
var selectedLab = document.getElementById("selectLab");
var lab;
var token;




//-----------------------------------------

// Asigna los tokens al laboratorio selecionado

// Detecta cambios del select 
selectedLab.addEventListener("change", function(){
  lab = document.getElementById('selectLab').value;
  console.log(lab)
});


// Guardar tokens en las colecciones "laboratorios" y "tokens"
function guardarToken() {
  var creacion = moment().unix()
  var expiracion = moment().add(1, "h").unix()

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
      fechaExp: expiracion,

    }).then(function() {
      $("#btnGuardarToken").addClass("d-none")
      $("#tokenSucces").removeClass("d-none")
    })  
    .catch((error) => {
      console.error("Error ", error);
    });
}

//-----------------------------------

// console.log(expiracion)
// var fecha = Date(1624029555)
// console.log(fecha)