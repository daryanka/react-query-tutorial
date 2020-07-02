import React, {useState} from "react";
import {useMutation, useQuery, queryCache} from "react-query";
import {GetPost, UpdatePost} from "../Queries";

const Post = (props) => {
  const {id} = props.match.params;
  const [state, setState] = useState({
    name: "",
    body: ""
  });

  const [mutate, info] = useMutation(UpdatePost, {
    onSuccess: (data) => {
      queryCache.setQueryData(["posts", {id: id}], (prev) => {
        return {
          ...prev,
          name: data.name,
          body: data.body
        }
      })
      refetch()
    }
  })

  const {isLoading, isFetching, data, isError, refetch} = useQuery(["posts", {id: id}], GetPost, {
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setState({
        name: data.name,
        body: data.body
      })
    }
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error getting posts...</p>
  }

  const onChangeHandler = (e) => {
    e.persist()
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const update = async () => {
    try {
      await mutate({
        id: id,
        body: state
      })
    } catch (e) {}
  }

  console.log(info)
  return(
    <div>
      {isFetching && <p>Updating...</p>}
      <div>
        <p>ID: {data.id}</p>
        <p>Name: {data.name}</p>
        <input type="text" value={state.name} name={"name"} onChange={onChangeHandler}/>

        <p>Body: {data.body}</p>
        <input type="text" value={state.body} name={"body"} onChange={onChangeHandler}/>

        <button disabled={info.isLoading} onClick={update}>Update</button>
      </div>
    </div>
  )
}

export default Post