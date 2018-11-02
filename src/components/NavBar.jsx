import React from 'react'
import {
  Dropdown,
  Image,
  Menu,
  Popup,
  Button
} from 'semantic-ui-react'
import HolderImage from '../holder-image.jpg'
import Logo from '../logo.png'

const NavBar = () => (
    <Menu fixed='top' inverted borderless size='large'>
        <Menu.Menu position='left'>
          <Menu.Item>
            <Image size='mini' src={Logo} /> 
          </Menu.Item >
        </Menu.Menu>
        <Menu.Item  position='right' icon='meh outline' ></Menu.Item>
        <Dropdown item simple icon='bars' direction='left' inline> 
          <Dropdown.Menu>
             <Dropdown.Item >
               <Popup trigger={<text>Profile</text>} position='left center'
                  content='I can do dis'
                  on='click'
                  hideOnScroll
                  basic
                />
             </Dropdown.Item>
             <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </Menu>
)

export default NavBar
  
