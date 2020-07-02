import React from "react";
import {useQuery} from "react-query";
import {GetPostList} from "../Queries";

const PostList = (props) => {
  const {isLoading, isFetching, data, isError} = useQuery(["posts"], GetPostList, {
    retry: 1,
    retryDelay: 500
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error getting posts...</p>
  }

  return(
    <div>
      {isFetching && <p>Updating...</p>}
      {data.map(el => {
        return(
          <div>
            <p>ID: {el.id}</p>
            <p>Name: {el.name}</p>
            <p>Body: {el.body}</p>
            <button onClick={() => props.history.push(`/posts/${el.id}`)}>View</button>
          </div>
        )
      })}
    </div>
  )
};

export default PostList;