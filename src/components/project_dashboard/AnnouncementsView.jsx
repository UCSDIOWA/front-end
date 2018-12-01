<<<<<<< HEAD
import React, { Component } from "react";


export default class AnnouncementsView extends Component {
    constructor(props) {
      super(props);
      this.state = { pinnedItems: [], unpinnedItems: [], text: '', isPinned:true}; 
      //this.state = { items: [], text: '', isPinned:true }; 
      //this.state = { items: [], text: '', isPinned:true, count:1 };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
//2 arrays: pinneditems, unpinneditems
//in render: have 2 announcementslist objects pinneditems, unpinneditems
//in handlesubmit check if pinned. if pinned, add to pinned array, etc
//^in this.setState part with the concat line
//if newitem.pinned==true, add it to pinneditems
//display part: class AnncmntList : 

    render() {
      return (
        <div>
          <h3>Announcements</h3>
         {/* <AnnouncementsList items={this.state.items} /> */}
         <AnnouncementsList items={this.state.pinnedItems} />
         <AnnouncementsList items={this.state.unpinnedItems} />
          <form onSubmit={this.handleSubmit}>
            <input
              id="new-announcement"
              onChange={this.handleChange}
              value={this.state.text}
            />
            
        <label>
          Pin:
          <input
            name="pinned"
            type="checkbox"
            checked={this.state.isPinned}
            onChange={this.handleChange} />
        </label>
            
            <button>
              Post Announcement
            </button>
          </form>
        </div>
      );
    }

    handleChange(e) {
        if (e.target.type === 'checkbox') { //for the checkbox
            this.setState({isPinned: e.target.checked});
        }
        else { //for the text box
            this.setState({ text: e.target.value });
            //this.state.count--;
        }
    }

    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: "Meghna says: "+this.state.text,
        id: Date.now(),
        //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
        pinned: this.state.isPinned,
      };

      if (this.state.isPinned) {
        this.setState(state => ({pinnedItems: this.state.pinnedItems.concat(newItem)}));
      } else {
        this.setState(state => ({unpinnedItems: this.state.unpinnedItems.concat(newItem)}));
      }
      this.setState(state => ({text: ''}));
      /* 
      this.setState(state => ({
        //items: state.items.concat(newItem),
        pinnedItems: this.state.isPinned? state.pinnedItems.concat(newItem) : state.pinnedItems,
        unpinnedItems: this.state.isPinned? state.upinnedItems : state.unpinnedItems.concat(newItem),
        //TODO: create a list w only the one item, to that list you concat the old list
        text: ''
      }));
    */
    
    }
  }
  
  class AnnouncementsList extends React.Component {
    render() {
      return (
        //need to use a sorted list below here instead of a map
        <div> 
          {this.props.items.reverse().map(item => (
            <div key={item.id}>{item.text}</div>
          ))}
        </div>
      );
    }
  }
  
=======
import React, { Component } from "react";
import { Segment, Comment, Icon, Grid, Input, Modal } from "semantic-ui-react";
import holderimage from "../../resources/holder-image.jpg";

export default class AnnouncementsView extends Component {
  render() {
    return (
      <Segment textAlign="center">
        <h1>Project Announcements</h1>
        <Segment>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src={holderimage} />
              <Comment.Content>
                <Comment.Author as="a">Gary</Comment.Author>
                <Comment.Metadata>
                  <div> Pinned Yesterday at 5:00pm</div>

                  <div>
                    <Icon name="hand lizard" />
                    x12 Acknowledgements
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  Changed the docker file. Make sure you read the documentation!
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action> Got it! </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Segment>
      </Segment>
    );
  }
}
>>>>>>> a8385cdea17129a700449505b73c1454485ce7ed
