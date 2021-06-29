import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import AllQuote from "./pages/AllQuote";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>

          <Route path="/quotes" exact>
            <AllQuote />
          </Route>

          <Route path="/quotes/:id">
            <QuoteDetail />
          </Route>

          <Route path="/new-quote">
            <NewQuote />
          </Route>

          {/* to match all routes use [*] as path  */}
          <Route path="*" > 
              <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
