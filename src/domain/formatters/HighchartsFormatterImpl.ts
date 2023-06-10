// import { Service } from 'typedi';
// import { logger } from "../../logger";
import { COLOUR_CODES } from "../enums/ColorPalette";
import { IllegalArgumentException } from "../exceptions/IllegalArgumentException";
import ChartData from "../models/ChartData";
import IHighchartsFormatter from "./IHighchartsFormatter";

// const log = logger();

// @Service()
export default class HighchartsFormatterImpl implements IHighchartsFormatter {
  public init(chartSettings: any, chartData: ChartData): void {
    if (chartData == null) {
      throw new IllegalArgumentException("Chart data cannot be null");
    }

    chartSettings.title = { text: chartData.title };
    chartSettings.exporting = { enabled: true };
    chartSettings.colors = chartData.colours.length > 0 ? chartData.colours : COLOUR_CODES;
    chartSettings.legend = { enabled: true };
    chartSettings.plotOptions = {
      series: {
        dataLabels:
          { enabled: true },
      },
    };

    chartSettings.tooltip = {
      borderRadius: 7,
    };

    chartSettings.yAxis = {
      min: 0,
      title: {
        text: chartData.unit.axisName + " in " + chartData.unit.suffix,
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: /*( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
            ) ||*/ "gray",
        },
      },
    };

    let min;
    if (chartData.isNumericCategories()) {
      const categories  = Array.from(chartData.categories.values()).map(category => category.value);
      min = { min: Math.min(...categories) };
    }

    chartSettings.xAxis = {
      ...min,
      // categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      // title: {
      //   text: chartData.unit.axisName + ' in ' + chartData.unit.suffix,
      // },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: /*( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
            ) ||*/ "gray",
        },
      },
    };
  }
};
