import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';

function CommentsPublic () {

    const [news,setNews]=useState([]);

    const getNews=async () => {
      await axiosClient.get(`/news`)
      .then ( response =>{
        console.log(response.data)
        setNews(response.data)
      }) 
      .catch (
        error => console.log(error)
      );
    };

    useEffect(() => {
      getNews() 
    },[]); 

    // //FIND CATEGORY NAME ( added name to news state)
    // const findCategoryName=async () => { 
    //    for(let i=0;i<news.length;i++) {
    //      let idCategory=news[i].categoryId
    //        await axiosClient.get(`/categories/${idCategory}`)
    //          .then ( response =>{
    //            if(response.data.id===idCategory){
    //              news[i].categoryName=response.data.name
    //            }
    //          }) 
    //          .catch (
    //            error => console.log(error)
    //          )
    //    };
    // };
    
    // //FIND USER NAME ( added name to comments state)
    // const findUserName=async () => { 
    //   for(let j=0;j<news.length;j++) {
    //     for(let i=0;i<news[j].comments.length;i++) {
    //       let idUser=news[j].comments[i].user_id
    //         await axiosClient.get(`/users/${idUser}`)
    //           .then ( response =>{
    //             if(response.data.id===idUser){
    //               news[j].comments[i].firstName=response.data.firstName
    //               news[j].comments[i].lastName=response.data.lastName
    //             }
    //           }) 
    //           .catch (
    //             error => console.log(error)
    //           )
    //     } 
    //   }
    // };
   
    // findUserName();
    // findCategoryName();
  
    return(
       <>
       <div className='container centrar'>
       
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
                            <th className="titleItem "> Usuario  </th>
                            <th className="titleItem "> Comentario </th>
                            <th className="titleItem "> Creado</th>
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

export default CommentsPublic;