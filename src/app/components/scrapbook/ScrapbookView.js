import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page2 from "../demo/DemoPage2";
import { Box, Button, ResponsiveContext, Grid, Card, Spinner } from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../../index";
import { SinglePage, Map, Toolbar } from "..";
import MapContainer from "../map/markerMap/MapContainer";
import { Modal } from "rsuite";
import Default from "./layouts/Default";
import CaptionMiddle from "./layouts/CaptionMiddle";
import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";

export default class ScrapbookView extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      pages: [],
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

      queryRef.forEach((doc) => {
        this.setState((prevState) => {
          return {
            pages: [...prevState.pages, doc.data()],
          };
        });
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
    const { pages } = this.state;
    const bookStyle = {
      position: "relative",
      alignItems: "flex-end",
      display: "flex",
      height: "100%",
      width: "100%",
    };

    return this.state.pages ? (
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
                  {pages.length ? (
                    <SinglePage {...this.state.pages} key={pages} />
                  ) : (
                    ""
                  )}
                  <Box pad="xxsmall">
                    <Default />
                  </Box>
                  <Box>
                    <CaptionMiddle />
                  </Box>
                  <Box>
                    <CaptionTop />
                  </Box>
                  <Box>
                    <CaptionBottom />
                  </Box>
                </FlipPage>
              )
            }
          </ResponsiveContext.Consumer>
        </Box>
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
