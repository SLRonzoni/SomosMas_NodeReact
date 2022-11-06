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
      <div className="containerActivities">
        <div className="containerSlideSize" >
          {/* si aun está cargando actividades*/}
          {!activities &&  <LoadingBox/> }

          {/* solo renderiza si hay actividades*/}
          {activities && 
            <>
              <div className="mt-5">
                <h3 className="centerText h3Activities">Actividades</h3>
                <Carousel  >
                  {activities.map((oneActivity) => ( 
                  <Carousel.Item key={oneActivity.id}>
                    <img className=" imageActivity" src={oneActivity.image} alt="Slide" />
                    <br></br>
                    <Card.Title>
                      <h4 className="centerText h4SlideActivity">{oneActivity.name}</h4>
                    </Card.Title>
                    <div> 
                      <h6 className="h6SlideActivity" >{oneActivity.content}</h6>
                    </div>
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