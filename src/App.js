import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Portal from './components/Portal';
import LoadingContext from './context/loadingContext';
import UserContext from './context/userContext';
import { auth } from './utils/firebase-config';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="App">
      <LoadingContext.Provider value={{ isLoading }}>
        <UserContext.Provider value={{ user }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/portal" component={Portal} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
