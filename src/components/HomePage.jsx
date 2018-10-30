import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message, Container} from 'semantic-ui-react';

export default class HomePage extends Component {
    
    constructor(props){
    super(props);
    //this.state = { isGary:true, sEmail: '', sPw: '' }
  //  this.handlePicClick=this.handlePicClick.bind(this);
 //   this.handleSubmit=this.handleSubmit.bind(this);
    
    }
    
     render() {
         
         const { pw, email, sEmail, sPw } = this.state;
         return (
             <div class="nav_bar">
                 <h3>TEA</h3>
             
             </div>
         );
     }
    
    
    
}