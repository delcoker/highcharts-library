import { Builder } from "builder-pattern";
import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
// import { logger } from "../../logger";
import ChartTypes from "../enums/ChartTypes";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import ChartData from "../models/ChartData";
import Series from "../models/Series";
import { IChart } from "./IChart";

// const log = logger();

export default class Organogram implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    this.highchartFormatter.init(this.chartSettings, chartData);

    // console.log(chartData);

    const data = chartData.seriesList.map(seriesOne => this.getSeriesData(seriesOne)).flat(1);
    const nodes = chartData.seriesList.map(seriesOne => this.getSeriesNodes(seriesOne)).flat(1);
    // const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));

    this.chartSettings =
      {
        ...this.chartSettings,

      chart: {
        height: 500,
          inverted: true
      },

      title: {
        text: 'Highcharts Org Chart'
      },

      accessibility: {
        point: {
          descriptionFormat: '{add index 1}. {toNode.name}' +
          '{#if (ne toNode.name toNode.id)}, {toNode.id}{/if}, ' +
          'reports to {fromNode.id}'
        }
      },

      series: [{
        type: 'organization',
        name: 'Highsoft',
        keys: ['from', 'to'],
        data: [
          ['Shareholders', 'Board'],
          ['Board', 'CEO'],
          ['CEO', 'CTO'],
          ['CEO', 'CPO'],
          ['CEO', 'CSO'],
          ['CEO', 'HR'],
          ['CTO', 'Product'],
          ['CTO', 'Web'],
          ['CSO', 'Sales'],
          ['HR', 'Market'],
          ['CSO', 'Market'],
          ['HR', 'Market'],
          ['CTO', 'Market']
        ],
        levels: [{
          level: 0,
          color: 'silver',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 1,
          color: 'silver',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 2,
          color: '#980104'
        }, {
          level: 4,
          color: '#359154'
        }],
        nodes: [{
          id: 'Shareholders'
        }, {
          id: 'Board'
        }, {
          id: 'CEO',
          title: 'CEO',
          name: 'Atle Sivertsen',
          image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg'
        }, {
          id: 'HR',
          title: 'CFO',
          name: 'Anne Jorunn Fjærestad',
          color: '#007ad0',
          image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'
        }, {
          id: 'CTO',
          title: 'CTO',
          name: 'Christer Vasseng',
          image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
        }, {
          id: 'CPO',
          title: 'CPO',
          name: 'Torstein Hønsi',
          image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
        }, {
          id: 'CSO',
          title: 'CSO',
          name: 'Anita Nesse',
          image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg'
        }, {
          id: 'Product',
          name: 'Product developers'
        }, {
          id: 'Web',
          name: 'Web devs, sys admin'
        }, {
          id: 'Sales',
          name: 'Sales team'
        }, {
          id: 'Market',
          name: 'Marketing team',
          column: 5
        }],
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
          color: 'white'
        },
        borderColor: 'white',
        nodeWidth: 65
      }],
        tooltip: {
      outside: true
    },
      exporting: {
        allowHTML: true,
          sourceWidth: 800,
          sourceHeight: 600
      }

    }


    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.ORGANOGRAM.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };

  private getSeriesData(seriesOne: Series) {
    const idList = seriesOne.values
      // @ts-ignore
      .map(dataPoint => ([dataPoint.y | 0, parseInt(String(dataPoint.category.value), 10)]))
      .filter(dataPoint => Array.from(dataPoint.values())[0] != 0)
      .filter(dataPoint => Array.from(dataPoint.values())[1] != 0);

    // console.log(idList);

    return Array.from(new Set(idList.map(ids => JSON.stringify(ids))))
      .map(arr => JSON.parse(arr));
  }

  private getSeriesNodes(seriesOne: Series)/*: { nodes: [{}]; data: [[]] } */ {
    const a = seriesOne.values
      .map(dataPoint => ({
          id: dataPoint.category.value | 0,
          title: seriesOne.description,
          name: seriesOne.name,
          image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg",
        }),
      )
      .filter(point => point.id > 0);

    // console.log(a);

    return a;
  }
}
