import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';
import { Link } from 'react-router-dom';
import "./styles/styles.css";
import "./styles/testimonial.css";
import LoadingBox from './LoadingBox';

const TestimonialsPublic =() =>{

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
            <div className='containerFirst'>
            {!testimonials &&  <LoadingBox/> }
            {testimonials && 
             <>
                <div className='buttonTestimonials mb-5'>
                    <Link to={'/TestimonialsCreate'} className=" btn buttonGreen" role="button" > Dar mi testimonio </Link> 
                </div>

                <div className="containerTestimonials">
                    {testimonials.map((oneResult) => {
                        return (
                            <div key={oneResult.id}>
                               
                                <div className='cardTestimonialsAndComments '>
                                   
                                    <img className="imgTestimonialsAndComments" src={oneResult.image}alt="ImagenTestimonio"></img> 
                                    
                                    <div className='widthTestimonialsAndComments '>
                                        <h3 className='pTestimonialsPublic'>{oneResult.name} </h3>
                                        <div>
                                            <p className='pTestimonialsPublic mb-5'> {oneResult.content}</p>  
                                           
                                            <div className='userTestimonials'>
                                                <div className='d-flex'>
                                                    <img className="imageUserTestimonials" src={oneResult.photo} alt="user"></img> 
                                                    <p>{oneResult.firstName +"  " + oneResult.lastName}</p>
                                                </div>   
                                                <p className='dateTestimonials'>Fecha : {formatDate(new Date(oneResult.createdAt))}</p>   
                                            </div>                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
               
                </div>
                </> 
                }
                
            </div>
       </>
    )
 };

export default TestimonialsPublic;