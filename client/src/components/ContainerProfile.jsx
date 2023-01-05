import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import BtnProfile from "./BtnProfile";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";

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
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

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
      <CssBaseline />
      <Container maxWidth="xl" >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            color="#333"
            textAlign="center"
            mt="1em"
          >
            My destinations...
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "center",
            marginTop: "2em",
            marginBottom: "2em",
          }}
        >
          <BtnProfile />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            
            height: "60vh",

            marginTop: "8em",
            width: "100%",
            marginLeft: "1px",
            paddingRight: "1em",
            overflowY: "auto",
            margin: "0 auto",
          }}
          maxWidth="md"
        >
          {/* testcard */}
          {listOfPosts.map((value, key, card) => {
            let array = value.image?.img?.data?.data;
            let binaryString = `data:image/jpeg;base64,${arrayBufferToBase64(
              array
            )}`;
            return (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card elevation={5}
                  sx={{ maxWidth: 345, marginBottom: 2 }}
                  onClick={() => viewDetails(value._id)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={binaryString}
                      alt="custom"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {value.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button size="small" color="primary">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => deletePost(event, value._id)}
                      >
                        delete
                      </span>
                    </Button>
                    <Button>
                      <span
                        className="material-symbols-outlined"
                        onClick={editPost}
                      >
                        edit
                      </span>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
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
        </Grid>
      </Container>
    </>
  );
}

export default ContainerProfile;
