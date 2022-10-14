import {useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
import "./styles/styles.css";

function Searcher() {

  const history=useHistory()

  const submitHandler= e =>{
    e.preventDefault();
    const keyword=e.currentTarget.keyword.value.trim();

    if(keyword.length < 4){
      Swal.fire({
        icon: "warning",
        title: "Tenés que escribir una palabra de más de 3 letras",
        timer:1000,
        showConfirmButton:false
      })
    } else {
      e.currentTarget.keyword.value='';
      history.push(`/searchResults?keyword=${keyword}`);
    }
  }

  return (
  <form className="displayFlex" onSubmit={submitHandler}>
    <label className=" form-label mx-1 mb-1 ">
      <input className="inputSearcher colorBlack centerText " type="text" name="keyword" placeholder="  noticia a buscar...">
      </input>
    </label>
    <button className="btn btn-sucess mx-5 mb-1 " type="submit"> Buscar</button>
  </form>
  )
}

export default Searcher;
