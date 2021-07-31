import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from "@material-ui/core";

function ItemCard({ item, editMode }) {


    return (
        <Grid item sm="12" alignItems="stretch">
            <Card>
                <CardActionArea>
                    {(item.imageUrl || item.audioUrl || item.videoUrl) && <CardMedia
                        component={item.imageUrl ? 'img' : 'iframe'}
                        alt="Contemplative Reptile"
                        width="100%"
                        src={item.imageUrl || item.audioUrl || item.videoUrl}
                        title="Contemplative Reptile"
                    />}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title || item.eventName || item.caption}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description || item.groupName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                    <Button size="small" color="primary">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ItemCard;