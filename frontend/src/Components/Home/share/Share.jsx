import "./share.scss";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/authContext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Toast } from "primereact/toast";

const Share = ({ refresh, setRefresh }) => {
  const { currentUser } = useContext(AuthContext);
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [domain, setDomain] = useState("");
  const [budget, setBudget] = useState(0);
  const [accountType] = useState(currentUser.accountType);
  const domains = [
    { name: "Test domain1" },
    { name: "Test domain2" },
    { name: "Test domain3" },
    { name: "Test domain4" },
    { name: "Test domain5" },
  ];

  const handlePost = async (e) => {
    e.preventDefault();
    if (
      accountType === "Investisseur" &&
      (!title || !description || !domain || !file || !budget)
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all fields",
        life: 3000,
      });
      return;
    }

    if (accountType === "Entrepreneur" && (!title || !description || !file)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all fields",
        life: 3000,
      });
      return;
    }
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("domain", domain.name);

    data.set("file", file[0]);
    data.set("budget", budget);
    const type = accountType === "Investisseur" ? "offre" : "post";
    data.set("type", type);
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
        setBudget(0);
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "Post Created",
        });
      }
      setRefresh(!refresh);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something Went Wrong",
        life: 3000,
      });
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <img
          className="profile-picture"
          src={`http://localhost:8000/${currentUser?.profilePicture}`}
          alt=""
        />
        <input
          className="tweet-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`What's happening, ${currentUser?.username}?`}
        />
      </div>
      <textarea
        className="tweet-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What's on your mind?"
      />
      <hr className="tweet-divider" />
      <div className="tweet-footer">
        <input
          className="file-input"
          name="file"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files)}
          style={{ display: "none" }}
        />
        <label htmlFor="file" className="add-image-label">
          <CloudUploadIcon />
          <span>Upload Image</span>
        </label>

        {accountType === "Investisseur" && (
          <Dropdown
            value={domain}
            onChange={(e) => setDomain(e.value)}
            options={domains}
            optionLabel="name"
            placeholder="Select a Domain"
            className="domain-dropdown"
          />
        )}

        <div className="input-container">
          <InputNumber
            value={budget}
            onValueChange={(e) => setBudget(e.value)}
            showButtons
            buttonLayout="horizontal"
            step={100}
            mode="currency"
            currency="EUR"
          />
        </div>
        <Toast ref={toast} />
        <Button
          className="share-button"
          label="Publish"
          icon="pi pi-check"
          loading={loading}
          onClick={handlePost}
        />
      </div>
    </div>
  );
};

export default Share;
