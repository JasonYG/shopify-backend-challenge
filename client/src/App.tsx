import React, { useEffect } from "react";
import ImageUploader from "react-images-upload";
import { AppProvider, Heading, Card, Tabs, Page } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UploadImagePage from "./components/UploadImagePage";

const App = () => {
  const tabs = [
    {
      id: "upload-image",
      content: (
        <Link to="/upload" style={{ textDecoration: "none", color: "#00000" }}>
          Upload Image
        </Link>
      ),
      accessibilityLabel: "Upload an Image",
      panelId: "upload-image-content-1",
    },
  ];
  return (
    <AppProvider i18n={translations}>
      <Router>
        <Page title="ImageHub">
          <Card>
            <Tabs tabs={tabs} selected={0} onSelect={console.log} />
          </Card>
          <Switch>
            <Route path="/upload" component={UploadImagePage}></Route>
          </Switch>
        </Page>
      </Router>
    </AppProvider>
  );
};
export default App;
