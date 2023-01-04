import "./containerProfile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import BtnProfile from "./BtnProfile";
//import Posts from "./posts/posts";

//fetch id from context api
const id = "63af0594151ed1332c88f2ad";
function ContainerProfile() {
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [delResponse, setdelResponse] = useState(null);
  const [editResponse, setEditResponse] = useState(null);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [content, setcontent] = useState(null);
  const [open, setOpen] = useState(false);

  // const [post, setPost] = useState([]);
  //all posts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/singleuserpost/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);
  function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

  const viewDetails = (id) => {
    navigate({
      pathname: "/post",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  const deletePost = (event, id) => {
    event.stopPropagation();
    axios.delete(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setdelResponse(response.data);
    });
  };

  const editPost = () => {
    console.log("inside edit function");
    setOpen(true);
    axios.get(`http://localhost:5000/api/posts/post/${id}`).then((response) => {
      setEditResponse(response.data);
    });
    editResponse && console.log(editResponse);

    editResponse &&
      setLocation(editResponse.location) &&
      setcontent(editResponse.description) &&
      setImage(editResponse.image);
  };

  return (
    <>
      <h1 style={{ color: "white" }}>my destinations</h1>
      <div className="container" style={{ border: "1px solid white" }}>
        {/* get all posts */}
        {listOfPosts.map((value, key) => {
          let array = value.image?.img?.data?.data
          let binaryString = `data:image/jpeg;base64,${arrayBufferToBase64(array)}`
  
          return (
            <div key={key}>
              <div
                className="post"
                style={{
                  border: "1px solid white",
                  width: "300px",
                  height: "300px",
                }}
                  onClick={() => viewDetails(value._id)}
              >
                {/* <div className="title" >{value.title}</div> */}
                <div className="location">{value.location}</div>
                <div className="content">{value.content}</div>
                <div className="image">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => deletePost(event, value._id)}
                  >
                    delete
                  </span>
                  <span className="material-symbols-outlined" onClick={editPost}>
                    edit
                  </span>
                  <img
                    src={binaryString}
                    style={{ width: "100%", height: "15em" }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {open && (
          <form>
            <input
              type="text"
              name="location"
              id=""
              value={location}
              style={{ width: "30em", marginBottom: "2em" }}
              placeholder="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <textarea
              name="content"
              id=""
              cols="30"
              rows="10"
              value={content}
              placeholder="your description"
              style={{ width: "30em", marginBottom: "2em" }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <br />
            <input
              type="file"
              name="addImg"
              id=""
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <br />
            <button
              type="submit"
              style={{ zIndex: "10", marginTop: "10em", marginBottom: "2em" }}
            >
              Update Post
            </button>
          </form>
        )}
      </div>

      <BtnProfile />
    </>
  );
}

export default ContainerProfile;
