import React, { Component } from "react";
import { Popup, Segment, Button, Grid, Header } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";
import CalendarWidget from "./CalendarWidget";
import AnnouncementsView from "./AnnouncementsView";
import InviteUserView from "./InviteUserView";
import { getProjectInfo, transferLeadership } from "../../server/api";
import ProjectInfoWidget from "./ProjectInfoWidget";
import MemberRequestsView from "./MemberRequestsView";
import LeaveGroupView from "./LeaveGroupView";
export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xid: props.match.params.id,
      milestoneArray: [],
      editMilestoneArray: [],
      currentWeight: 0,
      totalWeight: 0
    };
    //console.log(this.state.projId);
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
    this.handleIncrementProgress = this.handleIncrementProgress.bind(this);
    this.handleDecrementProgress = this.handleDecrementProgress.bind(this);
    this.handleTransferLeadership = this.handleTransferLeadership.bind(this);
    this.renderPage = this.renderPage.bind(this);
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
        // TODO update to retrieve milestones from db
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
      });
  }

  renderPage() {
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
        // TODO update to retrieve milestones from db
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
    //TODO include sending new Milestone object to backend
    var newMilestone1 = (
      <MilestonesViewEvent
        msName={msName}
        msWeight={msWeight}
        msDeadline={msDeadline}
        msDescription={msDescription}
        key={msName}
        isDelete={false}
        updateProgFunc={this.handleIncrementProgress}
        decrementProgFunc={this.handleDecrementProgress}
      />
    );
    var newMilestone2 = (
      <MilestonesViewEvent
        msName={msName}
        msWeight={msWeight}
        msDeadline={msDeadline}
        msDescription={msDescription}
        key={msName}
        isDelete={true}
        deleteFunc={this.handleRemoveMilestone}
        decrementProgFunc={this.handleDecrementProgress}
      />
    );
    this.setState({
      milestoneArray: [...this.state.milestoneArray, newMilestone1],
      editMilestoneArray: [...this.state.editMilestoneArray, newMilestone2]
    });
  }

  handleTransferLeadership(newleader) {
    console.log(this.state);
    console.log(newleader);
    var transferSuccess = false;
    const acceptPromise = transferLeadership(this.state.xid, newleader);
    acceptPromise.then(response => {
      console.log(response);
      transferSuccess = response.success;
      if (!transferSuccess) {
        alert("Error transferring leadership!");
        console.log(response);
      } else {
        // update
        alert("Successfully transferred leadership!");
        this.renderPage();
        //this.createProjectObject();
      }
    });
  }

  handleRemoveMilestone(msName, msWeight) {
    //handles removing weight from total milestones weight
    var totalWeight = this.state.totalWeight;
    var currWeight = this.state.currentWeight;
    totalWeight -= msWeight;

    this.setState({
      percentdone: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight,
      currentWeight: currWeight
    });

    //handles removing from display
    var list = [];
    var list2 = [];
    for (var i = 0; i < this.state.milestoneArray.length; i++) {
      if (this.state.milestoneArray[i].key != msName) {
        list.push(this.state.milestoneArray[i]);
        list2.push(this.state.editMilestoneArray[i]);
      }
    }

    this.setState({ milestoneArray: list, editMilestoneArray: list2 });
  }

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
                xid={this.state.xid}
                handleTransferLeadership={this.handleTransferLeadership}
              />
              <MemberRequestsView xid={this.state.xid} />
              <LeaveGroupView xid={this.state.xid} />
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
                  xid={this.state.xid}
                />
              </Segment>
              <AnnouncementsView />
              <Segment textAlign="center">
                <h2>UCSD Dibs</h2>
                <a>https://ucsd.evanced.info/dibs</a>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
