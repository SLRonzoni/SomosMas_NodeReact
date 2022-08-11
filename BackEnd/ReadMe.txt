Modificaciones al proyecto original :

* NEWS ROUTES, GET , se eliminó validacion VerifyIsAdmin, para que cualquier persona pueda leer las noticias

* AUTH CONTROLLER, LOGIN , linea 26 se agregó la devolucion de los datos del user
  AUTH DOCUMENTATION, LOGIN, se cambió datos para admin

* VIEWS emailContact e emailWelcome , se agregó nueva imagen de logo y se corrigió texto del email

* CATEGORIES VALIDATOR, se eliminó validaciones para imagen
* CATEGORIES CONTROLLER, CREATE, se modificó para trabajar con imágenes y S3 Amazon
* CATEGORIES DOCUMENTATION, se adaptó create y update para que puedan recibir archivos de imagen y se cambió nombre 
                            de rutas en CREATE,UPDATE y DELETE
* CATEGORIES CONTROLLER, GET ALL se eliminó atributo de paginación "name"
* CATEGORIES ROUTES, CREATE Y UPDATE, se agregó middleware "optionsFileUpload" y se cambió nombre de 
                            rutas en CREATE,UPDATE y DELETE
* CATEGORIES MODEL, se modificó image allowNull:false

