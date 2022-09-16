import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditComments(props) {
  const [inputText, setInputText] = useState(props.content);
  const [sightingIndex, setSightingIndex] = useState();
  const [editing, setEditing] = useState();
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const updateComment = async () => {
    //axios post with new content (from inputText) and commentId (props.commentId)
    const response = await axios.put(
      `http://localhost:3000/sightings/${sightingIndex}/comments`,
      { content: inputText, commentId: props.commentId }
    );
    console.log(response.data, "response data");
    console.log("updated");
    props.setUpdatedComment(!props.updatedComment);
    setEditing(false);
    setInputText("");
  };

  return (
    <div>
      {editing && (
        <div>
          <p>Edit:</p>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={updateComment}>Update</button>
        </div>
      )}

      <button
        type="submit"
        onClick={(e) => {
          setEditing(!editing);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default EditComments;
