import React from 'react';
import './styles/styles.css';
import './styles/about.css';
import './styles/tableMediaScreen.css';
import vision from './images/vision.jpg';
import TrabajoEquipo from './images/TrabajoEquipo.jpg';
import TrabajoSocial from './images/trabajoSocial.jpg';

const About = () => {

  return (
    <>
      <div className='containerAbout'>     
        <div className='cardAbout'>
                <div> 
                    <img className="cardImageAbout"src={vision} alt='vision'></img>
                </div>
                <div className='cardTitleAbout'>Nosotros</div>
                <div className='cardTextAbout'>
                    <p>  
                        Somos una asociación civil sin fines de lucro creada en 1997 con la
                        intención de dar alimento a las familias del barrio. Con el tiempo
                        fuimos agrandando y mejorando nuestra capacidad de trabajo. 
                    </p>                     
                    <p>  
                        Hoy somos un centro comunitario que acompaña a más de 700 personas en áreas de :
                        Alimentación , Salud, Educación, Deportes, Primera infancia y Trabajo social
                    </p> 
                </div> 
            </div>

            <div className='cardAbout'>
                <div> 
                    <img className="cardImageAbout"src={TrabajoSocial} alt='familia'></img>
                </div>
                <div className='cardTitleAbout'>Misión</div>
                <div className='cardTextAbout'>
                    <p>
                        Trabajar articuladamente con los distintos aspectos de la vida de las
                        familias, generando espacios de desarrollo personal y familiar,
                        brindando herramientas que logren mejorar la calidad de vida a
                        través de su propio esfuerzo.
                    </p>
                    <p>
                        Trabajamos con los chic@s, mamás, papás, familiares, y  vecin@s
                        del barrio La Tranquerita generando procesos de crecimiento y de 
                        inserción social. 
                    </p> 
               </div>
            </div>
        
            <div className='cardAbout'>
                <div> 
                    <img className="cardImageAbout"src={TrabajoEquipo} alt='TrabajoEquipo'></img>
                </div>
                <div className='cardTitleAbout'>Visión</div>
                <div className='cardTextAbout'>
                    <p>
                        Mejorar la calidad de vida de niños y familias en situación de
                        vulnerabilidad en el barrio "La Tranquerita" , otorgando un cambio de rumbo
                        en cada individuo a través de la educación, salud, trabajo, deporte,
                        responsabilidad y compromiso.
                    </p>
                    <p>  
                        Uniendo las manos de todas las familias, las que viven en el barrio y las que
                        viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. 
                    </p> 
                </div>
            </div>
    </div>
    </>
  )
}

export default About;