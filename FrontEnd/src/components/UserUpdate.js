import React, {useState,useEffect,Fragment} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/styles.css';
import Swal from "sweetalert2";

const EditUsers = (props) =>{
      
  const  {id}=props.match.params;

  const [user, setUser] = useState({
      id:'',
      firstName:'',
      lastName:'',
      image:"",
      //email:'',
      password:'',
      createdAt:'',
      updatedAt:''
  });

  const [userShow, setUserShow] = useState({
    id:'',
    firstName:'',
    lastName:'',
    image:"",
    //email:'',
    password:'',
    createdAt:'',
    updatedAt:''
  });

   
  const changes=(e)=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value  
    });
  };

  const send = (e) =>{
    //e.preventDefault();
    editUser();
  };
 

  const editUser= async ()=>{
    await axiosClient.put(`/users/update/${id}`,user,{withCredentials:true})
    .then (respuesta=>{
      if(respuesta.status===200){
      Swal.fire({
        icon: 'success', 
        title:"Modificación de perfil exitosa !",
        showConfirmButton:false
      }); 
      }       
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    });
    setTimeout( function() { window.location.href = "/"; }, 1000 );
  }

  useEffect(() =>{
    const getUser= async () => {
      await axiosClient.get(`/users/${id}`,{withCredentials:true})
      .then(respuesta =>{
        setUser(respuesta.data);
        setUserShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error)
      }));
    };
    getUser();
  },[id]);

  //let fechaActualiza=userShow.updatedAt.replace( "T"," , " )
  //let  fechaActualizado=fechaActualiza.replace("Z","  " )
  let fechaActualizado=userShow.updatedAt

  return (
    <Fragment>  
    <div className="container-sm col-6 col-md-4 bg-light " > 
            <h2>Mi Perfil</h2>
            <h6>( última actualización : {fechaActualizado} )</h6>
              <div className="form-control">
                <div className="form-group">    
                    <label className="formLabel">Nombre</label>
                    <input type="text" className="form-control" name="firstName" id="name"  onChange={changes} defaultValue={user.firstName}  autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Apellido</label>
                    <input type="text" className="form-control" name="lastName" id="lastName"  onChange={changes}  defaultValue={user.lastName} />
                </div> 
              
                <div className="form-group" >   
                    <label className="formLabel">Mi Foto</label>
                    <input type="text" className="form-control" name="photo" id="photo"  onChange={changes} defaultValue={user.photo}/>
                </div> 
              </div>
              <br></br>
              <div className="form-control">
                <div className="form-group" >    
                    <label className="formLabel">Email ( no se permite modificar )</label>
                    <input type="email" className="form-control" name="email" id="email"  defaultValue={user.email}/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Nueva contraseña</label>
                    <input type="password" className="form-control" name="password" id="password"  onChange={changes} />
                </div> 
              </div>
              <br></br>
                <div>
                <button className=" mr-md-2 btn btn-primary btn-derecha" onClick={()=>send()} >Guardar cambios</button>
            </div>
            </div>
   </Fragment>
        );
  
}
export default EditUsers;