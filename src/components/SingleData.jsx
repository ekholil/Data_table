import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { CircularProgress } from "@mui/material";
function SingleData() {
    const [item, setItem] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/items/${id}`)
        .then(res => res.json())
        .then(data => {
            setItem(data)
        })
    },[])
  return (
      
    <div>
        { !item?  <CircularProgress /> :  JSON.stringify(item) }
    </div>
  )
}

export default SingleData