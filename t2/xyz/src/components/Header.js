import React from 'react';
import { Badge, Dropdown, FormControl, Nav, Navbar} from 'react-bootstrap';
import {BsCart2} from 'react-icons/bs';
import {Link} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import { TfiVimeoAlt } from "react-icons/tfi";
const Header = () => {
  return (
    <div>
       
     <Navbar bg="dark" variant="dark" style={{height:80}}>
        <Container>
        <Navbar.Brand> 
            <TfiVimeoAlt color="white" fontsize="40px"/>
            <Link>Web</Link></Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">   
            <Nav className="me-auto">
            
            <Nav.Link href='/' activeStyle>
                Home
            </Nav.Link>
            <Nav.Link  as={Link} to="/products " >
                Products
                
            </Nav.Link>
            
       
        <Navbar.Text className='search'>
            <FormControl style={{width:500}} placeholder="Search" className='m-auto'/>
        </Navbar.Text>
        <Nav.Link  as={Link} to="/login " >
                Login
            </Nav.Link>
        <Nav.Link  as={Link} to="/Cart " >
                Cart 
        </Nav.Link>
        
        </Nav>
        </Navbar.Collapse>
        <Dropdown alignRight>
            <Dropdown.Toggle variant='success'>
                <BsCart2 color="white" fontsize="25px"/>
                <Badge>{10}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{minWidth:370}}>
                <span style={{padding:10}}>Cart is Empty</span>
            </Dropdown.Menu>
        </Dropdown>
        
        </Container>
        
     </Navbar>
     
    </div>
  )
}

export default Header
