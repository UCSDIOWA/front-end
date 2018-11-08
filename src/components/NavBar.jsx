import React from 'react'
import {
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
<<<<<<< HEAD
import HolderImage from '../resources/holder-image.jpg';
import Logo from '../resources/logo.png';
import ProfileView from './ProfileView';
=======
import Logo from '../logo.png';
>>>>>>> 1e62a1f056dcbc628cba24bb925de44a2c5dd975
import {navConsts} from '../constants';

const {GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT} = navConsts;

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
        <Dropdown item simple icon='bars' direction='left' closeOnChange openOnFocus> 
          <Dropdown.Menu>
             <Dropdown.Item >
              <Link to={'/' + PROFILE} style={{color: 'black'}}>Profile</Link>
             </Dropdown.Item>
             <Dropdown.Item>
              <Link to={'/'} style={{ color: 'black'}}>Logout</Link>
             </Dropdown.Item>
         </Dropdown.Menu>
        </Dropdown>
    </Menu>
)

export default NavBar
  
