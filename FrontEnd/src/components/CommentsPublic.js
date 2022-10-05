import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';

function CommentsPublic () {

    const [news,setNews]=useState([
      { id:"",
        name:"",
        image:"",
        content:"",
        categoryId:"",
        categoryName:"",
        comments:[] 
      }
    ]);

    const [comments,setComments]=useState([]);


    //GET NEWS
    const getNews=async () => {
      await axiosClient.get(`/news`)
      .then ( response =>{
        setNews(response.data.data) 
       
      }) 
      .catch (
        error => console.log(error)
      );
    };

    
    //FIND CATEGORY NAME ( added name to news state)
    const findCategoryName=async () => { 
      for(let i=0;i<news.length;i++) {
        let idCategory=news[i].categoryId
          await axiosClient.get(`/categories/public/${idCategory}`)
            .then ( response =>{             
              news[i].categoryName=response.data.name            
            }) 
            .catch (
              error => console.log(error)
            )
      };
    };
     
    //GET COMMENTS
    const getComments=async () => {
      await axiosClient.get(`/comments`)
        .then ( response =>{
          setComments(response.data.data) 
        }) 
        .catch (
            error => console.log(error)
        );
    };

    //ADD COMMENTS TO NEWS
     const addComments=async () => { 
      for(let i=0;i<news.length;i++) {
        for(let j=0;j<comments.length;j++) {
          if(comments[j].news_id===news[i].id){
            news[i].comments=[...comments,comments[j]]
          }
        }     
      };
    };
    
    //FIND USER NAME ( added name to comments)
    const findUserName=async () => { 
      for(let j=0;j<comments.length;j++) {
          let idUser=comments[j].user_id
            await axiosClient.get(`/users/${idUser}`)
              .then ( response =>{
                comments[j].firstName=response.data.firstName
                comments[j].lastName=response.data.lastName
              }) 
              .catch (
                error => console.log(error)
              )
      }; 
    };
    
   
    
    findCategoryName();
    findUserName();
    addComments();
     

    useEffect(() => {
      getComments();
      getNews();
    },[]);  
    
  
   
    console.log('news',news)
  
    return(
       <>
       <div className='container centrar'>
       
       {news.map((oneResult) => {
       
            return (
              <div className='' key={oneResult.id} >
                
                 <br></br> <br></br>
                 <h2><b><u>Noticia</u></b> : {oneResult.name} </h2>
                 <br></br>
                <div className=''>
                  <div className='col-6'>
                    <img  className="imgSearchNews" src={oneResult.image}alt="Imagen"></img> 
                  </div>
                  
                  <div className='col-6'>
                    <div >
                      <h5 className="searchAlign"><b><u>Categoría</u></b> : {oneResult.categoryName}</h5>
                       <br></br>
                      <h4 className="searchAlign"><b><u>Reseña</u></b> : {oneResult.content}</h4>  
                    </div> 
                    <br></br> 

                    <div>
                      <table className="table table-responsive  ">
                        <thead>
                          <tr>
                            <th className="titleItem "> Usuario  </th>
                            <th className="titleItem "> Comentario </th>
                            <th className="titleItem "> Creado</th>
                          </tr>
                        </thead> 

                       <tbody>                        
                          {comments.map((oneComment) => {
                            return (    
                            <tr key={oneComment.id}>
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