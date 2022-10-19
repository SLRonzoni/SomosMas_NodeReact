import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";

function WordSearchResults() {

  const [news, setNews] = useState([]);
  const [newsComplete, setNewsComplete] = useState([]);
  
  let query = new URLSearchParams(window.location.search);

  let keyword = query.get("keyword");

  
  //SEARCH WORD
  const findKeyword = async () => {
    await axiosClient
      .get(`/news/byName/${keyword}`)
      .then((findKeyword) => {
        setNews(findKeyword.data);
        setNewsComplete(findKeyword.data);                                        
      })
      .catch((error) => console.log(error));
  };

  
  //FIND CATEGORY NAME ( added name to news state)
  const findCategoryName = async () => {
    for (let i = 0; i < news.length; i++) {
      let idCategory = news[i].categoryId;
      await axiosClient
        .get(`/categories/public/${idCategory}`)
        .then((response) => {       
          news[i].categoryName = response.data.name || "";
        })
        .catch((error) => console.log(error));
    }
  };
  findCategoryName();

 // FIND DATA USERS  ( added data users to comments)
  const findUserData = async () => {
    for (let i = 0; i < news.length; i++) {
      for (let j = 0; j < news[i].comments.length; j++) {
        let idUser = news[i].comments[j].user_id;
        await axiosClient.get(`/users/${idUser}`)
          .then((response) => {
            news[i].comments[j].userImage = response.data.photo || "";
            news[i].comments[j].firstName = response.data.firstName || "";
            news[i].comments[j].lastName = response.data.lastName || "";
          })
          .catch((error) => console.log(error));
      }
    }
  };
  findUserData();

  
  useEffect(() => { 
    findKeyword();
  }, [keyword]);

  return (
    <>
    <br></br>
    <h4><em>Palabra buscada</em> : {keyword}</h4>
    
    <div className='container centrar'>   
    
      <div>          
        {newsComplete.length===0 && <h5> ☹️ No se hallaron resultados  </h5>}
      </div>
                 
        {newsComplete.map((oneResult) => {
          return (
            <div className="container centrar"key={oneResult.id}>
              <div className='containerSearchNews' >
                
                <div>
                  <br></br>
                  <div className='displayFlex'>

                    <div className='col-6 marginLeft40px'>
                      <img
                        className='imgSearchNews'
                        src={oneResult.image}
                        alt='Imagen'
                      ></img>
                    </div>

                    <div className='col-6 marginRigth-80px '>
                      <div>
                        <h2> {oneResult.name} </h2>
                        <h5 className='searchAlign '>( {oneResult.categoryName} )</h5>
                        <br></br>
                        <h4 className='searchAlign '> {oneResult.content}</h4>
                      </div>

                      <br></br>
                      <div>
                        {oneResult.comments.length===0 && 
                            <div className="userComments" >
                              <span>sin comentarios</span>
                            </div>
                        }

                        {oneResult.comments.map((oneComment) => {
                          return (
                            <div className="userComments" key={oneComment.id}>
                              <div >
                                <img className='imageComment' src={oneComment.userImage} alt="user"></img>
                                <span className=''> {oneComment.firstName} {oneComment.lastName}</span>
                              </div>
                              <div>                              
                                <br></br>
                                <span className=''>{oneComment.body}</span>
                                <span className='dateComment'> {formatDate(new Date(oneComment.createdAt))}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WordSearchResults;
