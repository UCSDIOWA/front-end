import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
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
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    
  </div>
)

export default NavBar
  
