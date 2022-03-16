import React, {useEffect, useState} from "react";

import './character.styles.scss';

import {Row, Col} from 'react-bootstrap';

import axios from 'axios';
import md5 from 'crypto-js/md5';

function Character() {


    const [setHero] = useState(null);
    let id = window.location.pathname.split('/')[2];

    const getHero = () => {

        

        const apiKey = "7bb539ee22a04fb7eea6200ca5f0dfde";
        const privateKey = "c51b53139d451a48d71aa9a6f7b063b7f9fd08b1";

        let timeStamp = Date.now();
        let hash = md5(timeStamp + privateKey + apiKey);
    
        let apiUrl ="https://gateway.marvel.com:443/v1/public/characters/"+id+"ts="+timeStamp+"&apikey=" + apiKey+"&hash="+hash;
        console.log(apiUrl)

        // Make a request for a user with a given ID
        axios
          .get(apiUrl)
          .then(function (response) {
            // handle success
            console.log(response.data.data);
            
            setHero(response.data.data.results);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      };

    useEffect(()=>{
        getHero();
    },[]);

    return (
        <div className="character-div">
            <div className="listing-box">
                <Row>
                    <Col className="thumpnail-col" md={2}>
                    
                        

                    </Col>
                    <Col className="info-col-parent">
                        <Row>
                            <Col className="info-col">
                            
                                
                                <span className="company-name">Appears in</span>

                                <span className="company-tag new ">Comics</span>
                                <span className="company-tag featured">Series</span>
                                <span className="company-tag featured">Events</span>

                                <span className="post-title">{id}</span>

                                <span className="hero-description">No description available</span>

                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </div>    
        </div>
    )
}

export default Character;
