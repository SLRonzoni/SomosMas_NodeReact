import Swal from "sweetalert2";

function Searcher() {

  const submitHandler= e =>{
    e.preventDefault();
    const keyword=e.currentTarget.keyword.value.trim();

    if(keyword.length < 4){
      Swal.fire({
        icon: "warning",
        title: "Tienes que escribir una palabra de más de 3 letras",
        timer:1000,
        showConfirmButton:false
      })
    }
  }

  return (
  <form className="d-flex align-items-center" onSubmit={submitHandler}>
    <label className="form-label mb-0  mx-2">
      <input className="form-control" type="text" name="keyword" placeholder="palabra a buscar...">
      </input>
    </label>
    <button className="btn btn-sucess" type="submit">Buscar</button>
  </form>
  )
}

export default Searcher;
