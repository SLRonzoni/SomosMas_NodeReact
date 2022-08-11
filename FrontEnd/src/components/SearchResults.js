import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';

function WordSearchResults () {

    const [news,setNews]=useState([]);
        
    let query = new URLSearchParams(window.location.search)
    let keyword=query.get('keyword')  

    //SEARCH WORD
    const findKeyword=async () => {
      await axiosClient.get(`/news?name=${keyword}`)
      .then ( findKeyword =>{
        setNews(findKeyword.data)
      }) 
      .catch (
        error => console.log(error)
      );
    };

    //FIND CATEGORY NAME ( added name to news state)
    const findCategoryName=async () => { 
       for(let i=0;i<news.length;i++) {
         let idCategory=news[i].categoryId
           await axiosClient.get(`/categories/${idCategory}`)
             .then ( response =>{
               if(response.data.id===idCategory){
                 news[i].categoryName=response.data.name
               }
             }) 
             .catch (
               error => console.log(error)
             )
       };
    };
    
    //FIND USER NAME ( added name to comments state)
    const findUserName=async () => { 
      for(let j=0;j<news.length;j++) {
        for(let i=0;i<news[j].comments.length;i++) {
          let idUser=news[j].comments[i].user_id
            await axiosClient.get(`/users/${idUser}`)
              .then ( response =>{
                if(response.data.id===idUser){
                  news[j].comments[i].firstName=response.data.firstName
                  news[j].comments[i].lastName=response.data.lastName
                }
              }) 
              .catch (
                error => console.log(error)
              )
        } 
      }
    };
   
    useEffect(() => {
      findKeyword() 
    },[keyword]); 

    findUserName();
    findCategoryName();

    //FORMAT DATE
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }

    return(
       <>
       <div className='container centrar'>
       
       {news.length===0 && <h3>No se hallaron resultados</h3>}
       
       {news.map((oneResult) => {
       
            return (
              <div className='' key={oneResult.id} >
                
                 <br></br> <br></br>
                 <h2><b><u>Noticia</u></b> : {oneResult.name} </h2>
                 <br></br>
                <div className='row'>
                  <div className='col-6'>
                    <img  className="img-search-news" src={oneResult.image}alt="Imagen"></img> 
                  </div>
                  
                  <div className='col-6'>
                    <div >
                      <h5 className="search-align"><b><u>Categoría</u></b> : {oneResult.categoryName}</h5>
                       <br></br>
                      <h4 className="search-align"><b><u>Reseña</u></b> : {oneResult.content}</h4>  
                    </div> 
                    <br></br> 

                    <div>
                      <table className="table table-striped table-responsive  ">
                        <thead>
                          <tr>
                            <th className="tituloItem "> Usuario  </th>
                            <th className="tituloItem "> Comentario </th>
                            <th className="tituloItem "> Creado</th>
                          </tr>
                        </thead> 

                        <tbody>                        
                          {oneResult.comments.map((oneComment) => {
                            return (    
                            <tr key={oneComment.user_id}>
                              <td className="" >{oneComment.firstName} {oneComment.lastName}</td>
                              <td className="" >{oneComment.body}</td>
                              <td className="" >{formatDate(new Date(oneComment.createdAt))}</td>                       
                            </tr>
                            )} 
                         )}
                          </tbody>
                      </table>    
                    </div>

                </div>
              </div>
            </div>
          )
       })} 
      </div>
      </>
    )
}

export default WordSearchResults;