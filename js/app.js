
//---------------------Variable------------------//
var token;

//-----------------Firestore---------------------//

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



//----------------Autenticacion-------------------//

// Inicio de sesión

function signIn(){
  var email = $('#usuarioLogin').val()
  var password = $('#contraseñaLogin').val()

  firebase.auth().signInWithEmailAndPassword(email, password)

  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    location.pathname="../"
  })
  .catch((error) => {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    $("#loginError").removeClass("d-none")
  });
}

// Cierre de sesión

function logOut(){
  firebase.auth().signOut()
  .then( () => {
    location.pathname="../login.html"
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
}



// Verifica el estado de autenticación del usuario

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('ingresando...')
  } else {
    var loc = location.pathname;    
    if(loc ==='/' ){
      location.href="../login.html"
     }
  }
});
