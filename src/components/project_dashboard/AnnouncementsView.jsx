import React, { Component } from "react";
import { Button, Segment, Form, Checkbox } from "semantic-ui-react";
import { sendAnnouncement, getProjectInfo } from "../../server/api";
export default class AnnouncementsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinnedItems: this.props.pinnedArray,
      unpinnedItems: this.props.unpinnedArray,
      text: "",
      isPinned: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    const projDataPromise = getProjectInfo([this.props.projectID]);
    projDataPromise
      .then(response => {
        console.log("get project info response: ");
        console.log(response);

        if (response.success) {
          return response.projects[0];
        } else {
          alert("Error loading project");
        }
      })
      .then(projectInfo => {
        if (projectInfo === undefined) {
          return;
        }
        this.setState({
          pinnedannouncements: projectInfo.pinnedannouncements,
          unpinnedannouncements: projectInfo.unpinnedannouncements
        });
        console.log("announcements: " + this.state.pinnedannouncements);

        console.log("pinned array :" + this.state.pinnedannouncements);
        //TODO make new items with correct id fields and push to state arrays using prop arrays
        if (this.state.pinnedannouncements != undefined) {
          for (var i = 0; i < this.state.pinnedannouncements.length; i++) {
            const newItem = {
              text: this.state.pinnedannouncements[i],
              id: Date.now(),
              //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
              pinned: true
            };

            this.setState(state => ({
              pinnedItems: this.state.pinnedItems.concat(newItem)
            }));
          }
        }
        if (this.state.unpinnedannouncements != undefined) {
          for (var i2 = 0; i2 < this.state.unpinnedannouncements.length; i2++) {
            const newItem = {
              text: this.state.unpinnedannouncements[i],
              id: Date.now(),
              //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
              pinned: false
            };

            this.setState(state => ({
              unpinnedItems: this.state.unpinnedItems.concat(newItem)
            }));
          }
        }
      });
  }

  handleCheck() {
    this.setState({ isPinned: !this.state.isPinned });
  }
  render() {
    return (
      <div>
        <h3>Announcements Thread</h3>
        {/*<br></br><br></br><br></br><br></br>*/}
        {/* <AnnouncementsList items={this.state.items} /> */}
        <Segment>
          <Segment style={{ overflow: "auto", maxHeight: "200px" }}>
            <AnnouncementsList items={this.state.pinnedItems} />
            <AnnouncementsList items={this.state.unpinnedItems} />
          </Segment>
          <Form onSubmit={this.handleSubmit} value={this.state.text}>
            <Form.Field onChange={e => this.setState({ text: e.target.value })}>
              <label>Add Announcement</label>
              <input placeholder="Say Something!" />
            </Form.Field>

            <Form.Field>
              <Checkbox
                label="Pin Announcement"
                checked={this.state.isPinned}
                onChange={this.handleChange}
                onClick={this.handleCheck}
              />
            </Form.Field>
            <Button primary>Post Announcement</Button>
          </Form>
        </Segment>
      </div>
    );
  }

  handleChange(e) {
    if (e.target.type === "checkbox") {
      //for the checkbox
      this.setState({ isPinned: e.target.checked });
    } else {
      //for the text box
      this.setState({ text: e.target.value });
      //this.state.count--;
    }
  }

  handleSubmit(e) {
    if (!this.state.text.length) {
      return;
    }
    const sendAnnouncementPromise = sendAnnouncement(
      this.props.projectID,
      this.state.text,
      this.state.isPinned
    );
    sendAnnouncementPromise.then(response => {
      console.log("send announcement response: ");
      console.log(response);

      if (!response.success) {
        alert("Error loading project");
      }
    });
    e.preventDefault();

    const newItem = {
      //text: (this.state.isPinned? <font color="red">Si says:</font>+this.state.text : "Si says: "+this.state.text),
      //TODO: get username + print that instead of "Si"
      text: this.state.text,
      id: Date.now(),
      //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
      pinned: this.state.isPinned
    };

    if (this.state.isPinned) {
      this.setState(state => ({
        pinnedItems: this.state.pinnedItems.concat(newItem)
      }));
    } else {
      this.setState(state => ({
        unpinnedItems: this.state.unpinnedItems.concat(newItem)
      }));
    }
    this.setState(state => ({ text: "" }));
    /* 
      this.setState(state => ({
        //items: state.items.concat(newItem),
        pinnedItems: this.state.isPinned? state.pinnedItems.concat(newItem) : state.pinnedItems,
        unpinnedItems: this.state.isPinned? state.upinnedItems : state.unpinnedItems.concat(newItem),
       
      }));
    */
  }
}

class AnnouncementsList extends React.Component {
  render() {
    return (
      //consider using a sorted list below here instead of a map
      <div>
        {this.props.items.map(item => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
    );
  }
}
