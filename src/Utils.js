import Papa from "papaparse";

export const readParseCSVFile = (event) => {
  return new Promise((res, rej) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "CP1250");
    let data;
    reader.onload = function (event) {
      let found = event.target.result.match(/#Data operacji.*/gis);

      Papa.parse(found[0], {
        delimiter: ";",
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          data = results.data;
          console.log(data);
          return res(data);
        },
      });
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  });
};
