import  Spinner from "react-bootstrap/Spinner";
import './styles/styles.css';

export default function LoadingBox(){

    return (
        <Spinner className="loadingBox" animation="border" role="status" >
            <h4 className="=visually-hidden  ">Cargando...</h4>
        </Spinner>
    );
}