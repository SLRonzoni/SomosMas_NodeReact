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
      await axiosClient.get(`/members/${id}`)
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
        <div className="containerUpdateCreate containerBorderWhiteBgGrey">         
           <Card.Text className="card-text-edit-gender center"> 
           <br></br>
           <h5 className="text colorBlack" >Colaborador </h5>   
           </Card.Text>
           
           <Card.Img className='photo 'src={members.image}   alt="member"></Card.Img>
            <div className="list-group-char">
                <div className="list-group-char" >
                  Nombre :
                  <p
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={members.name}
                    />
                    <br></br>
                  Imágen :
                  <p
                    type="image"
                    className="form-control"
                    encType="multipart/form-data"
                    name="image"
                    defaultValue={members.image}
                    />
                  <br></br>
                  Descripción :
                  <p
                    type="text"
                    className="form-control"
                    name="description"
                    defaultValue={members.description}
                  />
                  <br></br>
                  Facebook :
                  <p
                    type="text"
                    className="form-control"
                    name="facebookUrl"
                    defaultValue={members.facebookUrl}
                  />
                  <br></br>
                  Instagram :
                  <p
                    type="text"
                    className="form-control"
                    name="instagramUrl"
                    defaultValue={members.instagramUrl}
                  />
                  <br></br>
                  LinkedIn :
                  <p
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