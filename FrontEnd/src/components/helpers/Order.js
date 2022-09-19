//ordenar alfabeticamente ascendente
const OrderAsc = (table) => {
    table.sort(function(a,b) {
    if(a.name<b.name){
      return -1;
    }
    if(a.name>b.name){
     return 1;
    } return 'error';                                         
  });
}

export default OrderAsc