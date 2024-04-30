import { useContext, useState } from "react";
import "./editProfile.scss";
import { AuthContext } from "../../Context/authContext";
import axios from "../../axios";

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser?.email);
  const [username, setUsername] = useState(currentUser?.username);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/users/${currentUser?._id}`,
        { oldPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      if (data.status === "success") {
        alert("Password Changed!!");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("email", email);
    data.set("username", username);
    data.set("file", selectedImage);
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/users/update/${currentUser?._id}`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.updatedUser);
        alert("updated!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    setPreviewURL(URL.createObjectURL(imageFile));
  };
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />

        <div>
          <img
            src={
              selectedImage
                ? previewURL
                : `http://localhost:8000/${currentUser?.profilePicture}`
            }
            alt="Preview"
            className="profilePic"
          />
        </div>
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <form onSubmit={handleUpdate}>
            <div className="edit">
              <div className="item">
                <span>Email :</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="item">
                <span>Username :</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <input
                type="file"
                name="file"
                onChange={handleImageChange}
                className="custom-file-upload"
              />
              <button>Update Changes</button>
            </div>
          </form>

          <div className="pass">
            <div className="item">
              <span>Old Password</span>
              <input
                value={oldPassword}
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="item">
              <span>New Password</span>
              <input
                value={newPassword}
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button onClick={handlePass}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
