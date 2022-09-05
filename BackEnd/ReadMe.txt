Modificaciones al proyecto original ( back end ):

* SERVICES S3.JS
  //HABILITAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
    const upload= await storage.upload(params).promise()
    return  upload.Location  

* CATEGORIES CONTROLLER, UPDATE
  //MODIFICAR CUANDO HAYA UNA CUENTA AMAZON DONDE SUBIR LAS IMAGENES  
   try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://via.placeholder.com/600/51aa97`

* NEWS ROUTES, GET , se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda leer las noticias

* AUTH CONTROLLER, LOGIN , linea 26 se agregó la devolucion de los datos del user, linea 20 se agregó id
  AUTH DOCUMENTATION, LOGIN, se cambió datos para admin

* VIEWS emailContact e emailWelcome , se agregó nueva imagen de logo y se corrigió texto del email

* CATEGORIES VALIDATOR, se eliminó validaciones para imagen
* CATEGORIES CONTROLLER, CREATE, se modificó para trabajar con imágenes y S3 Amazon
* CATEGORIES DOCUMENTATION, se adaptó create y update para que puedan recibir archivos de imagen y se cambió nombre 
                            de rutas en CREATE,UPDATE y DELETE
* CATEGORIES CONTROLLER, GET ALL se eliminó atributo de paginación "name"
* CATEGORIES CONTROLLER, se sgregó el servicio GETONECATEGORYBYNAME
* CATEGORIES ROUTES, CREATE Y UPDATE, se agregó middleware "optionsFileUpload" y se cambió nombre de 
                            rutas en CREATE,UPDATE y DELETE
* CATEGORIES MODEL, se modificó image allowNull:false
* CATEGORIES ROUTES, se agregó una ruta get by name

* CATEGORIES SEEDERS, se cambiaron numeros por letras, en los nombres

* USERS ROUTES, se agregó /del a la ruta

* USERS ROUTES, se eliminó VerifyIsAdmin de las rutas update y get one

* USERS CONTROLLER, se modificó el servicio update para que tomara imagenes y hasheara password

* USERS CONTROLLER, se incorporó USER_REGULAR_ROLE_ID como variable de entorno en create y update

* BASE CONTROLLER, SETNOTFOUND se modificó message de error

* HELPERS, MODELHELPER, se cambió el limite de paginas de 10 a 100


