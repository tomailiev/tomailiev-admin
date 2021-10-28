import { Container, Grid } from "@material-ui/core";
import { useContext, useEffect } from "react"
import ItemContext from "../context/itemContext";
import LoadingContext from "../context/loadingContext";
import NotificationContext from "../context/notificationContext";
import TypeContext from "../context/typeContext";
import { getContent } from "../utils/firebase-db"
import ItemCard from "./ItemCard";

const Items = ({ location }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { setNotification } = useContext(NotificationContext);
    const { items, setItems } = useContext(ItemContext);
    const { type, setType } = useContext(TypeContext);

    useEffect(() => {
        setIsLoading(true);
        setType(location.pathname.substring(6))
        if (type) {
            getContent(type)
                .then(i => {
                    setItems(i);
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsLoading(false);
                    setNotification({ open: true, message: err.message })
                });
        }

        return () => setItems([]);
    }, [location.pathname, setIsLoading, setNotification, setItems, setType, type]);

    return (
        <Container maxWidth="lg" style={{paddingTop: 10}}>
            <Grid container justifyContent="space-evenly" alignItems="stretch" direction="row" spacing={2}>
                {items.map(x => (
                    <Grid container item xs={12} sm={6} md={3} alignItems="stretch" key={x.id}>
                        <ItemCard item={x} type={location.pathname.substring(6)} />
                    </Grid>
                )
                )}
            </Grid>
        </Container>
    )
}

export default Items;