import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/news-comments.css";
import "./styles/tableMediaScreen.css";
import NewsAllLine from "./NewsAllLine";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";
import * as FaIcons from 'react-icons/fa';

const NewsAll = (props) => { 

  const [news, setNews] = useState([]); 
  
  const getNews = async () => {     
     await axiosClient.get(`/news`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
          
        props.history.push('/');
        }
        setNews(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta noticia ? ",
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
    await axiosClient.delete(`/news/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Noticia eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getNews();
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
    getNews()
  },[]);


  //FILTER BY NAME,  UPDATED DATE AND CATEGORY
  let filterBy;
  let numbers=[1,2,3,4,5,6,7,8,9,0]
  let route;
  const getFilterNews = async () => {

    if(filterBy.includes(':')===true){
        route='/news/byDate/'    
    } else {
        if(numbers.some(e=>filterBy.includes(e))) {
          route='/news/byCategory/'
        } else {
          route='/news/byName/'
        }
    };
    await axiosClient.get(route+filterBy)
    .then((response) => {
      setNews(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todas'){
          getNews() 
        } else {
          getFilterNews()   
    };
  } 

 
  const showNews = () => {
    return (
      <tbody >
        {news.map((oneNew) => (
          <NewsAllLine 
            key={oneNew.id}
            id={oneNew.id}
            name={oneNew.name}
            image={oneNew.image}
            content={oneNew.content}
            categoryId={oneNew.categoryId}
            create={oneNew.createdAt}
            update={oneNew.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))

  return (
    <>
      <div className="containerFirst">  
      {!token && <Redirect to="/Login" />} 
      {!news &&  <LoadingBox/> }
      {news && 
      
      <>
      <div className="centerText">
        <h3 className="containerTitle">Listado de Noticias</h3>
        <div className="d-flex centerText" >
          <div>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="name"
                onChange={changesId}
              >  
                {news.map(oneNew => (
                  <option className='colorBlack'key={oneNew.id} value={oneNew.name}>
                    {oneNew.name}
                  </option>
                )).sort(OrderNameAsc(news))}
                <option className='colorBlack'value={"todas"}>Mostrar todas las noticias (por nombre)</option>
              </select>
          </div> 
          
          <div >
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {news.map(oneNew => (
                  <option className='colorBlack'key={oneNew.id} value={oneNew.updatedAt}>
                    {formatDate(new Date(oneNew.updatedAt))}
                  </option>
                ))}
                <option className='colorBlack'value={"todas"}>Noticias (por fecha de actualización)</option>
              </select>
          </div> 

          <div>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="categoryId"
                onChange={changesId}
              >  
                {news.map(oneNew => (
                  <option className='colorBlack'key={oneNew.id} value={oneNew.categoryId}>
                    {oneNew.categoryId}
                  </option>
                ))}
                <option className='colorBlack'value={"todas"}>Mostrar todas las noticias (por categoría)</option>
              </select>
          </div> 

        </div> 

        <div>
          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th className="tituloItem centerText "> Id </th>
                <th className="tituloItem "> Imágen </th>
                <th className="tituloItem "> Noticia </th>
                <th className="tituloItem "> Categoría </th>
                <th className="tituloItem "> Contenido </th>
                <th className="tituloItem centerText"> Creada</th>
                <th className="tituloItem centerText"> Actualizada</th>

                <th className="centerText" >
                  <Link to={'/NewsCreate'} className="m-1">
                    <FaIcons.FaPlusSquare className="iconBlue"/> 
                  </Link> 
                </th>
              </tr>
            </thead>

            {showNews()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default NewsAll;

