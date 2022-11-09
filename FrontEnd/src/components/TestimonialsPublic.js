import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';
import { Link } from 'react-router-dom';
import "./styles/styles.css";
import "./styles/testimonial.css";

function TestimonialsPublic () {

    const [testimonials,setTestimonials]=useState([]);
    const [testimonialsComplete,setTestimonialsComplete]=useState([]);

    const getTestimonials=async () => {
        await axiosClient.get(`/testimonials/public`)
            .then ( response =>{
            setTestimonials(response.data.data)
            // setTestimonialsComplete(response.data.data)
        }) 
        .catch (error => 
            console.log(error)
        );
    };


    //OBTENER NOMBRE, APELLIDO Y FOTO DEL USUARIO
    const getUser=async () => {
        for (let i = 0; i <testimonials.length; i++) {
            let user_id = testimonials[i].userId;
            await axiosClient.get(`/users/${user_id}`)
              .then((response) => {     
                testimonials[i].firstName = response.data.firstName;
                testimonials[i].lastName = response.data.lastName;
                testimonials[i].photo = response.data.photo;
              })
              .catch (
                error => console.log(error)
              );
        }
    };
    getUser();
    

    useEffect(() => {
      getTestimonials()  
    },[]); 

    return(
        <>
            <div className='containerBasic containerTestimonials'>
                <div className='m-5'>
                    <Link to={'/TestimonialsCreate'} className=" btn btn-success" role="button" > Dar mi testimonio </Link> 
                </div>

                <div className='containerBasic d-flex'>
                    {testimonials.map((oneResult) => {
                        return (
                            <div key={oneResult.id}  >
                                <br></br>
                                <div className=' borderRounded rowTestimonialsAndComments '>
                                    <div>
                                        <img className="imgTestimonialsAndComments" src={oneResult.image}alt="ImagenTestimonio"></img> 
                                    </div>
                                    
                                    <div className=' widthTestimonialsAndComments '>
                                        <div className='pTestimonialsPublic'>
                                            <h3>{oneResult.name} </h3>
                                        </div>   
                                        <div>
                                            <p className='pTestimonialsPublic'> {oneResult.content}</p>  
                                            <br></br> 
                                            <div className='d-flex'>
                                                <img className=" imageMyProfile" src={oneResult.photo} alt="user"></img> 
                                                <p>{oneResult.firstName}</p>
                                                <span className="colorTransparent">......</span>
                                                <p className='dateComment centerText '>Fecha : {formatDate(new Date(oneResult.createdAt))}</p>   
                                            </div>                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            </div>
       </>
    )
 };

export default TestimonialsPublic;