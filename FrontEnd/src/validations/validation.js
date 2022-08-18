import {regularExpresions} from '../components/elements/RegExp';

const validationCategories = (categories, files) => {

  let errors={};
 
  if(!categories.name){
    errors.name="El nombre es obligatorio"
  };

  if(!regularExpresions.name.test(categories.name)){
    errors.name="El nombre puede contener hasta 50 dígitos entre letras, espacios y acentos"
  };

  if(!files){
    errors.image="La imágen es obligatoria"
  }; 

  if(!regularExpresions.description.test(categories.description)){
    errors.description="La descripción puede contener hasta 200 dígitos entre letras, números, espacios y acentos"
  };

  
  return  errors;
}

export default validationCategories;