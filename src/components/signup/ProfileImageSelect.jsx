import React, {Component} from "react";
import { Image, Grid} from "semantic-ui-react";
import holderImage from "../../resources/profile_images/holder-image.jpg";
import betterLemonTea from "../../resources/profile_images/better-lemon-tea.jpg";
import blackTea from "../../resources/profile_images/black-tea.jpg";
import bobaTea from "../../resources/profile_images/boba-tea.jpg";
import chineseTea from "../../resources/profile_images/chinese-tea.jpg";
import coffee from "../../resources/profile_images/coffee.jpg";
import lemonTea from "../../resources/profile_images/lemon-tea.jpg"
import oolongTea from "../../resources/profile_images/oolong-tea.jpg";
import greenTea from "../../resources/profile_images/tulsi-green-tea.jpg";

export default class ProfileImageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {images: [
      oolongTea, greenTea, blackTea,lemonTea, chineseTea, coffee, 
      bobaTea, betterLemonTea, holderImage
    ]}
  }

  formatProfileImages = (arrayOfImages, numRows) => {
    var cols = [];
    var numCols =  (1.0) * arrayOfImages.length / numRows;
    for (var i = 0; i < arrayOfImages.length; i+=numCols) {
      cols.push(arrayOfImages.slice(i, i + Math.ceil(numCols)).map((image, index) => (
        <Grid.Column key={index}>
          <Image rounded src={image} onClick={this.props.onClick} />
        </Grid.Column>
      )))
    }
    return cols.map((setOfCols, index) => (
      <Grid.Row key={index} columns={Math.ceil(numCols)}>
        {setOfCols}
      </Grid.Row>
    ))
  };

  render() {
    return (
      <Grid>
        {this.formatProfileImages(this.state.images, Math.sqrt(this.state.images.length))}
      </Grid>
    ); 
  }
}