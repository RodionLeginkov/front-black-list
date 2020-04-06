
import React, { useEffect } from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Navbar from './components/NavBar/Navbar';
import Users from './Pages/UsersPage/Users.jsx';
import Projects from './Pages/ProjectsPage/Projects';
import Leads from './Pages/LeadsPage/Leads';
import Home from './Pages/HomePage/Home';
import SignUp from './Pages/SignUnPage/SignUp.jsx';
import Signin from './Pages/SignInPage/SignIn.jsx';
import Forgot from './Pages/ForgotPasswordPage/ForgotPassword.jsx';
import SingleProjectPage from './Pages/SingleProjectPage/SingleProjectPage.jsx';
import SingleUserPage from './Pages/SingleUserPage/SingleUserPage.jsx';
import ResetPassword from './Pages/ResetPasswordPage/ResetPassword.jsx';
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
  useEffect(() => {
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const { message } = error.response.data.error;
        NotificationManager.error(message);
        return Promise.reject(error);
      },
    );
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
export default App;
