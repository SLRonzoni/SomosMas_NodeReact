import  Spinner from "react-bootstrap/Spinner";
import './styles/styles.css';

export default function LoadingBox(){

    return (
        <Spinner animation="border" role="status" >
            <span className="=visually-hidden centrar">Cargando...</span>
        </Spinner>
    );
}