import { useContext, useEffect } from "react";
import LoadingContext from "../context/loadingContext";
import UserContext from "../context/userContext";

function Portal({ history }) {
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);

    useEffect(() => {
        if (!user && !isLoading) {
            history.push('/');
            return;
        }
    }, [user, isLoading, history]);

    return <div>
        Welcome to the Portal, user {user?.email}
    </div>
}

export default Portal;