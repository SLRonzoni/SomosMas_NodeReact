import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';

function TestimonialsPublic () {

    const [testimonials,setTestimonials]=useState([]);

    const getTestimonials=async () => {
      await axiosClient.get(`/testimonials/public`)
      .then ( response =>{
        console.log(response.data)
        setTestimonials(response.data.data)
      }) 
      .catch (
        error => console.log(error)
      );
    };

    useEffect(() => {
      getTestimonials() 
    },[]); 

      
    return(
        <>
        <div className='container '>
            {testimonials.map((oneResult) => {
                return (
                    <div className='' key={oneResult.id} >
                        <br></br>
                        <div className=' borderRounded rowTestimonialsAndComments'>
                            <div className='col-3 '>
                                <img className="imgTestimonialsAndComments  " src={oneResult.image}alt="ImagenTestimonio"></img> 
                            </div>
                            <div className='col- widthTestimonialsAndComments '>
                                
                                <div >
                                    <h3 className='colorBlack'>{oneResult.name} </h3>
                                </div>   
                                <div>
                                    <p className="colorBlack"> {oneResult.content}</p>  
                                    <br></br> 
                                    <p className="colorBlack" >Fecha : {formatDate(new Date(oneResult.createdAt))}</p>                       
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })} 
        </div>
       </>
     )
 };

export default TestimonialsPublic;