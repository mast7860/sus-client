import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Heading, Tabs } from "@dnb/eufemia/components";

import "@dnb/eufemia/style/basis";
import "@dnb/eufemia/style/components";
import "@dnb/eufemia/style/themes/ui";
import { Home } from "./Components/Home";
import { GlobalStats } from "./Components/GlobalStats";

const tabsData = [
  { title: "Home", key: "/home" },
  { title: "Global Statistics", key: "/globalstats" },
];

const TabsNav = withRouter(
  ({ history, location: { pathname }, match, staticContext, ...rest }) => {
    const selected_key = /\/([^/]*)/g.exec(pathname)[0];
    Heading.resetLevels(1);

    return (
      <Tabs
        data={tabsData}
        selected_key={selected_key}
        on_change={({ key }) => {
          history.push(key);
        }}
        section_style="mint-green"
        {...rest}
      >
        <>
          <Route path="(/|/home)" component={HomePage} />
          <Route path="/globalstats" component={GlobalStatsPage} />
        </>
      </Tabs>
    );
  }
);

export default function App(props) {
  return (
    <Router>
      <TabsNav {...props} />
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

function GlobalStatsPage() {
  return (
    <>
      <GlobalStats />
    </>
  );
}
