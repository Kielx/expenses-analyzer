import React from "react";
import { readParseCSVFile } from "../Utils";

export default function AddFileForm(props) {
  return (
    <div>
      <input
        onChange={async (event) => {
          let parsedFile = await readParseCSVFile(event);
          props.setParsed(parsedFile);
        }}
        type="file"
        accept=".csv"
      ></input>
    </div>
  );
}
