const express = require ('express.js')
const bcrypt = require ('bcrypt')
const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
require ('dotenv/config')

// Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvGkT8MWxfj6OWT4BoHJMobCgsssQRAvM",
    authDomain: "back-firebase-33d76.firebaseapp.com",
    projectId: "back-firebase-33d76",
    storageBucket: "back-firebase-33d76.appspot.com",
    messagingSenderId: "489618249773",
    appId: "1:489618249773:web:e96484615c426b43abc0a4",
    measurementId: "G-H3QL9EFKF0"
  };

  // Inicializar BD con firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

// Inicializar el servidor 
const app = express()

app.use(express.json())

// Rutas para las peticiones EndPoint | api
// Ruta Registro 
app.post('/registro', (req, res)=> {
  const { name , lastname, email, password, number } = req.body
 
app.get('/usuarios', (req, res) =>  {
  const users = collection(db, "users")
  console.log('usuarios', users)
  res.json({
    'alert': 'success',
    users
  })
})
  // Validaciones de los datos
  if(name.length < 3) {
    res.json ({
      'alert': 'nombre requiere minimo 3 caracteres'

    })
  } else  if(lastname.length < 3) {
    res.json ({
      'alert': 'El apellido requiere minimo 3 caracteres'

    })
  } 
  else if (!email.length) {
    res.json({
      'alert': 'debes escribir correo electronico'
    })
  } else if (password.length < 8) {
    res.json({
      'alert': 'nombre requiere minimo 8 caracteres'
    })
  }else if (!Number(number) || number.length < 10) {
    res.json({
      'alert': 'Introduce un numero telefonico correcto'
    })
  }else {
    const users = collection(db, 'users')
    
    //  Verificar que el correo no exixista en la coleccion
    getDoc(doc(users, email)).then( user => {
      if (user.exists()){
        res.json({
          'alert': 'El correo ya existe en la BD'
        })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash

            // Guardar en la BD
            setDoc(doc(users, email), req.body).then( reg => {
              res.json({
                'alert': 'success',
                'data': reg
              })
            })
          })
        })
      }
    })
  }
})

const PORT = process.env.PORT || 19000

//Ejecutamos el servidor 
app.listen(PORT, () => {
    console.log(`Escuchando en el Puerto: ${PORT}`)
})