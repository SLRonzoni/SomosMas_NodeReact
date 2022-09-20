//hacer visibles opciones para administrador
const ViewAdministratorOptions =()=> { 
    let isAdmin=JSON.parse( sessionStorage.getItem('userInfo') )  || '' 
    if(isAdmin.roleId === 1) { 
      return 'visible'
    } else {
      return 'invisible'
    };
  };

  export default ViewAdministratorOptions;