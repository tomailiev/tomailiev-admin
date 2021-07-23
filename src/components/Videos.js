import { useEffect } from "react"
import getContent from "../utils/firebase-db"

const Videos = () => {
    useEffect(() => {
        getContent('events')
            .then(items => console.log(items))
    }, []);

    return <div>videos</div>
}

export default Videos;