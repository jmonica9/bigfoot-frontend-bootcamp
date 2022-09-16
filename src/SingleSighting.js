import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EditComments from "./EditComments";
import { Card, CardContent, Typography, Button } from "@mui/material";
const SingleSighting = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [inputText, setInputText] = useState("");
  const [sentComment, setSentComment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState();

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    if (sightingIndex) {
      axios
        .get(`http://localhost:3000/sightings/${sightingIndex}`)
        .then((response) => {
          setSighting(response.data);
        });

      axios
        .get(`http://localhost:3000/sightings/${sightingIndex}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    }
    // Only run this effect on change to sightingIndex
  }, [sightingIndex, sentComment, updatedComment]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      sightingDetails.push(<div key={key}>{`${key}: ${sighting[key]}`}</div>);
    }
  }

  // const commentsDetails = [];
  // if (comments) {
  //   for (let i = 0; i < comments.length; i++) {
  //     commentsDetails.push(
  //       <div key={i}>
  //         {comments[i].content}{" "}
  //         <button onClick={(e) => setShowEdit(!showEdit)}>Edit</button>
  //         {showEdit ? (
  //           <EditComments
  //             content={comments[i].content}
  //             commentId={comments[i].id}
  //           />
  //         ) : null}
  //         <div></div>
  //       </div>
  //     );
  //   }
  // }
  let commentsDetails;
  if (comments) {
    commentsDetails = comments.map((comment, i) => (
      <div key={i}>
        {comments[i].content}{" "}
        <EditComments
          content={comments[i].content}
          commentId={comments[i].id}
          setUpdatedComment={setUpdatedComment}
          updatedComment={updatedComment}
        />
      </div>
    ));
  }

  const submitComment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/sightings/${sightingIndex}/comments`, {
        content: inputText,
      })
      .then((res) => {
        setInputText("");
        setSentComment(!sentComment);
      });
  };
  const navigate = useNavigate();

  const deleteSighting = (e) => {
    // axios.delete from back end , send the sightingIndex
    axios
      .delete(`http://localhost:3000/sightings/${sightingIndex}`)
      .then((res) => {
        console.log("res", res);
        navigate("/");
      });
  };

  return (
    <div>
      {/* <Link to="/">Go Back</Link> */}
      <Button
        variant="contained"
        aria-label="outlined primary button group"
        onClick={(e) => navigate(-1)}
      >
        Go Back
      </Button>
      <Button
        variant="contained"
        aria-label="outlined primary button group"
        onClick={deleteSighting}
      >
        DELETE THIS
      </Button>

      {sighting && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {sightingDetails}
            </Typography>
          </CardContent>
          {/* <CardActions> */}
          {/* <Button size="small">G</Button> */}
          {/* </CardActions> */}
        </Card>
      )}
      <br></br>
      <p>Comment Section here</p>
      <input
        type="text"
        value={inputText}
        placeholder="comment smth!"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={submitComment}>Submit Comment</button>
      {comments ? commentsDetails : "no commentssss yet"}
    </div>
  );
};

export default SingleSighting;
