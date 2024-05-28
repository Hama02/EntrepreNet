import "./share.scss";
import Image from "../../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/authContext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const Share = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [domain, setDomain] = useState("");
  const domains = [
    { name: "Test domain1" },
    { name: "Test domain2" },
    { name: "Test domain3" },
    { name: "Test domain4" },
    { name: "Test domain5" },
  ];

  const handlePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("domain", domain.name);
    data.set("file", file[0]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/posts/post", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        setFile(null);
        setDomain("");
        alert("Post Created!!");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="title">
            <img
              src={`http://localhost:8000/${currentUser?.profilePicture}`}
              alt=""
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`What's on your mind ${currentUser?.username}?`}
            />
          </div>
          <FloatLabel>
            <InputTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              rows={3}
              cols={190}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              name="file"
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files)}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <Dropdown
                value={domain}
                onChange={(e) => setDomain(e.value)}
                options={domains}
                optionLabel="name"
                placeholder="Select a Domain"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div className="right">
            <Button
              label="Share"
              icon="pi pi-check"
              loading={loading}
              onClick={handlePost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
