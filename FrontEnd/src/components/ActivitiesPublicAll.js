import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { Container, Card, Carousel } from "react-bootstrap";

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
    <Fragment >
      <Container className="bgWhite containerSlideSize" >
      {/* si aun está cargando actividades*/}
      {!activities &&  <LoadingBox/> }

      {/* solo renderiza si hay actividades*/}
      {activities && 
        <>
        <div >
          <br></br>
          <div >
            <h1 className="colorBlack">Nuestras actividades...</h1>
          </div>
          
          <div>
            <div className='container' >
              <div className="row d-flex-inline justify-content-center mt-6">  
                <div className="col-6">
                  <div>
                    <div>
                      <Carousel className="colorBlack" >
                        {activities.map((oneActivity) => ( 
                        <Carousel.Item key={oneActivity.id}>
                          <img className="d-block w-100 centerText" src={oneActivity.image} alt="Slide" />
                          <Card.Title >
                            <h3 className="centerText colorBlack">{oneActivity.name}</h3>
                          </Card.Title>
                          <Card.Text> 
                            <h5 className="centerText colorBlack" >{oneActivity.content}</h5>
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
      </Container>
    </Fragment>
    </>
  );
};

export default ActivitiesPublicAll;