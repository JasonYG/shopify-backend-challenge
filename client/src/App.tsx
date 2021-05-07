import { useEffect, useState } from "react";
import { AppProvider, Card, Tabs, Page } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import UploadImagePage from "./components/UploadImagePage";
import SellImagePage from "./components/SellImagePage";
import BuyImagePage from "./components/BuyImagePage";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    // Get current tab by checking pathname
    const tab = tabs.findIndex(
      (tab) => tab.pathname === window.location.pathname
    );
    setCurrentTab(tab);
  }, []);
  const tabs = [
    {
      id: "upload-image",
      pathname: "/upload",
      content: "Upload Image",
      accessibilityLabel: "Upload an Image",
      panelId: "upload-image-content-1",
    },
    {
      id: "sell-image",
      pathname: "sell",
      content: "Sell",
      accessibilityLabel: "Sell an Image",
      panelId: "sell-image-content-1",
    },
    {
      id: "buy-image",
      pathname: "buy",
      content: "Buy",
      accessibilityLabel: "Buy an Image",
      panelId: "buy-image-content-1",
    },
  ];
  const handleSelect = (tab: number) => {
    setCurrentTab(tab);
    window.location.pathname = tabs[tab].pathname;
  };
  return (
    <AppProvider i18n={translations}>
      <Router>
        <Page title="ImageHub">
          <Card>
            <Tabs tabs={tabs} selected={currentTab} onSelect={handleSelect} />
          </Card>
          <Switch>
            <Route exact path="/upload" component={UploadImagePage}></Route>
            <Route exact path="/sell" component={SellImagePage}></Route>
            <Route exact path="/buy" component={BuyImagePage}></Route>
            <Redirect to="/upload" />
          </Switch>
        </Page>
      </Router>
    </AppProvider>
  );
};
export default App;
