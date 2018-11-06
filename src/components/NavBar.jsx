import React from 'react'
import {
  Dropdown,
  Image,
  Menu,
  Popup,
  Button
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import HolderImage from '../resources/holder-image.jpg';
import Logo from '../resources/logo.png';
import ProfileView from './ProfileView';
import {navConsts} from '../constants';

const {GATEWAY, SIGNUP, PROFILE} = navConsts;

const NavBar = () => (
    <Menu fixed='top' inverted borderless size='large'>
        <Menu.Menu position='left'>
          <Menu.Item>
            <Link to={'/'}>          
              <Image size='mini' src={Logo} /> 
            </Link>  
          </Menu.Item >
        </Menu.Menu>
        <Menu.Item  position='right' icon='meh outline' ></Menu.Item>
        <Dropdown item simple icon='bars' direction='left' inline> 
          <Dropdown.Menu>
             <Dropdown.Item >
             <Link to={'/' + PROFILE} style={{color: 'black'}}>Profile </Link>
             </Dropdown.Item>
             <Dropdown.Item>
             <Link to={'/'} style={{color: 'black'}}>Logout </Link>
             </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </Menu>
)

export default NavBar
  
