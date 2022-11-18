import React from 'react';
import './styles/styles.css';
import './styles/card.css';
import vision from './images/vision.jpg';
import TrabajoEquipo from './images/TrabajoEquipo.jpg';

const About = () => {

  return (
    <>
    <div className='containerFirst'>
      
        <div className='cardContainerAbout'>
            <h4 className='cardTitle centerText'>Nosotros</h4>
            <div  className='m-2'>
                <p>
                    Desde 1997 en Somos Más trabajamos con los chicos, chicas, mamás,
                    papás, familiares, vecinas y vecinos del barrio La Tranquerita generando
                    procesos de crecimiento y de inserción social. 
                </p> 
                <p>  
                    Uniendo las manos de todas las familias, las que viven en el barrio y las que
                    viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. 
                </p> 
                <p>  
                    Somos una asociación civil sin fines de lucro que se creó en 1997 con la
                    intención de dar alimento a las familias del barrio. Con el tiempo
                    fuimos involucrándonos con la comunidad y agrandando y mejorando
                    nuestra capacidad de trabajo. 
                </p> 
                <p>  
                    Hoy somos un centro comunitario que acompaña a más de 700 personas a través de 
                    las áreas de :
                    
                    <div className='listaAbout centerText'>
                        <ul>
                            <li>Alimentación</li>
                            <li>Educación</li>
                            <li>Deportes</li>
                        </ul>

                        <ul>
                            <li>Primera infancia</li>
                            <li>Salud</li>
                            <li>Trabajo social</li>
                        </ul>
                    </div>
                </p> 
            </div>
        </div>

        <div className='cardContainerAbout'>
            <h4 className='cardTitle centerText'>Misión</h4>
            <div className='m-3'>
                <p>
                    Trabajar articuladamente con los distintos aspectos de la vida de las
                    familias, generando espacios de desarrollo personal y familiar,
                    brindando herramientas que logren mejorar la calidad de vida a
                    través de su propio esfuerzo.
                </p>
                <br></br>
                <img  className="cardImageAbout" src={vision} alt='vision'></img>
            </div>
        </div>
       
        <div className='cardContainerAbout'>
            <h4 className='cardTitle centerText'>Visión</h4>
            <div  className='m-3'>
                <p>
                    Mejorar la calidad de vida de niños y familias en situación de
                    vulnerabilidad en el barrio " La Tranquerita " , otorgando un cambio de rumbo
                    en cada individuo a través de la educación, salud, trabajo, deporte,
                    responsabilidad y compromiso.
                </p>
                <br></br>
                <img className="cardImageAbout" src={TrabajoEquipo} alt='trabajoEnEquipo'></img>
            </div>   
        </div>
        </div>
        
    </>
  )
}

export default About