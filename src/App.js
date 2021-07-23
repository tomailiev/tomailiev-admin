import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Portal from './components/Portal';
import Switcher from './components/Switcher';
import LoadingContext from './context/loadingContext';
import UserContext from './context/userContext';
import { auth } from './utils/firebase-config';
import NotificationContext from './context/notificationContext';

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
      <LoadingContext.Provider value={{ isLoading }}>
        <UserContext.Provider value={{ user }}>
          <NotificationContext.Provider value={{ notification, setNotification }}>
            <Header />
            <Router>
              <Switch>
                <Route exact path="/" component={Switcher} />
                <Route path="/login" component={Login} />
                <Route path="/portal" component={Portal} />
              </Switch>
            </Router>
            <Snackbar
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
