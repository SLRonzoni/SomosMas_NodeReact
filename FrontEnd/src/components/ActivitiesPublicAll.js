import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import "./styles/activity.css";
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { Card, Carousel } from "react-bootstrap";

const ActivitiesPublicAll = (props) => { 

  const [activities, setActivities] = useState([]); 
  
  const getActivities = async () => {     
     await axiosClient.get(`/activities/public`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setActivities(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };
 
  useEffect(() => {
    getActivities()
  },[]);


  return (
    <>
      <div className="container ">
        <div className="containerSlideSize" >
          {/* si aun está cargando actividades*/}
          {!activities &&  <LoadingBox/> }

          {/* solo renderiza si hay actividades*/}
          {activities && 
            <>
              <div className="col-12">
                <h3 className="centerText ">Actividades</h3>
                <Carousel  >
                  {activities.map((oneActivity) => ( 
                  <Carousel.Item key={oneActivity.id}>
                    <img className=" imageActivity d-bloque w-100" src={oneActivity.image} alt="Slide" />
                    <br></br>
                    <Card.Title>
                      <h4 className="centerText h4SlideActivity">{oneActivity.name}</h4>
                    </Card.Title>
                    <Card.Text> 
                      <p className="centerText h6SlideActivity" >{oneActivity.content}</p>
                    </Card.Text>
                    <br></br>
                  </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default ActivitiesPublicAll;