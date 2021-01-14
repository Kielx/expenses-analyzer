// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { Pie } from "@nivo/pie";
import { AutoSizer } from "react-virtualized";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function MyResponsivePie(props) {
  function adjust(color, amount) {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  }

  const generateColors = (color) => {
    const colorArray = [];
    let val = -25;

    props.data.forEach((col) => {
      colorArray.push(adjust(color, val));
      val += 20;
    });
    return colorArray;
  };

  return (
    <AutoSizer style={{ width: "100%" }}>
      {({ height, width }) => (
        <Pie
          height={height}
          width={width}
          data={props.data}
          margin={{ top: 20, right: 5, bottom: 20, left: 5 }}
          innerRadius={0.8}
          padAngle={2}
          cornerRadius={0}
          colors={generateColors("#E74C3C")}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableRadialLabels={false}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          radialLabelsLinkDiagonalLength={5}
          sliceLabelsTextColor="#333333"
          sortByValue={true}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "Apteka",
              },
              id: "dots",
            },
            {
              match: {
                id: "Payu",
              },
              id: "lines",
            },
          ]}
        />
      )}
    </AutoSizer>
  );
}
