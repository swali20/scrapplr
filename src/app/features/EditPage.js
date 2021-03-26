import React from "react";
import PhotoUpload from "./PhotoUpload";
import LocationSearchInput from "../components/LocationSearchInput";
import {
  grommet,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grommet,
  Text,
} from "grommet";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isUpload = this.props.type === "Upload Photo";
    const is360 = this.props.type === "360";
    const isDescription = this.props.type === "Description";

    console.log("props", this.props);

    return (
      <Grommet theme={grommet}>
        {/* <Box pad="large" gap="medium" height="large" width="medium"> */}

        {/* <Card pad="small" gap="medium" > */}
        <CardBody
          background="light-1"
          flex="true"
          pad="medium"
          elevation="medium"
          alignContent="around"
          // fill="true"
        >
          {isUpload && <PhotoUpload />}
          {is360 && <LocationSearchInput />}
          {isDescription && (
            <di>
              <label for="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </di>
          )}
        </CardBody>
        {/* </Card> */}

        {/* </Box> */}
      </Grommet>
    );
  }
}

// <div>
//   {isUpload && <PhotoUpload />}
//   {is360 && <LocationSearchInput />}
//   {isDescription && <di>
//     <label for="description">Description</label>

//  <textarea id="description" name="description" rows="4" cols="50">
//   </textarea>
//   </di>

//   }
// </div>
//   );
// };

export default EditPage;
