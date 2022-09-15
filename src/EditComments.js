import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditComments(props) {
  const [inputText, setInputText] = useState(props.content);
  const [sightingIndex, setSightingIndex] = useState();

  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const updateComment = async () => {
    //axios post with new content (from inputText) and commentId (props.commentId)
    const response = await axios.put(
      `http://localhost:3001/sightings/${sightingIndex}/comments`,
      { content: inputText, commentId: props.commentId }
    );
    console.log(response.data, "response data");
    console.log("updated");
  };
  return (
    <div>
      Edit:
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" onClick={updateComment}>
        Update
      </button>
    </div>
  );
}

export default EditComments;
