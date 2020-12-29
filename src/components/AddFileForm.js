import React from "react";
import { readParseCSVFile } from "../Utils";

export default function AddFileForm(props) {
  return (
    <div className="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <div class="card-header py-3 ">
          <h6 class="m-0 font-weight-bold text-primary ">
            Choose a file to analyze:
          </h6>
        </div>
        <div class="card-body d-inline-flex">
          <input
            className="btn col"
            onChange={async (event) => {
              let parsedFile = await readParseCSVFile(event);
              props.setParsed(parsedFile);
            }}
            type="file"
            accept=".csv"
          ></input>
          <i class="fas fa-file-upload fa-2x text-gray-300 col-1"></i>
        </div>
      </div>
    </div>
  );
}
