import React, {useContext} from "react";

import './header.styles.scss';

import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

import { SearchTextContext } from "../../contexts/searchContext";
import { PageContext } from "../../contexts/pageContext";

import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const {setPage} = useContext(PageContext);

    const { setSearchText } = useContext(SearchTextContext);

    const handleSearch = (e)=>{
        e.preventDefault();
        const search = encodeURIComponent(e.target.search.value);
        console.log('encoded search: ', search);
        if(search!=='')
        {
            setSearchText(search);
            navigate('/search/'+search, { replace: true });
        }
        
    }

    const homeClick = ()=>{
        setSearchText('');
        setPage(1);
        navigate('/', { replace: true });
    } 

    return (
        <div className="header">
            
            <Container className="page-container header-container">
               
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand onClick={()=>{homeClick()}}>Marvel Superheroes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        
                    </Nav>
                    <Form onSubmit={handleSearch} className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="search"
                        />
                        <Button type="submit">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            </Container>
        </div>
    )
}

export default Header;
