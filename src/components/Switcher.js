import { useContext, useEffect } from "react"
import LoadingContext from "../context/loadingContext";
import UserContext from "../context/userContext"

const Switcher = ({ history }) => {
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);

    useEffect(() => {
        if (!user && !isLoading) {
            history.push('/login');
        } else if (user && !isLoading) {
            history.push('/portal');
        }
    }, [history, isLoading, user]);

    return <div>Loading...</div>
}

export default Switcher;