
import React, { useEffect } from 'react';
import {
  Route, Switch, withRouter, BrowserRouter, useHistory,
} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Navbar from './components/NavBar/Navbar.jsx';
import Users from './Pages/UsersPage/Users.jsx';
import Projects from './Pages/ProjectsPage/Projects.jsx';
import Leads from './Pages/LeadsPage/Leads.jsx';
import Home from './Pages/HomePage/Home.jsx';
import SignUp from './Pages/SignUnPage/SignUp.jsx';
import Signin from './Pages/SignInPage/SignIn.jsx';
import Forgot from './Pages/ForgotPasswordPage/ForgotPassword.jsx';
import SingleProjectPage from './Pages/SingleProjectPage/SingleProjectPage.jsx';
import SingleUserPage from './Pages/SingleUserPage/SingleUserPage.jsx';
import AuthContextProvider from './context/auth';
import AddProjectPage from './Pages/ProjectsPage/AddProjectPage.jsx';
import EditUserPage from './Pages/SingleUserPage/EditUserPage.jsx';
import InviteUserPage from './Pages/SingleUserPage/InviteUserPage.jsx';
import NewReserPasswordPage from './Pages/ResetPasswordPage/NewReserPasswordPage.jsx';
import 'react-notifications/lib/notifications.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#32418C' },
  },
});


function App() {
  const history = useHistory();

  useEffect(() => {
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push('/signin');
        }
        const { message } = error.response.data.error;
        NotificationManager.error(message);
        return Promise.reject(error);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // localStorage.setItem('token', '');
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <NotificationContainer />
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/projects" component={Projects} />
              <PrivateRoute exact path="/leads" component={Leads} />
              <Route path="/projects/addproject" component={AddProjectPage} />
              <Route path="/users/inviteuser" component={InviteUserPage} />
              <Route path="/project/:projectId" component={AddProjectPage} />
              <Route exact path="/projects/:projectId" component={SingleProjectPage} />
              <Route exact path="/user/:userId" component={SingleUserPage} />
              <Route exact path="/user/info/:userId" component={SingleUserPage} />
              <Route exact path="/user/edituser/:userId" component={EditUserPage} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={SignUp} />
              <Route path="/Forgot" component={Forgot} />
              {/* <Route exact path="/Reset/:token" component={ResetPassword} /> */}
              <Route path="/Reset/:token" component={NewReserPasswordPage} />
            </Switch>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>

  );
}
export default withRouter(App);
