import React, { Component } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import holderImage from "../../resources/logo.png";

const LoginLogo = () => (
  <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 800 }}>
      <Header>
        <Grid>
          <Grid.Column
            width={8}
            floated="left"
            textAlign="left"
            verticalAlign="bottom"
          >
            <Header as="h1" id="login_tea">
              TEA
            </Header>
          </Grid.Column>

          <Grid.Column width={8} floated="right">
            <Image
              spaced="right"
              rounded={true}
              src={holderImage}
              width="100px"
            />
          </Grid.Column>
        </Grid>
      </Header>
    </Grid.Column>
  </Grid>
);
export default LoginLogo;
