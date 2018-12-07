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
      currentWeight: 0,
      totalWeight: 0
    };
    //console.log(this.state.projId);
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
    this.handleIncrementProgress = this.handleIncrementProgress.bind(this);
    this.handleDecrementProgress = this.handleDecrementProgress.bind(this);
    this.populateMilestones = this.populateMilestones.bind(this);
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
        console.log("ms: " + projectInfo.milestones);
        return projectInfo.milestones;
      })
      .then(milestones => {
        const msDataPromise = getMilestones(milestones);
        msDataPromise.then(msresponse => {
          console.log("get milestone response: ");
          console.log(msresponse.milestones[0]);

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
            console.log("get milestone response: ");
            console.log(msresponse.milestones[0]);

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
    console.log("old total: " + totalWeight);
    totalWeight = totalWeight * 1 + msWeight * 1;
    console.log("new total: " + totalWeight);

    this.setState({
      percentdone: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight,
      currentWeight: currWeight
    });
  }

  populateMilestones(msArray) {
    var list = [];
    var list2 = [];
    for (var i = 0; i < msArray.length; i++) {
      list.push(
        <MilestonesViewEvent
          msName={msArray[i].title}
          msWeight={msArray[i].weight}
          msDescription={msArray[i].description}
          msID={msArray[i].milestoneid}
          isFinish={msArray[i].done}
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
          isFinish={msArray[i].done}
          key={msArray[i].title}
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
        />
      );
    }
    this.setState({ milestoneArray: list, editMilestoneArray: list2 });
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
            console.log("get milestone response: ");
            console.log(msresponse.milestones[0]);

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

  /*
    //handles removing from display
    var list = [];
    var list2 = [];
    for (var i = 0; i < this.state.milestoneArray.length; i++) {
      if (this.state.milestoneArray[i].key != msName) {
        list.push(this.state.milestoneArray[i]);
        list2.push(this.state.editMilestoneArray[i]);
      }
    }

    this.setState({ milestoneArray: list, editMilestoneArray: list2 }); */

  /* Format for MilstonesViewEvent
        <MilestonesViewEvent
          msName="testmilestone1"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone1"
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />,
  */

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
              <AnnouncementsView />
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
