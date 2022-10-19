import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
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
    <div className="container centerText">
  
      <div className="containerSlideSize" >
      {/* si aun está cargando actividades*/}
      {!activities &&  <LoadingBox/> }

      {/* solo renderiza si hay actividades*/}
      {activities && 
        <>
        <div>
          <div>
            <br></br><br></br>
            <h1>Nuestras actividades</h1>
          </div>
          
          <div>
            <div className='' >
              <div className="d-flex-inline justify-content-center mt-6">  
                <div className="col-12">
                  <div>
                    <div>
                      <Carousel  >
                        {activities.map((oneActivity) => ( 
                        <Carousel.Item key={oneActivity.id}>
                          <br></br>
                          <br></br>
                          <img className=" imageActivity " src={oneActivity.image} alt="Slide" />
                          <Card.Title >
                            <h4 className="centerText ">{oneActivity.name}</h4>
                          </Card.Title>
                          <Card.Text> 
                            <h6 className="centerText " >{oneActivity.content}</h6>
                            <br></br> 
                          </Card.Text>
                        </Carousel.Item>
                        ))}
                      </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        }
    </div>
    </div>
    </>
  );
};

export default ActivitiesPublicAll;