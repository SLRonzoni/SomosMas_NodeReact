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
  <form className="d-flex align-items-center" onSubmit={submitHandler}>
    <label className=" form-label mx-2 mb-0 ">
      <input className="borderRounded colorBlack" type="text" name="keyword" placeholder="  palabra a buscar...">
      </input>
    </label>
    <button className="btn btn-sucess mx-1 mb-1" type="submit"> Noticias</button>
  </form>
  )
}

export default Searcher;
