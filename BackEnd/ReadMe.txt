Modificaciones al proyecto original ( back end ):

** SERVICES **
  * S3.JS
   //HABILITAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    const upload= await storage.upload(params).promise()
    return  upload.Location  

** CONTROLLERS **
  * DONATIONS, se crearon servicios para donaciones
  * AUTH, se creo servicio para login con google
  * AUTH, LOGIN , linea 26 se agregó la devolucion de los datos del user, linea 20 se agregó id e photo
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
  * CATEGORIES, se sgregó el servicio GETONECATEGORYPUBLIC
  * CONTACT, se cambió nombre de la variable que guarda el modelo de contacts 
  * CONTACT, se eliminó campo message 
  * CONTACT, se cambió servicio create para el caso de contactos con = email
  * MEMBERS, se cambio nombre de inputs , de data a inputVars, y se adaptó servicio para manejar imagenes ,en create y update
  * MESSAGES , se crearon servicios
  * NEWS, se modificó condicion en linea 19
  * NEWS, se crearon servicios  getByName, getByDate, getByCategory
  * NEWS, se adaptaron servicios create y update, para el manejo de imagenes
  * NEWS, se standarizaron respuestas catch error y se cambió respuesta servicio getAllCommentsOfNews
  * ORGANIZATIONS, se agregaron a los servicios facebook, instagram y linkedin
  * ORGANIZATIONS, se agregaron atributos a ruta getById
  * USERS, se modificó el servicio update para que tomara imagenes y hasheara password
  * USERS, se modificó el servicio create para que tomara imagenes
  * USERS, se incorporó USER_REGULAR_ROLE_ID como variable de entorno en create y update
  * USERS, se creó controlador,  para obtener datos del usuario cuando existe un logueo con google
  
  
** ROUTES **
  * DONATIONS, se crearon rutas para donaciones
  * AUTH, se agregó moddleware optionsFileUpload 
  * AUTH, se creo ruta para login con google
  * ACTIVITIES, se crearon rutas para getByName, getByDate, get public y get public id y se agregaron middlewares
  * ACTIVITIES, se modificaron rutas create, getAll, update, del  
  * CATEGORIES, en post y update, se agregó middleware "optionsFileUpload" 
  * CATEGORIES, se agregó una ruta get by name
  * CATEGORIES, se cambió la verificacion de administrador, para poder agregar una ruta publica
  * COMMENTS, se cambió distribución de middleware de autenticacion de user
  * MEMBERS, se agregó middleware idExists
  * MEMBERS, se quitó la verificacion de administrador, para que los miembros los pueda ver cualquier usuario
  * MEMBERS, se agregó middleware de manejo de imagenes en create y update
  * MESSAGES , se crearon rutas

  * NEWS, en get se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda leer las noticias
  * NEWS, se agregó middleware de manejo de imagenes en create y update
  * NEWS, se crearon rutas para getByName, getByDate y getByCategory
  * NEWS, se agregó middleware para manejo de imagenes en create y update
  * ORGANIZATIONS, se cambió opciones de verificar administrador, y se agregó /public a rutas get
  * ROLES, se creó ruta para getByName
  * TESTIMONIALS, se crearon rutas para public/getByName y  public/getByDate, get public y get public id
  * TESTIMONIALS, se cambió la distribución del middlewares de verificacion user y admin, para usar rutas public
  * TESTIMONIALS, en post y put, se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda crear un testimonio
  * USERS, se agregaron moddlewares isExists y optionsFileUpload a la ruta update
  * USERS, se eliminó VerifyIsAdmin de las rutas update y get one
  * USERS, se creó ruta get by email, para obtener datos del usuario cuando existe un logueo con google
  
  
** VIEWS **
  * VIEWS emailContact e emailWelcome , se agregó nueva imagen de logo y se corrigió texto del email


** VALIDATORS **
  * ACTIVITIES , se eliminó validacion para imagen
  * CATEGORIES , se eliminó validacion para imagen
  * NEWS, se eliminó la validacion para imagen y type, dado que puede aceptar null

** DOCUMENTATION ** 
  * AUTH , LOGIN, se cambió datos para admin
  * CATEGORIES , se adaptó create y update para que puedan recibir archivos de imagen
  * CONTACT , en post se eliminó id y se colocó campo message como required
  * MESSAGES  , se creó documentation


** HELPERS **
  * MODELHELPER, se cambió el limite de paginas de 10 a 100


** SEEDERS **
  * SEEDERS, se standarizaron todos los nombres de los archivos
  * DONATIONS, se creó seeder para donaciones
  * ACTIVITIES, se aumentaron los registros
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
  * DONATIONS, se creó modelo para donaciones
  * CATEGORIES , se modificó image allowNull:false
  * CONTACT , se eliminó campo message 
  * MESSAGES  , se creó modelo
  * ORGANIZATIONS, se agregó facebook, instagram y linkedin ( segun migracion adicional )
  * TESTIMONIALS, se agregó campo userId para que los testimonios solo los puedan cargar los usuarios registrados, se agregó allownull a los campos


** MIGRATION **
  * DONATIONS, se creó migración
  * MESSAGES , se creó  migracion 
  * TESTIMONIALS, se quitó nulo en image, se agregó campo userId, y se agregó not null en userId y content
