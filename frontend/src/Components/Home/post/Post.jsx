/* eslint-disable react/prop-types */
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import axios from "../../../axios";
import { AuthContext } from "../../../Context/authContext";
import Modal from "./Modal";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatBox from "../../ChatContainer";
import { Chip } from "primereact/chip";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(post?.likedBy.includes(currentUser._id));
  const [reportOpen, setReportOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post?._id}/like`);
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

  const handleModalOpen = () => {
    setVisible(true);
  };

  const handleReport = () => {
    setReportOpen(!reportOpen);
  };
  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="top">
          <h3>{post?.title}</h3>
          {post?.budget !== 0 && (
            <Chip label={`${post?.budget} TND`} className="chip" />
          )}
          <button style={{ all: "unset" }} onClick={handleReport}>
            <MoreHorizIcon style={{ cursor: "pointer" }} />
            <div
              className="report-tab"
              style={{ display: `${reportOpen ? "block" : "none"}` }}
            >
              <h3 onClick={handleModalOpen}>Report User</h3>
              <Modal
                visible={visible}
                setVisible={setVisible}
                userId={post.userId._id}
              />
            </div>
          </button>
        </div>
        <div className="content">
          <p>{post?.description}</p>
          <img src={`http://localhost:8000/${post?.picturePath}`} alt="" />
        </div>
        <div className="info">
          <div className="userInfo">
            <img
              src={`http://localhost:8000/${post?.userId.profilePicture}`}
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post?.userId?._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post?.userId?.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="item" onClick={handleToggleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likes} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post?.comments?.length} Comments
          </div>
          {post?.userId?.accountType === "Investisseur" && (
            <div className="item" onClick={handleChatToggle}>
              <ChatOutlinedIcon /> Chat
              {chatOpen && <ChatBox postName={post?.userId?.username} />}
            </div>
          )}
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;
