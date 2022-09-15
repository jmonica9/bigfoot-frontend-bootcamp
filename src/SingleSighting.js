import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditComments from "./EditComments";

const SingleSighting = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [inputText, setInputText] = useState("");
  const [sentComment, setSentComment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    if (sightingIndex) {
      axios
        .get(`http://localhost:3001/sightings/${sightingIndex}`)
        .then((response) => {
          setSighting(response.data);
        });

      axios
        .get(`http://localhost:3001/sightings/${sightingIndex}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    }
    // Only run this effect on change to sightingIndex
  }, [sightingIndex, sentComment]);

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

  const commentsDetails = [];
  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      commentsDetails.push(
        <div key={i}>
          {comments[i].content}{" "}
          <button onClick={(e) => setShowEdit(!showEdit)}>Edit</button>
          <div>
            {showEdit ? (
              <EditComments
                content={comments[i].content}
                commentId={comments[i].id}
              />
            ) : null}
          </div>
        </div>
      );
    }
  }

  const submitComment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/sightings/${sightingIndex}/comments`, {
        content: inputText,
      })
      .then((res) => {
        setInputText("");
        setSentComment(!sentComment);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {sighting && sightingDetails}
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
