import React, {Component} from 'react';
import {Segment,Grid,Image, Table} from 'semantic-ui-react';
import holderimage from '../resources/holder-image.jpg'

export default class PreviousProjectsTable extends Component {
  constructor(props){
    super(props);
    this.tableGenerate=this.tableGenerate.bind(this);
    this.state = {numberViews: 4, tableRows:[]};
  }

  tableGenerate(){
    for(var i = 0; i < this.state.numberViews; i++){
       this.state.tableRows.push(
         <tbody key={i}>
           <Table.Row>
             <Table.Cell>
              ure mum gay
             </Table.Cell>
           </Table.Row>
       </tbody>);
    }
 }


  render(){
      this.tableGenerate();
      return(
          <Segment className='profile-columns1'>
            Previous Project(s)
            <Table celled>
              {this.state.tableRows}
              {this.state.tableRows}
              {this.state.tableRows}
              {this.state.tableRows}
            </Table>
          </Segment>
      );
  }


}