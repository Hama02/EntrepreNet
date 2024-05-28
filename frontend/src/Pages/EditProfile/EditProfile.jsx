import { useContext, useState } from "react";
import "./editProfile.scss";
import { AuthContext } from "../../Context/authContext";
import axios from "../../axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import Navbar from "../../Components/Home/navbar/Navbar";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser?.email);
  const [username, setUsername] = useState(currentUser?.username);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/users/changePass/${currentUser?._id}`,
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
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      const returned_data = await res.json();
      if (res.ok) {
        setCurrentUser(returned_data.updatedUser);
        alert("Updated");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    setPreviewURL(URL.createObjectURL(imageFile));
  };
  return (
    <>
      <Navbar />
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
                  <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="item">
                  <span>Username :</span>
                  <InputText
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
                <Button
                  label="Update Changes"
                  icon="pi pi-check"
                  onClick={handleUpdate}
                  loading={loading}
                />
              </div>
            </form>

            <div className="pass">
              <div className="item">
                <span>Old Password</span>
                <Password
                  feedback={false}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="item">
                <span>New Password</span>
                <Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button
                label="Change Your password"
                icon="pi pi-check"
                loading={loading}
                onClick={handlePass}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
