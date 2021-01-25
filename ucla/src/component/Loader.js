import React from 'react'; 
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap';


function Loader({ type, color, message }) { 
    return (
        <div class="contentWrap">
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Spinner animation="border"/> 
                <p style={{marginTop: "'20dp'"}}>{message}</p>
            </div> 
        </div>
    ); 
} 
    
export default Loader;