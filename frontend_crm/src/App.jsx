import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Navbar from './components/NavBar/Navbar';
import Users from './Pages/UsersPage/Users';
import Projects from './Pages/ProjectsPage/Projects';
import Home from './Pages/HomePage/Home';
import SignUp from './Pages/SignUnPage/SignUp.jsx';
import Signin from './Pages/SignInPage/SignIn.jsx';
import SingleProjectPage from './Pages/SingleProjectPage/SingleProjectPage.jsx';
import AuthContextProvider from './context/auth';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#32418C' },
  },
});

function App() {
  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App" style={{ marginLeft: '85px' }}>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/projects" component={Projects} />
              <Route exact path="/projects/:projectId" component={SingleProjectPage} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
