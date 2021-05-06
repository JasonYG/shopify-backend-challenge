import { useState } from "react";
import { AppProvider, Heading, Card, Tabs, Page } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UploadImagePage from "./components/UploadImagePage";
import SellImagePage from "./components/SellImagePage";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);
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
    {
      id: "sell-image",
      content: (
        <Link to="/sell" style={{ textDecoration: "none", color: "#00000" }}>
          Sell
        </Link>
      ),
      accessibilityLabel: "Sell an Image",
      panelId: "sell-image-content-1",
    },
  ];
  const handleSelect = (tab: number) => {
    setCurrentTab(tab);
  };
  return (
    <AppProvider i18n={translations}>
      <Router>
        <Page title="ImageHub">
          <Card>
            <Tabs tabs={tabs} selected={currentTab} onSelect={handleSelect} />
          </Card>
          <Switch>
            <Route path="/upload" component={UploadImagePage}></Route>
            <Route path="/sell" component={SellImagePage}></Route>
          </Switch>
        </Page>
      </Router>
    </AppProvider>
  );
};
export default App;
