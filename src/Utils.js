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

export const logExpenses = (searchField, parsedFile) => {
  const regex = new RegExp(searchField + ".*", "gis");
  if (parsedFile) {
    let sum = 0;
    parsedFile.forEach((item) => {
      if (item["#Tytuł"]) {
        let found = item["#Tytuł"].match(regex);
        if (found) {
          sum += parseFloat(item["#Kwota"].replace(" ", ""));
        }
      }
    });
    return sum;
  }
};

export const parseDataForGraphUsage = (parsed) => {
  let temp = [];
  if (parsed) {
    temp = parsed.map((data) => {
      if (
        data["#Data operacji"] != null &&
        !isNaN(Date.parse(data["#Data operacji"]))
      ) {
        return {
          x: data["#Data operacji"],
          y: parseInt(data["#Saldo po operacji"].replace(" ", "")),
        };
      } else return null;
    });
  }

  temp = temp.filter((val) => val != null);
  return temp;
};
