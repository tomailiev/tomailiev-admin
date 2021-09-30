import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Backdrop, CircularProgress, Snackbar, CssBaseline } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Portal from './components/Portal';
import Switcher from './components/Switcher';
import LoadingContext from './context/loadingContext';
import UserContext from './context/userContext';
import { auth } from './utils/firebase-config';
import NotificationContext from './context/notificationContext';
import Items from './components/Items';
import WithAuthGuard from './components/WithAuthGuard';
import AddItem from './components/AddItem';
import ItemContext from './context/itemContext';
import TypeContext from './context/typeContext';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');

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
    <CssBaseline>

      <div className="App">
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationContext.Provider value={{ notification, setNotification }}>
              <ItemContext.Provider value={{ items, setItems }} >
                <TypeContext.Provider value={{ type, setType }}>
                  <Router>
                    <Backdrop open={isLoading}>
                      <CircularProgress color="primary" />
                    </Backdrop>
                    <Header />
                    <Switch>
                      <Route exact path="/" component={Switcher} />
                      <WithAuthGuard path="/login" component={Login} shouldAuth={false} />
                      <WithAuthGuard path="/portal" component={Portal} shouldAuth={true} />
                      <WithAuthGuard path="/view/" component={Items} shouldAuth={true} />
                      <WithAuthGuard path="/add/" component={AddItem} shouldAuth={true} />
                    </Switch>
                  </Router>
                </TypeContext.Provider>
              </ItemContext.Provider>
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
    </CssBaseline>
  );
}

export default App;
