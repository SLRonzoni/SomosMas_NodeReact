Modificaciones al proyecto original ( back end ):

** SERVICES **
  * S3.JS
   //HABILITAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    const upload= await storage.upload(params).promise()
    return  upload.Location  

** CONTROLLERS **
  * AUTH, se creo servicio para login con google
  * AUTH, LOGIN , linea 26 se agregó la devolucion de los datos del user, linea 20 se agregó id
  * ACTIVITIES, se crearon  servicios  getByName y getByDate
  * ACTIVITIES, se modificaron servicios create y update, para el manejo de imagenes
  * BASE, SETNOTFOUND se modificó message de error
  * CATEGORIES, UPDATE
    //MODIFICAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    try{
      //regularImglocation = await uploadToBucket(img);
      regularImglocation=`https://via.placeholder.com/600/51aa97`
  * CATEGORIES, CREATE, se modificó para trabajar con imágenes y S3 Amazon
  * CATEGORIES, GET ALL se eliminó atributo de paginación "name"
  * CATEGORIES, se sgregó el servicio GETONECATEGORYBYNAME
  * CONTACT, se cambió nombre de la variable que guarda el modelo de contacts 
  * CONTACT, se eliminó campo message 
  * MEMBERS, se cambio nombre de inputs , de data a inputVars, y se adaptó servicio para manejar imagenes ,en create y update
  * MESSAGES , se crearon servicios
  * NEWS, se modificó condicion en linea 19
  * NEWS, se crearon servicios  getByName, getByDate, getByCategory
  * NEWS, se adaptaron servicios create y update, para el manejo de imagenes
  * ORGANIZATIONS, se agregaron a los servicios facebook, instagram y linkedin
  * USERS, se modificó el servicio update para que tomara imagenes y hasheara password
  * USERS, se modificó el servicio create para que tomara imagenes
  * USERS, se incorporó USER_REGULAR_ROLE_ID como variable de entorno en create y update
  
  
** ROUTES **
  * AUTH, se agregó moddleware optionsFileUpload 
  * AUTH, se creo 
  * ACTIVITIES, se crearon rutas para getByName, getByDate, get public y get public id y se agregaron middlewares
  * ACTIVITIES, se modificaron rutas create, getAll, update, del  ruta para login con google
  * CATEGORIES, CREATE Y UPDATE, se agregó middleware "optionsFileUpload" y se agregó al nombre de la
                            ruta CREATE,UPDATE y DEL
  * CATEGORIES, se agregó una ruta get by name
  * MEMBERS, se agregó al nombre de la ruta CREATE,UPDATE y DEL y se agregó middleware idExists
  * MEMBERS, se quitó la verificacion de administrador, para que los miembros los pueda ver cualquier usuario
  * MEMBERS, se agregó middleware de manejo de imagenes en create y update
  * MESSAGES , se crearon rutas
  * NEWS, GET , se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda leer las noticias
  * NEWS, se agregó middleware de manejo de imagenes en create y update
  * NEWS, se agregó al nombre de la ruta CREATE,UPDATE y DEL 
  * NEWS, se crearon rutas para getByName, getByDate y getByCategory
  * NEWS, se anregó middleware para manejo de imagenes en create y update
  * ORGANIZATIONS, se cambió opciones de verificar administrador
  * ROLES, se agregó al nombre de la ruta CREATE,UPDATE y DEL. 
  * ROLES, se creó ruta para getByName
  * TESTIMONIALS, se crearon rutas para getByName y  getByDate, get public y get public id
  * TESTIMONIALS, se cambió la distribución del middlewares de verificacion user y admin, para usar rutas public
  * USERS, se agregó /del a la ruta
  * USERS, se agregaron moddlewares isExists y optionsFileUpload a la ruta update
  * USERS, se eliminó VerifyIsAdmin de las rutas update y get one
  
** VIEWS **
  * VIEWS emailContact e emailWelcome , se agregó nueva imagen de logo y se corrigió texto del email


** VALIDATORS **
  * ACTIVITIES , se eliminó validacion para imagen
  * CATEGORIES , se eliminó validacion para imagen
  * NEWS, se eliminó la validacion para imagen y type, dado que puede aceptar null

** DOCUMENTATION ** 
  * AUTH , LOGIN, se cambió datos para admin
  * CATEGORIES , se adaptó create y update para que puedan recibir archivos de imagen y se cambió nombre 
                              de rutas en CREATE,UPDATE y DELETE
  * CONTACT , POST se eliminó id y se colocó campo message como required
  * MESSAGES  , se creó documentation


** HELPERS **
  * MODELHELPER, se cambió el limite de paginas de 10 a 100


** SEEDERS **
  * SEEDERS, se standarizaron todos los nombres de los archivos
  * CATEGORIES, se cambiaron numeros por letras, en los nombres
  * CONTACT, se eliminó campo message 
  * MEMBERS, se creó seeder
  * MESSAGES , se creó seeder
  * NEWS, se creó seeder
  * ORGANIZATIONS, se creó seeder
  * TESTIMONIALS, se creó seeder
  * USER CREATE TEST, se agrego linea 3 y se modificó linea 30
  * USER CREATE DEMO USER, se agregaron usuario regular y usuario admin
  * USERS, se modificaron los seeders para que hashee la password  


** MODELS ** 
  * CATEGORIES , se modificó image allowNull:false
  * CONTACT , se eliminó campo message 
  * MESSAGES  , se creó modelo
  * ORGANIZATIONS, se agregó facebook, instagram y linkedin ( segun migracion adicional )


** MIGRATION **
  * MESSAGES , se creó  migracion 
