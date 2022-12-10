//hacer visibles opciones para cualquier otro usuario que no sea administrador
const ViewRegularUserOptions =()=> { 
    let isAdmin=JSON.parse( sessionStorage.getItem('userInfo') )  || '' 
    if(isAdmin.roleId !== 1) { 
      return 'visible'
    } else {
      return 'invisible'
    };
  };

  export default ViewRegularUserOptions;