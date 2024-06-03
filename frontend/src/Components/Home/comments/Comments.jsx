import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../../Context/authContext";
import axios from "../../../axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "primereact/button";
import ReactTimeAgo from "react-time-ago";

// eslint-disable-next-line react/prop-types
const Comments = ({ postId, setCommentsLength }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [showDelete, setShowDelete] = useState({});

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments?post_id=${postId}`);
      setComments(res.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    try {
      await axios.post("/comments/create", {
        content: commentContent,
        postId,
      });
      setCommentContent("");
      fetchComments();
      setCommentsLength((prev) => prev + 1);
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };

  const handleDelete = async (commnetId, postId) => {
    try {
      await axios.delete(`/comments/${commnetId}/${postId}`);
      fetchComments();
      setCommentsLength((prev) => prev - 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="comments">
      <div className="write">
        <img
          src={`http://localhost:8000/${currentUser?.profilePicture}`}
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
      {comments?.map((comment) => (
        <div className="comment" key={comment?._id}>
          <img
            src={`http://localhost:8000/${comment?.user.profilePicture}`}
            alt=""
          />
          <div className="info">
            <span>{comment?.user.username}</span>
            <p>{comment?.content}</p>
          </div>
          {comment?.user._id === currentUser?._id && (
            <MoreHorizIcon
              className="comment-icon"
              onClick={() =>
                setShowDelete({
                  ...showDelete,
                  [comment?._id]: !showDelete[comment?._id],
                })
              }
            />
          )}
          {showDelete[comment?._id] && (
            <Button
              label="Delete"
              severity="danger"
              onClick={() => handleDelete(comment?._id, comment?.post?._id)}
            />
          )}

          <span className="date">
            <ReactTimeAgo date={new Date(comment?.createdAt)} locale="en-US" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
