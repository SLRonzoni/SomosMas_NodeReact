import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";

function NewsAllPublic() {

  const [news, setNews] = useState([]);
  const [newsComplete, setNewsComplete] = useState([]);

  
  //FIND NEWS
  const findNews = async () => {
    await axiosClient
      .get('/news')
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  
//   //FIND CATEGORY NAME ( added name to news state)
//   const findCategoryName = async () => {
//     for (let i = 0; i < news.length; i++) {
//       let idCategory = news[i].categoryId;
//       await axiosClient
//         .get(`/categories/public/${idCategory}`)
//         .then((response) => {       
//           news[i].categoryName = response.data.name || "";
//         })
//         .catch((error) => console.log(error));
//     }
//   };
//   findCategoryName();
 

  const finalNews = ()=>{
    findNews();
    setNewsComplete(news);
  };
  
  useEffect(() => { 
    finalNews();
  }, []);

console.log('newsComplete',newsComplete)
 
  return (
    <>
      <div className='container centrar'>

        {newsComplete.map((oneResult) => {
          
          return (
            <div className='containerSearchNews' key={oneResult.id}>
              
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
                      {/* <h5 className='searchAlign '>( {oneResult.categoryName} )</h5> */}
                      <br></br>
                      <h4 className='searchAlign '> {oneResult.content}</h4>
                    </div>

                    <br></br>
                    
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

export default NewsAllPublic;
