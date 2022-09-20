import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import TestimonialsAllLine from "./TestimonialsAllLine";
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";

const TestimonialsAll = (props) => { 

  const [testimonials, setTestimonials] = useState([]); 
  
  const getTestimonials = async () => {     
     await axiosClient.get(`/testimonials`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
          
        props.history.push('/');
        }
        setTestimonials(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este testimonio ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    })
    .then((result) => {
      if (result.value) {
        removing(id);
      }
    });
  };

  const removing = async (id) => {
    await axiosClient.delete(`/testimonials/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Testimonio eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getTestimonials();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };

  useEffect(() => {
    getTestimonials()
  },[]);


  //FILTER BY NAME AND CREATED DATE
  let filterBy;
  let route;
  const getFilterTestimonials = async () => {
    if(filterBy.includes(':')===true){
      route='/testimonials/byDate/'
    } else {
      route='/testimonials/byName/'
    };
    await axiosClient.get(route+filterBy)
    .then((response) => {
      setTestimonials(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
      filterBy=e.target.value;
      if(filterBy === 'todos'){
        getTestimonials() 
      } else {
        getFilterTestimonials()   
    };
  } 

 
  const showTestimonials = () => {
    return (
      <tbody >
        {testimonials.map((oneTestimonial) => (
          <TestimonialsAllLine
            key={oneTestimonial.id}
            id={oneTestimonial.id}
            name={oneTestimonial.name}
            image={oneTestimonial.image}
            content={oneTestimonial.content}
            create={oneTestimonial.createdAt}
            update={oneTestimonial.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <Fragment>
      <Container>
      {/* si aun está cargando los testimonios*/}
      {!testimonials &&  <LoadingBox/> }

       {/* solo renderiza si hay testimonios*/}
      {testimonials && 
      <>
      <div>
        <h1 >Testimonios</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="displayFlex centerText" >
          
          <div>
            <p className="pBtnDesplegable" >Buscar testimonios por nombre</p>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="name"
                onChange={changesId}
              > 
                {testimonials.map(oneTestimonial => (
                  <option key={oneTestimonial.id} value={oneTestimonial.name}>
                    {oneTestimonial.name}
                  </option>
                )).sort(OrderNameAsc(testimonials))}
                <option value={"todos"}>Mostrar todos los testimonios</option>
              </select>
          </div> 
          
          <div >
            <p className="pBtnDesplegable " >Buscar testimonios por fecha de creación</p>
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {testimonials.map(oneTestimonial => (
                  <option key={oneTestimonial.id} value={oneTestimonial.createdAt}>
                    {formatDate(new Date(oneTestimonial.createdAt))}
                  </option>
                ))}
                <option value={"todos"}>Mostrar todos los testimonios</option>
              </select>
          </div>
        </div> 

      <table className="table table-striped table-responsive table-bordered">
        <thead>
          <tr>
            <th className="tituloItem centerText "> Id </th>
            <th className="tituloItem "> Testimonio </th>
            <th className="tituloItem "> Imágen </th>
            <th className="tituloItem "> Contenido </th>
            <th className="tituloItem centerText"> Creado</th>
            <th className="tituloItem centerText"> Actualizado</th>

            {/* <th className="centerText" ><Link to={'/TestimonialsCreate'} className="m-1 mr-md-2 btn btn-success"
                  role="button" > Agregar </Link> 
            </th> */}
          </tr>
        </thead>
        {showTestimonials()}
      </table>
      </>
      } 
      </Container>
    </Fragment>
  );
};

export default TestimonialsAll;
