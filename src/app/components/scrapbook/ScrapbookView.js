import React, { Component } from "react";
import FlipPage from "react-flip-page";
import { Box, ResponsiveContext, Grid, Card, Spinner } from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../../index";

import { SinglePage, Map } from "..";

import Default from "./layouts/Default";
import CaptionMiddle from "./layouts/CaptionMiddle";
import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";


export default class ScrapbookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      pages: [],
      pageNum: 1,
      loaded: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  async componentDidMount() {

    if (this.props.params.scrapbookId) {

      const pagesRef = firestore.collection("Pages");
      const queryRef = await pagesRef
        .where("scrapbookId", "==", this.props.params.scrapbookId)
        .get();

      if (queryRef.empty) {
        console.log("No matching docs");
        return;
      }

      const pageData = [];
      queryRef.forEach((doc) => {
        pageData.push(doc.data());
      });

      this.setState(() => {
        return {
          pages: [...this.state.pages, ...pageData]
        };
      });

      return;
    }
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  render() {
    const { pages, pageNum } = this.state;
    // const mapLocations = [this.state.mapLocations];
    const bookStyle = {
      position: "relative",
      alignItems: "flex-end",
      display: "flex",
      height: "100%",
      width: "100%",
    };


    return pages.length > 1 ? (
      <Box>
      <Box
        width={{ min: "85vw" }}
        height={{ min: "75vh" }}
        justify="center"
        align="center"
        background={{
          color: "neutral-1",
          opacity: true,
          position: "bottom",
          repeat: "no-repeat",
          size: "cover",
        }}
        border={{
          color: "border",
          size: "large",
          style: "groove",
          side: "all",
        }}
      >
        <ResponsiveContext.Consumer>
          {/* mobile view */}
          {(size) =>
            size === "small" ? (
              <FlipPage
                flipOnTouch={true}
                width={425}
                height={600}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "24x",
                }}
              >
                <Grid
                  rows={["small", "small", "small"]}
                  columns={["small", "small"]}
                  gap="xsmall"
                  areas={[
                    { name: "card1", start: [0, 0], end: [1, 0] },
                    { name: "nav", start: [0, 1], end: [0, 1] },
                    { name: "main", start: [1, 1], end: [1, 1] },
                    { name: "sub", start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea="card1" background="brand" />
                  <Card gridArea="nav" background="light-5" />
                  <Card gridArea="main" background="light-2" />
                  <Card gridArea="sub" background="light-2" />
                </Grid>
                <Grid
                  rows={["small", "small", "small"]}
                  columns={["small", "small"]}
                  gap="xsmall"
                  areas={[
                    { name: "card1", start: [0, 0], end: [1, 0] },
                    { name: "nav", start: [0, 1], end: [0, 1] },
                    { name: "main", start: [1, 1], end: [1, 1] },
                    { name: "sub", start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea="card1" background="brand" />
                  <Card gridArea="nav" background="light-5" />
                  <Card gridArea="main" background="light-2" />
                  <Card gridArea="sub" background="light-2" />
                </Grid>
              </FlipPage>
            ) : (
              // Webpage
              <div>
                <FlipPage
                  disableSwipe={this.state.edit}
                  flipOnTouch={this.state.edit}
                  flipOnTouchZone={0}
                  width={400}
                  height={525}
                  style={{
                    minWidth: "75vw",

                    minHeight: "95%",

                  }}
                  orientation="horizontal"
                  showSwipeHint={true}
                >

                  {pages.length > 1 ? (
                    <div>
                      <CaptionTop page={pages[1]} />
                    </div>
                  ) : (
                    <div>
                      <Box pad="xxsmall">
                        <Default />
                      </Box>
                      <Box>
                        {/* <CaptionMiddle /> */}
                      </Box>
                      <Box>{/* <CaptionTop /> */}</Box>
                      <Box>
                        <CaptionBottom />
                      </Box>
                    </div>
                  )}
                  <div></div>
                  <div></div>
                </FlipPage>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
        <Box direction="row">
          <Toolbar scrapbookId={this.props.params.scrapbookId} />
        </Box>
      </Box>
    ) : (
      <Spinner />
    );
  }
}

const styles = {
  twoPage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "auto",
    background: "rgba(255,255,255, 0.1)",
  },
  container: {
    padding: 8,
    background:
      "linear-gradient(to top right, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
    minWidth: "95vw",
    borderRadius: "11px",
  },
  singlePage: { width: 390, height: "100%", minHeight: 500 },
};
