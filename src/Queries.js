import axios from "axios";

export const GetPostList = async () => {
  const {data} = await axios.get("http://localhost:5050/posts/");
  return data
}

export const GetPost = async (key, obj) => {
  const {data} = await axios.get(`http://localhost:5050/posts/${obj.id}`);
  return data
}

export const UpdatePost = async (body) => {
  const {data} = await axios.put(`http://localhost:5050/posts/${body.id}`, body.body);
  return data
}