//ordenar por Nombre ascendente
const OrderNameAsc = (table) => {
  table.sort(function(a,b) {
    if(a.name<b.name){
      return -1;
    }
    if(a.name>b.name){
      return 1;
    } 
    return 'error';                                         
  });
};

//ordenar por Apellido ascendente
const OrderLastNameAsc = (table) => {
  table.sort(function(a,b) {
    if(a.lastName<b.lastName){
      return -1;
    }
    if(a.lastName>b.lastName){
      return 1;
    } 
    return 'error';                                         
  });
};

//ordenar por Id ascendente
const OrderIdAsc = (table) => {
  table.sort(function(a,b) {
    if(a.id<b.id){
      return -1;
    }
    if(a.id>b.id){
      return 1;
    } 
    return 'error';                                         
  });
};

//ordenar por fecha de creación ascendente
const OrderCreatedAsc = (table) => {
  table.sort(function(a,b) {
    if(a.createdAt<b.createdAt){
      return -1;
    }
    if(a.createdAt>b.createdAt){
      return 1;
    } 
    return 'error';                                         
  });
};

//ordenar por fecha de actualización ascendente
const OrderUpdatedAsc = (table) => {
  table.sort(function(a,b) {
    if(a.updatedAt<b.updatedAt){
      return -1;
    }
    if(a.updatedAt>b.updatedAt){
      return 1;
    } 
    return 'error';                                         
  });
};

export { OrderIdAsc, 
         OrderNameAsc,
         OrderLastNameAsc,
         OrderCreatedAsc,
         OrderUpdatedAsc
       } 