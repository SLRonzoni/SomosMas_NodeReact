import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


const MembersOne = (props) => {

  const { id } = props.match.params;

  const [members, setMembers] = useState({
    id: "",
    name: "",
    image:"",
    description:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:"",
    createdAt:"",
    updatedAt:""
  });
 
  useEffect(() => {
    const getMembers = async () => {
      await axiosClient.get(`/members/update/${id}`)
      .then((response) => {
          setMembers(response.data);
          
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getMembers();
  }, [id]);



  return (

    <Fragment  >
      <br></br> 
        <div >
        <div className="containerEditGender">         
           <Card.Text className="card-text-edit-gender center"> 
           <br></br>
           <h5 className="text colorBlack" >Colaborador </h5>   
           </Card.Text>
           
           <Card.Img className='photo 'src={members.image}   alt="categoria"></Card.Img>
            <div className="list-group-char">
                <div className="list-group-char" >
                  Nombre :
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={members.name}
                    />
                    <br></br>
                  Imágen :
                  <input
                    type="file"
                    className="form-control"
                    encType="multipart/form-data"
                    name="image"
                    //placeholder="Seleccione la imágen"
                    defaultValue={members.image}
                    />
                  <br></br>
                  Descripción :
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    defaultValue={members.description}
                  />
                  <br></br>
                  Facebook :
                  <input
                    type="text"
                    className="form-control"
                    name="facebookUrl"
                    defaultValue={members.facebookUrl}
                  />
                  <br></br>
                  Instagram :
                  <input
                    type="text"
                    className="form-control"
                    name="instagramUrl"
                    defaultValue={members.instagramUrl}
                  />
                  <br></br>
                  Linkedin :
                  <input
                    type="text"
                    className="form-control"
                    name="linkedinUrl"
                    defaultValue={members.linkedinUrl}
                  />
                </div>

                <div >
                  <Link
                      to={"/MembersAll"}
                      className="m-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                </div>
                <br></br>
            </div>  
          </div>              
</Fragment>

  );
};

export default MembersOne;