import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import HolderImage from '../holder-image.jpg'

const NavBar = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container textAlign='right'>
      
      <Menu.Item as='a' header position='right'>
          <Image size='mini' src={HolderImage} style={{ marginRight: '1.5em' }} /> 
        </Menu.Item>
        <Dropdown item simple text='Profile'>
        
          <Dropdown.Menu>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
             <Dropdown.Item ><a style={{ color: 'black'}}href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" color='red' >DO NOT CLICK PLZ</a></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    
  </div>
)

export default NavBar
  
