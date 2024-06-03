/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "../../../axios";
import { useState } from "react";

export default function FooterDemo({ visible, setVisible, userId }) {
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    setLoading(true);
    try {
      await axios.post("/posts/report", {
        reportedUser: userId,
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setVisible(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={handleReport}
        autoFocus
        loading={loading}
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Spam or Scam Report"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <p className="m-0">
          Are you sure you want to report this user for spam or scam? Please be
          aware that submitting a false report can have consequences. Make sure
          your report is accurate and based on factual evidence.
        </p>
      </Dialog>
    </div>
  );
}
