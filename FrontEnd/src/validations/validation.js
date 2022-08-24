
import {categoryName,categoryDescription} from '../components/helpers/RegExp';


const validationCategories = (inputValidation, files) => {

  let errors={};
 
  if(!inputValidation.categoryName){
    errors.name="El nombre es obligatorio"
  };

  if(!categoryName.test(inputValidation.name.trim())){
    errors.name="El nombre puede contener hasta 50 dígitos entre letras, espacios y acentos"
  };

  if(!files){
    errors.image="La imágen es obligatoria"
  }; 

  if(!categoryDescription.test(inputValidation.description.trim())){
    errors.description="La descripción puede contener hasta 200 dígitos entre letras, números, espacios y acentos"
  };
  
  return errors ;
}

export default validationCategories;