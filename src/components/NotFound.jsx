import React from "react";
import { Image } from "semantic-ui-react";
import holderImage from "../resources/holder-image.jpg";

const NotFound = () => (
  <div>
    <Image src={holderImage} />
    <h3>
      <font size="56">404</font>
    </h3>
    <h3>
      <font size="44">Page Not Found</font>
    </h3>
  </div>
);
export default NotFound;
