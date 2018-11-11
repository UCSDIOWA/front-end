import React, {Component} from 'react';
import {Segment,Grid,Image, Table} from 'semantic-ui-react';
import holderimage from '../holder-image.jpg'

export default class ProfileView extends Component {
  constructor(props){
    super(props)
    this.tableGenerate=this.tableGenerate.bind(this);
    this.state = {numberViews: 4, tableRows:[]}
  }
  tableGenerate(){
     for(var i = 0; i < this.state.numberViews; i++){
        this.state.tableRows.push(
          <tbody key={i}>
            <Table.Row >
              <Table.Cell>
               ure mum gay
              </Table.Cell>
            </Table.Row>
        </tbody>);
     }
  }
  render() {
    this.tableGenerate()
    return (
      <div>
      <div>
        
            <Grid className='profile-header'>
            <Grid.Row>
              <Grid.Column width={5}>
                <h1>Profile</h1>

              </Grid.Column> 

              <Grid.Column width={8}>
              <Image src={holderimage} width='80px' rounded={true}>
                </Image>
                </Grid.Column>        
                
            </Grid.Row>
            </Grid>
          </div>
          <div >
            <Grid columns={2} divided='vertically' className='profile-grid'  >
            <Grid.Row>
              <Grid.Column  >
              <Segment className='profile-columns1'>
                Current Project(s)
                <Table celled>
                  {this.state.tableRows}
                  
                </Table>
              </Segment>
              <Segment className='profile-columns1'>
                Past Project(s)
                <Table celled>
                  {this.state.tableRows}
                  
                </Table>
              </Segment>
              </Grid.Column>
              <Grid.Column>
              <Segment className='profile-columns2'>
                <Table celled>
                  {this.state.tableRows}
                  
                </Table>
              
              </Segment>
              </Grid.Column>
              </Grid.Row>

          </Grid>
      
      </div>
      </div>
    );
  }
}