import React, {useState, useContext, useEffect} from "react";

import './content.styles.scss';

import {Container} from 'react-bootstrap';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import md5 from 'crypto-js/md5';
import axios from 'axios';

import HeroBox from "../hero-box/hero-box.component";
import Pagination from 'react-responsive-pagination';
import Character from "../character/character.component";

import { SearchTextContext } from "../../contexts/searchContext";
import {PageContext} from "../../contexts/pageContext";


function Content() {

    const {page, setPage} = useContext(PageContext);
    const {nItems, setnItems} = useContext(PageContext);
    const [nPages, setNPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const {searchText}  = useContext(SearchTextContext);

    const navigate = useNavigate();

    const apiKey = "7bb539ee22a04fb7eea6200ca5f0dfde";
    const privateKey = "c51b53139d451a48d71aa9a6f7b063b7f9fd08b1";

    const [data, setData] = useState([]);

    const getHeroes = () => {

        let pathName = window.location.pathname;

        let page = 1;
        let offset_param = '';

        if(pathName!=='')
        {
            let paths = pathName.split('/');            

            if(paths[1]==='page')
            {
                if(paths[2])
                {
                    page = parseInt(paths[2]);
                    setPage(page);
                    let offset = (page-1)*nItems;
                    offset_param = '&offset='+offset;
                }
            }
        }
        

        let timeStamp = Date.now();
        let hash = md5(timeStamp + privateKey + apiKey);
    
        let name_param = '';

        if(searchText.length>0)
        {
            name_param='&nameStartsWith='+searchText
        }

        let apiUrl ="https://gateway.marvel.com:443/v1/public/characters?ts="+timeStamp+"&apikey=" + apiKey+"&hash="+hash+"&limit="+nItems+name_param+offset_param;

        // Make a request for a user with a given ID
        axios
          .get(apiUrl)
          .then(function (response) {
            // handle success
            setTotalItems(response.data.data.total);
            setNPages(Math.ceil(response.data.data.total/nItems));
            setData(response.data.data.results);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      };

    useEffect(() => {
        getHeroes();
    },[]);

    useEffect(() => {
        getHeroes();

    },[searchText, page, nItems]);
    
    const handlePagination = (page)=>{
        navigate('/page/'+(page), { replace: true });
        getHeroes();
    }

    const handleSelect = (e)=>{
        setnItems(e.target.value);
    }

    return (
        <div className="content">
            <Container className="page-container content-container">
            <Container fluid>
            <Routes>
                
                <Route
                    path="/page/:pageNum"
                    element={
                        <div>

                            <div className="pagination-div">
                                Showing {((page-1)*nItems+1)} to {((page-1)*nItems+nItems)} of {totalItems} superheroes

                                <div className="nitems-div">
                                    <span>Items per page</span>
                                    <select value={nItems} onChange={(e)=>handleSelect(e)}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                    </select>

                                </div>
                                <div className="clear-div"></div>                       
                            </div>
                            

                            <Pagination
                                total={nPages}
                                current={page}
                                onPageChange={page => handlePagination(page)}
                            />
                            {
                                data.length>0?
                                (
                                    data.map((item, key) => 
                                    (
                                        <HeroBox key={item.id} item={item}/>
                                    ))
                                ):(
                                    null
                                )
                            }

                            <Pagination
                                total={nPages}
                                current={page}
                                onPageChange={page => handlePagination(page)}
                            />

                        </div>  
                    
                    
                    }
                />

                <Route
                    path="character/:characterId"
                    element={<Character/>}
                />

                <Route
                    path="search/:query"
                    element={
                        <div>

                            <Pagination
                                total={nPages}
                                current={page}
                                onPageChange={page => handlePagination(page)}
                            />
                            {
                                data.length>0?
                                (
                                    data.map((item, key) => 
                                    (
                                        <HeroBox key={item.id} item={item}/>
                                    ))
                                ):(
                                    <p>No results found for "{decodeURI(searchText)}"</p>
                                )
                            }

                            <Pagination
                                total={nPages}
                                current={page}
                                onPageChange={page => handlePagination(page)}
                            />

                        </div>
                    }
                />

                <Route exact path="/" element={<Navigate to="/page/1" />}/>
            </Routes>
            </Container>
            </Container>
                
        </div>
    )
}

export default Content;
