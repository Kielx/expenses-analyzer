import Papa from "papaparse";

export const readParseCSVFile = (event) => {
  return new Promise((res, rej) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
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
            return res(data);
          },
        });
      };

      reader.onerror = function () {
        console.log(reader.error);
        return rej("failed");
      };
    }
  });
};

export const calculateBalance = (file) => {
  const temp = [];
  let balance = 0;
  let negatives = [];
  let positives = [];
  let negativeBalance = 0;
  let positiveBalance = 0;

  if (file) {
    file.forEach((item) => {
      if (item["#Kwota"] !== undefined && parseInt(item["#Kwota"])) {
        temp.push(
          parseFloat(item["#Kwota"].replace(/ /g, "").replace(/,/g, "."))
        );
      }
    });

    balance = temp.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    negatives = temp.filter((value) => {
      return value <= 0;
    });

    positives = temp.filter((value) => {
      return value >= 0;
    });

    negativeBalance = negatives.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    positiveBalance = positives.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }

  return {
    balance,
    negativeBalance,
    positiveBalance,
  };
};
//.replace(/ /g, "").replace(/,/g, ".")
