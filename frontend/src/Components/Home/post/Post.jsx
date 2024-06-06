/* eslint-disable react/prop-types */
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useRef, useState } from "react";
import axios from "../../../axios";
import { AuthContext } from "../../../Context/authContext";
import Modal from "./Modal";
import ReactTimeAgo from "react-time-ago";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatBox from "../../ChatContainer";
import { Toast } from "primereact/toast";
import { Chip } from "primereact/chip";
import CheckIcon from "@mui/icons-material/Check"; // Importing CheckIcon

const Post = ({ post, setRefresh, refresh }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(post?.likedBy.includes(currentUser._id));
  const [reportOpen, setReportOpen] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [commentsLength, setCommentsLength] = useState(
    post?.comments?.length || 0
  );

  const handleOffreAccept = async () => {
    try {
      await axios.post(`/offers/acceptOffer/${post?._id}`, {
        acceptedBy: post?.userId,
        acceptedByUsername: currentUser?.username,
      });
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Offer accepted",
      });

      setTimeout(() => {
        setRefresh(!refresh);
      }, 3000);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error accepting offer",
      });
      console.error("Error accepting offer:", error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post?._id}/like`, {
        likedby: currentUser?.username,
      });
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.put(`/posts/${post?._id}/unlike`);
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleToggleLike = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/post/${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleModalOpen = () => {
    setVisible(true);
  };

  const handleReport = () => {
    setReportOpen(!reportOpen);
  };
  const handleDelete = () => {
    setToggleDelete(!toggleDelete);
  };
  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <>
      <div className="post">
        <div className="container">
          <div className="top">
            <h3>{post?.title}</h3>
            {post?.budget !== 0 && (
              <Chip label={`${post?.budget} TND`} className="chip" />
            )}
            <button
              className="btn-handler"
              onClick={
                currentUser?._id !== post?.userId?._id
                  ? handleReport
                  : handleDelete
              }
            >
              <MoreHorizIcon style={{ cursor: "pointer" }} />
              {currentUser &&
              post?.userId &&
              currentUser?._id !== post?.userId?._id ? (
                <div
                  className="report-tab"
                  style={{ display: reportOpen ? "block" : "none" }}
                >
                  <h3 onClick={handleModalOpen}>Report User</h3>
                  <Modal
                    visible={visible}
                    setVisible={setVisible}
                    userId={post?.userId?._id}
                  />
                </div>
              ) : (
                toggleDelete && (
                  <span
                    className="delete-post"
                    onClick={() => deletePost(post?._id)}
                  >
                    Delete Post
                  </span>
                )
              )}
            </button>
          </div>
          <div className="content">
            <p>{post?.description}</p>
            <img src={`http://localhost:8000/${post?.picturePath}`} alt="" />
          </div>
          <div className="info">
            <div className="userInfo">
              <img
                src={`http://localhost:8000/${post?.userId?.profilePicture}`}
                alt=""
              />
              <div className="details">
                <Link
                  to={`/profile/${post?.userId?._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{post?.userId?.username}</span>
                </Link>
                <span className="date">
                  <ReactTimeAgo
                    date={new Date(post?.createdAt)}
                    locale="en-US"
                  />
                </span>
              </div>
            </div>
            <div className="item" onClick={handleToggleLike}>
              {liked ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
              {likes} Likes
            </div>
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              {commentsLength} Comments
            </div>
            {post?.userId?.accountType === "Investisseur" &&
              currentUser?._id !== post?.userId?._id && (
                <div className="item" onClick={handleChatToggle}>
                  <ChatOutlinedIcon /> Negotiate
                  {chatOpen && <ChatBox postName={post?.userId?.username} />}
                </div>
              )}
            <div className="item" onClick={handleOffreAccept}>
              <button className="verification-button" aria-label="Verify">
                <CheckIcon className="bold-icon" />
                <span className="verify-text">Accept Offer</span>
              </button>
            </div>
          </div>

          {commentOpen && (
            <Comments postId={post._id} setCommentsLength={setCommentsLength} />
          )}
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Post;
