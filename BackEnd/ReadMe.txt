Modificaciones al proyecto original ( back end ):

** SERVICES **
  * S3.JS
   //HABILITAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    const upload= await storage.upload(params).promise()
    return  upload.Location  

** CONTROLLERS **
  * CATEGORIES CONTROLLER, UPDATE
    //MODIFICAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    try{
      //regularImglocation = await uploadToBucket(img);
      regularImglocation=`https://via.placeholder.com/600/51aa97`
  * CATEGORIES CONTROLLER, CREATE, se modificó para trabajar con imágenes y S3 Amazon
  * CATEGORIES CONTROLLER, GET ALL se eliminó atributo de paginación "name"
  * CATEGORIES CONTROLLER, se sgregó el servicio GETONECATEGORYBYNAME
  * USERS CONTROLLER, se modificó el servicio update para que tomara imagenes y hasheara password
  * USERS CONTROLLER, se modificó el servicio create para que tomara imagenes
  * USERS CONTROLLER, se incorporó USER_REGULAR_ROLE_ID como variable de entorno en create y update
  * CONTACT CONTROLLER, se cambió nombre de la variable que guarda el modelo de contacts
  * BASE CONTROLLER, SETNOTFOUND se modificó message de error
  * AUTH CONTROLLER, se creo servicio para login con google
  * CONTACT CONTROLLER, se eliminó campo message 
  * ACTIVITIES CONTROLLER, se crearon  servicios  getByName y getByDate
  * ACTIVITIES CONTROLLER, se modificaron servicios create y update, para el manejo de imagenes
  * AUTH CONTROLLER, LOGIN , linea 26 se agregó la devolucion de los datos del user, linea 20 se agregó id
  * MESSAGES CONTROLLER , se crearon servicios

** ROUTES **
  * NEWS ROUTES, GET , se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda leer las noticias
  * CATEGORIES ROUTES, CREATE Y UPDATE, se agregó middleware "optionsFileUpload" y se agregó al nombre de la
                            ruta CREATE,UPDATE y DEL
  * CATEGORIES ROUTES, se agregó una ruta get by name
  * USERS ROUTES, se agregó /del a la ruta
  * AUTH ROUTES, se agregó moddleware optionsFileUpload 
  * USERS ROUTES, se agregaron moddlewares isExists y optionsFileUpload a la ruta update
  * USERS ROUTES, se eliminó VerifyIsAdmin de las rutas update y get one
  * ACTIVITIES ROUTES, se crearon rutas para getByName y getByDate y se agregaron middlewares
  * ACTIVITIES ROUTES, se modificaron rutas create, getAll, update, del
  * AUTH ROUTES, se creo ruta para login con google
  * MESSAGES ROUTES , se crearon rutas
  * MEMBERS, se agregó al nombre de la ruta CREATE,UPDATE y DEL y se agregó middleware idExists
  * MEMBERS, se quitó la verificacion de administrador, para que los miembros los pueda ver cualquier usuario

  
** VIEWS **
  * VIEWS emailContact e emailWelcome , se agregó nueva imagen de logo y se corrigió texto del email


** VALIDATORS **
  * CATEGORIES VALIDATOR, se eliminó validacion para imagen
  * ACTIVITIES VALIDATOR, se eliminó validacion para imagen

** DOCUMENTATION ** 
  * CATEGORIES DOCUMENTATION, se adaptó create y update para que puedan recibir archivos de imagen y se cambió nombre 
                              de rutas en CREATE,UPDATE y DELETE
  * AUTH DOCUMENTATION, LOGIN, se cambió datos para admin
  * CONTACT DOCUMENTATION, POST se eliminó id y se colocó campo message como required
  * MESSAGES DOCUMENTATION , se creó documentation


** HELPERS **
  * MODELHELPER, se cambió el limite de paginas de 10 a 100


** SEEDERS **
  * CONTACT SEEDER, se eliminó campo message 
  * CATEGORIES SEEDERS, se cambiaron numeros por letras, en los nombres
  * NEWS SEEDER, se creó seeder
  * USER CREATE TEST SEEDER, se agrego linea 3 y se modificó linea 30
  * USER CREATE DEMO USER, se agregaron usuario regular y usuario admin
  * SEEDER, se standarizaron todos los nombres de los archivos
  * MESSAGES SEEDER , se creó seeder
  * MEMBERS SEEDER, se creó seeder
  * USERS SEEDER, se modificaron los seeders para que hashee la password
  * MEMBERS SEEDER, se creó seeder


** MODELS ** 
  * CONTACT MODEL, se eliminó campo message 
  * CATEGORIES MODEL, se modificó image allowNull:false
  * MESSAGES MODEL , se creó modelo


** MIGRATION **
  * MESSAGES MIGRATION, se creó  migracion 
