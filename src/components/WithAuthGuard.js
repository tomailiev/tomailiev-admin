import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/userContext";

const WithAuthGuard = ({ component: Component, shouldAuth, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => (
            shouldAuth === !!user?.email
                ? <Component {...props} />
                : <Redirect to={shouldAuth ? '/login' : '/portal'} />
        )} />
    );
}

export default WithAuthGuard;