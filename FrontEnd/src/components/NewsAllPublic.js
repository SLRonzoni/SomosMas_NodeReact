import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";
import "./styles/news-comments.css";

function NewsAllPublic() {

  const [news, setNews] = useState([]);
  
  const findNews = async () => {
    await axiosClient.get('/news')
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
      <div className='containerFirst containerNews'>
        {news.map((oneResult) => {
          return (
            <div className='containerSearchNews ' key={oneResult.id}>               
              <div className='d-flex'>
                <img className='imgSearchNews'src={oneResult.image} alt='Imagen'></img>
                <div className='m-5'>
                    <h4> {oneResult.name} </h4>
                    <p className='searchAlign'> {oneResult.content}</p>
                    <br/>
                    <span className='dateComment'>Actualizada : {formatDate(new Date(oneResult.createdAt))}</span>
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
