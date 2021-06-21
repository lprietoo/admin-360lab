
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
// Verifica el estado de autenticación del usuario

var user = firebase.auth().currentUser;

if (user == null) {
  var loc = location.pathname;
  if(loc ==='/admin-360lab/'){
    location.href="/admin-360lab/login.html"
   }
}

// Inicio de sesión

function signIn(){
  var email = $('#usuarioLogin').val()
  var password = $('#contraseñaLogin').val()

  firebase.auth().signInWithEmailAndPassword(email, password)

  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    location.href="/admin-360lab"
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
    location.href="/admin-360lab/login.html"
  }).catch((error) => {
    // var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
}



