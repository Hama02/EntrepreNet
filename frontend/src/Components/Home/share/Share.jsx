import "./share.scss";
import Image from "../../../assets/img.png";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/authContext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

const Share = ({ setRefresh }) => {
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
      setRefresh(true);
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
            {accountType === "Investisseur" && (
              <>
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
                <InputNumber
                  value={budget}
                  onValueChange={(e) => setBudget(e.value)}
                  showButtons
                  buttonLayout="horizontal"
                  step={100}
                  decrementButtonClassName="p-button-danger"
                  incrementButtonClassName="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  mode="currency"
                  currency="EUR"
                />
              </>
            )}
          </div>
          <div className="right">
            <Toast ref={toast} />
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
