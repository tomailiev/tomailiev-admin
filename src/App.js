import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Portal from './components/Portal';
import Switcher from './components/Switcher';
import LoadingContext from './context/loadingContext';
import UserContext from './context/userContext';
import { auth } from './utils/firebase-config';
import NotificationContext from './context/notificationContext';
import Videos from './components/Videos';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '' });

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        setUser({ email: u.email });
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  function handleSnackbarClose(e, reason) {
    setNotification({ open: false, message: '' })
    if (reason === 'clickaway') {
      return;
    }
  }

  return (
    <div className="App">
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <UserContext.Provider value={{ user, setUser }}>
          <NotificationContext.Provider value={{ notification, setNotification }}>
            <Router>
              <Backdrop open={isLoading}>
                <CircularProgress color="primary" />
              </Backdrop>

              <Header />
              <Switch>
                <Route exact path="/" component={Switcher} />
                <Route path="/login" component={Login} />
                <Route path="/portal" component={Portal} />
                <Route path="/view/videos" component={Videos} />
              </Switch>
            </Router>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={notification.open}
              autoHideDuration={2000}
              message={notification.message}
              onClose={handleSnackbarClose}
            />
          </NotificationContext.Provider>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
