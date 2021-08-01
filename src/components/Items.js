import { Container, Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react"
import LoadingContext from "../context/loadingContext";
import NotificationContext from "../context/notificationContext";
import { getContent } from "../utils/firebase-db"
import ItemCard from "./ItemCard";

const Items = ({ location }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { setNotification } = useContext(NotificationContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getContent(location.pathname.substring(6))
            .then(i => {
                setItems(i);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setNotification({open: true, message: err.message})
            });
    }, [location.pathname, setIsLoading, setNotification]);

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="space-evenly" alignItems="stretch" direction="row" spacing={2}>
                {items.map(x => (
                    <Grid container item xs={12} sm={6} md={3} alignItems="stretch">
                        <ItemCard item={x} key={x.id} />
                    </Grid>
                )
                )}
            </Grid>
        </Container>
    )
}

export default Items;