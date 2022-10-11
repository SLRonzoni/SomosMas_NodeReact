import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';

function CommentsPublic () {
    
  const [news, setNews] = useState([]);
  const [newsComplete, setNewsComplete] = useState([]);


    //GET NEWS
    const getNews=async () => {
      await axiosClient.get(`/news`)
      .then ( response =>{
        setNews(response.data.data) 
        setNewsComplete(news)  
      }) 
      .catch (
        error => console.log(error)
      );
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

     //GET COMMENTS BY NEWS
     const getComments=async () => {
      for (let i = 0; i < news.length; i++) {
        let id = news[i].id;
        await axiosClient.get(`/news/${id}/comments`)
        .then ( response =>{
          news[i].comments=response.data.comments
        }) 
        .catch (
          error => console.log(error)
        );
      }
    };
    getComments();
         
    //FIND DATA USERS  ( added data users to comments)
    const findUserData = async () => {
      for (let i = 0; i < news.length; i++) {
       if(news[i].comments){
        for (let j = 0; j < news[i].comments.length; j++) {
          let idUser = news[i].comments[j].user_id;
          await axiosClient
            .get(`/users/${idUser}`)
            .then((response) => {
              news[i].comments[j].userImage = response.data.photo || "";
              news[i].comments[j].firstName = response.data.firstName || "";
              news[i].comments[j].lastName = response.data.lastName || "";
              
            })
            .catch((error) => console.log(error));
        }
       } 
      }
    };
    findUserData();

    
    useEffect(() => { 
      getNews()
      // setNewsComplete(news)  
    }, []);
    
    return (
      <>
        <div className='container'>
  
          {newsComplete.map((oneResult) => {
            
            return (
              <div className="container">
              <div className='containerSearchNews' key={oneResult.id}>
                
                <div className='containerItemSearchNews'>
                  <br></br>
                  <div className='container displayFlex'>
                    <div className='col-4 marginLeft40px'>
                      <img
                        className='imgSearchNews'
                        src={oneResult.image}
                        alt='Imagen'
                      ></img>
                    </div>
  
                    <div className='col-6 '>
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
                              <div  >
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
                <br></br>
              </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

export default CommentsPublic;