import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { selectFile, uploadFile } from "../actions";

// Container that holds the choose file button and upload file button
const UploadFile = ({ selectedFile, dispatch }) => {
  return (
    <div>
      <div style={{ paddingBottom: "60px" }}>
        <form
          style={{
            paddingTop: "15px",
          }}
        >
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();

              if (selectedFile) {
                dispatch(uploadFile(selectedFile));
                document.getElementById("uploadInput").value = "";
              }
            }}
            style={{ float: "right" }}
          >
            Upload File
          </Button>
          <label
            htmlFor="uploadInput"
            style={{ float: "right", paddingRight: "15px" }}
          >
            <Button
              color="primary"
              component="span"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("uploadInput").click();
              }}
            >
              Choose File
            </Button>
          </label>
          <input
            type="file"
            name="file"
            id="uploadInput"
            style={{ display: "none" }}
            onChange={(e) => {
              e.preventDefault();
              dispatch(selectFile(e.target.files[0]));
            }}
          />

          <label style={{ float: "right", paddingRight: "15px" }}>
            {selectedFile.name || "No file selected"}
          </label>
        </form>
      </div>
    </div>
  );
};

export default connect()(UploadFile);
