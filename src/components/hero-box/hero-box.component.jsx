import React from "react";
import { useNavigate } from 'react-router-dom';

import './hero-box.styles.scss';

import {Row, Col} from 'react-bootstrap';

function HeroBox(props) {

    let {name, description, thumbnail, comics, series, events} = props.item;
    
    //const navigate = useNavigate();

    

    /*
    const handleClick=(id)=>{
        console.log('clicked: '+id);
        navigate('/character/'+id, { replace: true });
    }
    */

    return (
        <div className="listing-box">
            <Row>
                <Col className="thumpnail-col" md={2}>
                
                    <div className='thumpnail' style={{backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})`}}/>

                </Col>
                <Col className="info-col-parent">
                    <Row>
                        <Col className="info-col">
                        
                            
                            <span className="company-name">Appears in</span>

                            <span className="company-tag new ">{comics.available} Comic{comics.available===1?'':'s'}</span>
                            <span className="company-tag featured">{series.available} Series</span>
                            <span className="company-tag featured">{events.available} Event{events.available===1?'':'s'}</span>

                            <span className="post-title">{name}</span>

                            <span className="hero-description">{description.length>0?description:'No description available'}</span>

                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default HeroBox;
