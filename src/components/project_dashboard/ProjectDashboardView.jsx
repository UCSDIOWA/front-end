import React, { Component } from "react";
import { Popup, Segment, Button, Grid, Header } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";
import CalendarWidget from "./CalendarWidget";
import AnnouncementsView from "./AnnouncementsView";
import InviteUserView from "./InviteUserView";
import {
  getProjectInfo,
  getMilestones,
  addMilestone,
  deleteMilestone
} from "../../server/api";
import ProjectInfoWidget from "./ProjectInfoWidget";

export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xid: props.match.params.id,
      milestoneArray: [],
      editMilestoneArray: [],
      milestones: [],
      testArray: [],
      pinnedannouncements: [],
      unpinnedannouncements: [],
      pinnedArray: [],
      unpinnedArray: [],
      currentWeight: 0,
      totalWeight: 0,
      percentdone: 0
    };
    //console.log(this.state.projId);
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
    this.handleIncrementProgress = this.handleIncrementProgress.bind(this);
    this.handleDecrementProgress = this.handleDecrementProgress.bind(this);
    this.populateMilestones = this.populateMilestones.bind(this);
    this.populateAnnouncements = this.populateAnnouncements.bind(this);
  }

  populateAnnouncements() {
    console.log("pinned array :" + this.state.pinnedannouncements);
    //TODO make new items with correct id fields and push to state arrays using prop arrays
    for (var i = 0; i < this.state.pinnedannouncements; i++) {
      const newItem = {
        text: this.state.pinnedannouncements[i],
        id: Date.now(),
        //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
        pinned: true
      };

      this.setState(state => ({
        pinnedArray: this.state.pinnedArray.concat(newItem)
      }));
    }
    for (var i2 = 0; i2 < this.state.unpinnedannouncements; i2++) {
      const newItem = {
        text: this.state.unpinnedannouncements[i],
        id: Date.now(),
        //id: Date.now(), //TODO: maybe subtract this from last date to order in reverse
        pinned: false
      };

      this.setState(state => ({
        unpinnedArray: this.state.unpinnedArray.concat(newItem)
      }));
    }
  }

  componentDidMount() {
    const projDataPromise = getProjectInfo([this.state.xid]);
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
        this.setState({
          xid: projectInfo.xid,
          title: projectInfo.title,
          projectleader: projectInfo.projectleader,
          percentdone: projectInfo.percentdone,
          groupsize: projectInfo.groupsize,
          isprivate: projectInfo.isprivate,
          tags: projectInfo.tags,
          deadline: projectInfo.deadline,
          calendarid: projectInfo.calendarid,
          description: projectInfo.description,
          done: projectInfo.done,
          joinrequests: projectInfo.joinrequests,
          memberslist: projectInfo.memberslist,
          milestones: projectInfo.milestones,
          pinnedannouncements: projectInfo.pinnedannouncements,
          unpinnedannouncements: projectInfo.unpinnedannouncements
        });
        console.log("announcements: " + this.state.pinnedannouncements);

        return projectInfo.milestones;
      })
      .then(milestones => {
        const msDataPromise = getMilestones(milestones);
        msDataPromise.then(msresponse => {
          //this.populateAnnouncements();
          //if (msresponse.success) {
          this.setState({ testArray: msresponse.milestones });
          this.populateMilestones(msresponse.milestones);
          console.log("grabbed milestones: " + this.state.milestoneArray);
          //}
        });

        // TODO update to retrieve milestones from db
      });
  }

  handleDecrementProgress(updateWeight) {
    var currProg = this.state.percentdone;
    var currWeight = this.state.currentWeight;
    currWeight = currWeight * 1 - updateWeight * 1;

    currProg = Math.ceil(100 * (currWeight / this.state.totalWeight));

    this.setState({ percentdone: currProg, currentWeight: currWeight });
  }

  handleIncrementProgress(updateWeight) {
    console.log("updating weight");
    var currProg = this.state.percentdone;
    var currWeight = this.state.currentWeight;

    //update current weight
    currWeight = currWeight * 1 + updateWeight * 1;

    currProg = Math.ceil(100 * (currWeight / this.state.totalWeight));

    this.setState({ percentdone: currProg, currentWeight: currWeight });
  }

  handleAddMilestone(msName, msWeight, msDeadline, msDescription) {
    const addMSPromise = addMilestone(
      this.state.xid,
      msName,
      msDescription,
      msWeight
    );
    addMSPromise.then(response => {
      console.log("add ms response: ");
      console.log(response);

      if (!response.success) {
        alert("Error loading project");
      }
      const projDataPromise = getProjectInfo([this.state.xid]);
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
          this.setState({
            xid: projectInfo.xid,
            title: projectInfo.title,
            projectleader: projectInfo.projectleader,
            percentdone: projectInfo.percentdone,
            groupsize: projectInfo.groupsize,
            isprivate: projectInfo.isprivate,
            tags: projectInfo.tags,
            deadline: projectInfo.deadline,
            calendarid: projectInfo.calendarid,
            description: projectInfo.description,
            done: projectInfo.done,
            joinrequests: projectInfo.joinrequests,
            memberslist: projectInfo.memberslist,
            milestones: projectInfo.milestones,
            pinnedannouncements: projectInfo.pinnedannouncements,
            unpinnedannouncements: projectInfo.unpinnedannouncements
          });
          console.log("ms: " + projectInfo.milestones);
          return projectInfo.milestones;
        })
        .then(milestones => {
          const msDataPromise = getMilestones(milestones);
          msDataPromise.then(msresponse => {
            //console.log("get milestone response: ");
            //console.log(msresponse.milestones[0]);

            //if (msresponse.success) {
            this.setState({ testArray: msresponse.milestones });
            this.populateMilestones(msresponse.milestones);
            console.log("grabbed milestones: " + this.state.milestoneArray);
            //}
          });

          // TODO update to retrieve milestones from db
        });
    });

    //handles adding weight from total milestones weight

    var totalWeight = this.state.totalWeight;
    var currWeight = this.state.currentWeight;
    console.log("totalWeight: " + totalWeight);
    console.log("currWeight: " + currWeight);
    //console.log("old total: " + totalWeight);
    totalWeight = totalWeight * 1 + msWeight * 1;
    //console.log("new total: " + totalWeight);

    this.setState({
      percentdone: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight
    });
  }

  populateMilestones(msArray) {
    var list = [];
    var list2 = [];
    var totalWeight = 0;
    var currWeight = 0;
    for (var i = 0; msArray != undefined && i < msArray.length; i++) {
      //console.log("is finished: " + msArray[i].done);
      //console.log(msArray[i]);
      list.push(
        <MilestonesViewEvent
          msName={msArray[i].title}
          msWeight={msArray[i].weight}
          msDescription={msArray[i].description}
          msID={msArray[i].milestoneid}
          isFinish={msArray[i].done != undefined ? true : false}
          key={msArray[i].title}
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />
      );
      list2.push(
        <MilestonesViewEvent
          msName={msArray[i].title}
          msWeight={msArray[i].weight}
          msDescription={msArray[i].description}
          msID={msArray[i].milestoneid}
          isFinish={false}
          key={msArray[i].title}
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
        />
      );
      totalWeight += msArray[i].weight;
      if (msArray[i].done != undefined) {
        currWeight += msArray[i].weight;
      }
    }
    console.log("totalweight: " + totalWeight);
    console.log("currentweight: " + currWeight);
    this.setState({
      milestoneArray: list,
      editMilestoneArray: list2,
      totalWeight: totalWeight,
      currentWeight: currWeight,
      percentdone: Math.ceil(100 * (currWeight / totalWeight))
    });
  }

  handleRemoveMilestone(msWeight, msID) {
    const deleteMSPromise = deleteMilestone(this.state.xid, msID);
    deleteMSPromise.then(response => {
      console.log("delete ms response: ");
      console.log(response);

      if (!response.success) {
        alert("Error loading project");
      }
      const projDataPromise = getProjectInfo([this.state.xid]);
      projDataPromise
        .then(response => {
          //console.log("get project info response: ");
          //console.log(response);

          if (response.success) {
            return response.projects[0];
          } else {
            alert("Error loading project");
          }
        })
        .then(projectInfo => {
          this.setState({
            xid: projectInfo.xid,
            title: projectInfo.title,
            projectleader: projectInfo.projectleader,
            percentdone: projectInfo.percentdone,
            groupsize: projectInfo.groupsize,
            isprivate: projectInfo.isprivate,
            tags: projectInfo.tags,
            deadline: projectInfo.deadline,
            calendarid: projectInfo.calendarid,
            description: projectInfo.description,
            done: projectInfo.done,
            joinrequests: projectInfo.joinrequests,
            memberslist: projectInfo.memberslist,
            milestones: projectInfo.milestones,
            pinnedannouncements: projectInfo.pinnedannouncements,
            unpinnedannouncements: projectInfo.unpinnedannouncements
          });
          //console.log("ms: " + projectInfo.milestones);
          return projectInfo.milestones;
        })
        .then(milestones => {
          const msDataPromise = getMilestones(milestones);
          msDataPromise.then(msresponse => {
            //console.log("get milestone response: ");
            //console.log(msresponse.milestones[0]);

            //if (msresponse.success) {
            this.setState({ testArray: msresponse.milestones });
            this.populateMilestones(msresponse.milestones);
            console.log("grabbed milestones: " + this.state.milestoneArray);
            //}
          });

          // TODO update to retrieve milestones from db
        });
    });
    //handles removing weight from total milestones weight
    var totalWeight = this.state.totalWeight;
    var currWeight = this.state.currentWeight;
    totalWeight -= msWeight;

    this.setState({
      percentdone: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight,
      currentWeight: currWeight
    });
  }

  render() {
    //TODO have call to repopulate list from backend
    console.log("Rendering Dashboard View");
    console.log(this.state);

    const list = this.state.milestoneArray;
    const list2 = this.state.editMilestoneArray;
    return (
      <Segment>
        <Grid centered style={{ width: "60rem" }}>
          <Grid.Row>
            <Header as="h1">{this.state.title}</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="profile-columns3">
              <ProjectInfoWidget
                projectLeader={this.state.projectleader}
                groupSize={this.state.groupsize}
                tags={this.state.tags}
                isPrivate={this.state.isprivate}
                deadline={this.state.deadline}
                description={this.state.description}
                memberslist={this.state.memberslist}
              />

              <MilestonesView
                handleAddMilestone={this.handleAddMilestone}
                milestoneArray={list}
                editMilestoneArray={list2}
                currentProjectName="Project Name"
                currentProgress={this.state.percentdone}
                memberslist={this.state.memberslist}
              />
              <Segment>
                <InviteUserView />
              </Segment>
            </Grid.Column>
            <Grid.Column className="profile-columns3">
              <Segment textAlign="center">
                <h2>Calendar</h2>
                <CalendarWidget
                  hasCalendar={this.props.calendarid != null}
                  calendarId={this.props.calendarid}
                />
              </Segment>
              <Segment>
                <AnnouncementsView
                  pinnedArray={this.state.pinnedArray}
                  unpinnedArray={this.state.unpinnedArray}
                  projectID={this.state.xid}
                />
              </Segment>
              <Segment textAlign="center">
                <h2>UCSD Dibs</h2>
                <a href="https://ucsd.evanced.info/dibs" target="_blank">
                  https://ucsd.evanced.info/dibs
                </a>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
