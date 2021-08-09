import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";

import ProtectedRoute from './helpers/ProtectedRoutes';

import "./app.css";

import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";

//Importing Pages
import Dashboard from "./pages/Dashboard";
import AllCampaigns from './pages/AllCampaigns';
import CampaignSingleView from './pages/CampaignsSingleView';
import ActivitySingleView from './pages/CampaignActivityView';
import CampaignNew from './pages/CampaignNew';
import ActivityNew from './pages/CampaignActivityNew';
import AllActivity from './pages/AllActivityOverview';

import AllClients from './pages/ClientPages/AllClients';
import EditClient from './pages/ClientPages/EditClient';
import NewClient from './pages/ClientPages/NewClient';

import {AuthContext} from './helpers/AuthContext';


//Login
import Login from './pages/login';


function App() {
  let history = useHistory();
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/auth", {headers: { accessToken: localStorage.getItem("accessToken")}}).then((response) => {
      if(response.data.error){
        setAuthState(false)
        
      } else {
        setAuthState(true);
      }
    })
  }, [])

  return (

   <Router>
     <Switch>
        <Route exact path="/login" component={Login} /> 

      
          <div id="layout-wrapper">
            <Topbar user={authState}/>
            <Sidebar />

            <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={authState} />

            {/** CAMPAIGN TRACKER ROUTES */}
            <ProtectedRoute exact path="/all-campaigns" component={AllCampaigns} isAuth={authState}/>
            <ProtectedRoute exact path="/campaign-view/:id" component={CampaignSingleView} isAuth={authState}/>
            <ProtectedRoute exact path="/activity-view/:id" component={ActivitySingleView} isAuth={authState}/>
            <ProtectedRoute exact path="/new-campaign" component={CampaignNew} isAuth={authState}/>
            <ProtectedRoute exact path="/new-activity/:id" component={ActivityNew} isAuth={authState}/>
            <ProtectedRoute exact path="/activity-overview" component={AllActivity} isAuth={authState}/>
            <ProtectedRoute exact path="/clients" component={AllClients} isAuth={authState}/>

            <ProtectedRoute exact path="/new-client" component={NewClient} isAuth={authState}/>
            <ProtectedRoute exact path="/edit-client/:id" component={EditClient} isAuth={authState}/>


            {/** Login */}
          </div>



    </Switch>
   </Router>

  );
}

export default App;
