// import { Builder } from "builder-pattern";
// import HighchartsRequest from "../../application/models/HighchartsRequest";
// import HighchartsResponse from "../../application/models/HighchartsResponse";
// // import { logger } from "../../logger";
// import ChartTypes from "../enums/ChartTypes";
// import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
// import ChartData from "../models/ChartData";
// import Series from "../models/Series";
// import { IChart } from "./IChart";
//
// // const log = logger();
//
// export default class Organogram implements IChart {
//   public chartSettings: {} = {};
//
//   constructor(private readonly highchartFormatter: HighchartsFormatterImpl) {
//   }
//
//   public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
//     this.highchartFormatter.init(this.chartSettings, chartData);
//
//     // console.log(chartData);
//
//     const data = chartData.seriesList.map(seriesOne => this.getSeriesData(seriesOne)).flat(1);
//     const nodes = chartData.seriesList.map(seriesOne => this.getSeriesNodes(seriesOne)).flat(1);
//     // const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));
//
//     this.chartSettings =
//       {
//         ...this.chartSettings,
//         chart: {
//           height: 800,
//           width: 1000,
//           inverted: true,
//         },
//
//         accessibility: {
//           point: {
//             descriptionFormatter(point) {
//               const nodeName = point.toNode.name,
//                 nodeId = point.toNode.id,
//                 nodeDesc = nodeName === nodeId ? nodeName : nodeName + ", " + nodeId,
//                 parentDesc = point.fromNode.id;
//               return point.index + ". " + nodeDesc + ", reports to " + parentDesc + ".";
//             },
//           },
//         },
//
//         series: [
//           {
//             type: ChartTypes.ORGANOGRAM.type,
//             name: chartData.title,
//             keys: ["from", "to"],
//             // data: [
//             //   ['Stakeholders', 'LA FAMILIA'],
//             //   ['LA FAMILIA', 'CEO'],
//             //   ['LA FAMILIA', 'CEO2'],
//             //   ['CEO', 'CSO'],
//             //   ['CEO2', 'CSO'],
//             //   ['CSO', 'Product'],
//             //   ['CTO2', 'Product'],
//             //   ['CEO', 'CTO'],
//             //   ['CEO2', 'CTO'],
//             //   // ['CEO2', 'CTO2'],
//             //   // ['CEO2', 'CPO'],
//             //   // ['CEO2', 'CSO'],
//             //   // ['CEO2', 'HR'],
//             //   // ['CTO2', 'Product'],
//             //   // ['CTO', 'Web'],
//             //   // ['CSO', 'Sales'],
//             //   // ['HR', 'Market'],
//             //   // ['CSO', 'Market'],
//             //   // ['HR', 'Market'],
//             //   // ['CTO', 'Market'],
//             // ],
//             data,
//             levels: [
//               {
//                 level: 0,
//                 color: "silver",
//                 dataLabels: {
//                   color: "black",
//                 },
//                 height: 100,
//               },
//               {
//                 level: 10,
//                 color: "silver",
//                 dataLabels: {
//                   color: "black",
//                 },
//                 height: 100,
//               }, {
//                 level: 1,
//                 color: "#980104",
//               }, {
//                 level: 2,
//                 color: "#359154",
//               }],
//             nodes,
//             // nodes: [
//             //   {
//             //     id: 'Stakeholders',
//             //     name: 'NAME STAKEHOLDER',
//             //   }, {
//             //     id: 'LA FAMILIA',
//             //     title: 'LA Familia',
//             //   }, {
//             //     id: 'CEO',
//             //     title: 'CEO',
//             //     name: 'Papa Amenu',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131126/Highsoft_03862_.jpg',
//             //   }, {
//             //     id: 'CEO2',
//             //     title: 'CEO2',
//             //     name: 'Dada Amenu',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131126/Highsoft_03862_.jpg',
//             //   }, {
//             //     id: 'HR',
//             //     title: 'HR/CFO',
//             //     name: 'Anne Jorunn Fjærestad',
//             //     color: '#007ad0',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg',
//             //   }, {
//             //     id: 'CTO',
//             //     title: 'CTO',
//             //     name: 'Christer Vasseng',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg',
//             //   }, {
//             //     id: 'CTO2',
//             //     title: 'CTO2',
//             //     name: 'Godfrey Coker',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg',
//             //     column: 3,
//             //   }, {
//             //     id: 'CPO',
//             //     title: 'CPO',
//             //     name: 'Torstein Hønsi',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg',
//             //   }, {
//             //     id: 'CSO',
//             //     title: 'CSO',
//             //     name: 'Anita Nesse',
//             //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             //   }, {
//             //     id: 'Product',
//             //     name: 'Product developers',
//             //   }, {
//             //     id: 'Web',
//             //     name: 'Web devs, sys admin',
//             //   }, {
//             //     id: 'Sales',
//             //     name: 'Sales team',
//             //   }, {
//             //     id: 'Market',
//             //     name: 'Marketing team',
//             //     column: 5,
//             //   }
//             //   ],
//             colorByPoint: false,
//             color: "#007ad0",
//             dataLabels: {
//               color: "white",
//             },
//             borderColor: "white",
//             nodeWidth: 60, // actually height for inverted
//             nodeHeight: 80,
//           },
//         ],
//         tooltip: {
//           outside: true,
//         },
//         exporting: {
//           allowHTML: true,
//           sourceWidth: 800,
//           sourceHeight: 600,
//         },
//       };
//
//     return Builder<HighchartsResponse>()
//       .chartType(ChartTypes.ORGANOGRAM.label)
//       .selectedCategory(chartParameters.selectedCategory)
//       .chartConfig(this.chartSettings)
//       .build();
//   };
//
//   private getSeriesData(seriesOne: Series) {
//     const idList = seriesOne.values
//       .map(dataPoint => ([dataPoint.y | 0, parseInt(String(dataPoint.category.value), 10)]))
//       .filter(dataPoint => Array.from(dataPoint.values())[0] != 0)
//       .filter(dataPoint => Array.from(dataPoint.values())[1] != 0);
//
//     // console.log(idList);
//
//     return Array.from(new Set(idList.map(ids => JSON.stringify(ids))))
//       .map(arr => JSON.parse(arr));
//   }
//
//   private getSeriesNodes(seriesOne: Series)/*: { nodes: [{}]; data: [[]] } */ {
//     const a = seriesOne.values
//       .map(dataPoint => ({
//           id: dataPoint.category.value | 0,
//           title: seriesOne.description,
//           name: seriesOne.name,
//           image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg",
//         }),
//       )
//       .filter(point => point.id > 0);
//
//     // console.log(a);
//
//     return a;
//   }
// }
