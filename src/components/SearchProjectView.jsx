import React, { Component } from "react";
import { Button, Dropdown, Search, Image, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { navConsts } from "../constants";

const { GATEWAY } = navConsts;

const department = [{ key: "cse", value: "cse", text: "cse" }];
const course_number = [{ key: "110", value: "110", text: "110" }];

export default class SearchProjectView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to={"/" + GATEWAY}>
          <Button color="black" size="small">
            Return
          </Button>
        </Link>

        <h1>Search Project</h1>

        <div id="course_id">
          <span>
            Course ID:{" "}
            <Dropdown
              inline
              id="department"
              placeholder="Select Department"
              selection
              options={department}
            />
            <Dropdown
              inline
              id="course_number"
              placeholder="Select Number"
              selection
              options={course_number}
            />
          </span>
        </div>

        <br />
        <div id="optional_category">
          <span>
            Category: <Search />
          </span>
        </div>

        <hr />
        <h2>Results:</h2>

        <div>
          <Card.Group>
            <Card>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  src="/src/resources/holder-image.jpg"
                />
                <Card.Header>TEA</Card.Header>
                <Card.Meta>IOWA</Card.Meta>
                <Card.Description>Project Management Web App</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Join
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </div>
    );
  }
}
