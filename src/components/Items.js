import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react"
import getContent from "../utils/firebase-db"
import ItemCard from "./ItemCard";

const Items = ({ location }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getContent(location.pathname.substring(6))
            .then(i => {
                setItems(i);
            })
            .catch(console.error());
    }, [location.pathname]);

    return (
        <Grid container justifyContent="space-evenly" alignItems="stretch" direction="row" spacing={2}>
            {items.map(x => <ItemCard item={x} key={x.id} />)}
        </Grid>
    )
}

export default Items;