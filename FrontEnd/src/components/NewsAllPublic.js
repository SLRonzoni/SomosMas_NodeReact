import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";

function NewsAllPublic() {

  const [news, setNews] = useState([]);

  
  //FIND NEWS
  const findNews = async () => {
    await axiosClient
      .get('/news')
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    findNews()
  }, []);
 
  return (
    <>
      <div className='container centrar'>
        {news.map((oneResult) => {
          return (
            <div className="container centrar">
              <div className='containerSearchNews' key={oneResult.id}>               
                <div className='displayFlex'>

                  <div className='col-6 marginLeft40px'>
                    <img className='imgSearchNews'src={oneResult.image} alt='Imagen'></img>
                  </div>

                  <div className='col-6 marginRigth-80px '>
                    <div>
                      <h2> {oneResult.name} </h2>
                      <br></br>
                      <h4 className='searchAlign '> {oneResult.content}</h4>
                      <br></br>
                      <span className='dateComment'>Actualizada : {formatDate(new Date(oneResult.createdAt))}</span>
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

export default NewsAllPublic;
