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

    // chartSettings = {}; // TODO should i reset .. this doesn't work.. it create a new local variable... i did NOT know this
    // Reset chartSettings to an empty object
    Object.assign(chartSettings, {});

    chartSettings.title = { text: chartData.title };
    chartSettings.exporting = { enabled: true };
    chartSettings.colors = chartData.colours.length > 0 ? chartData.colours : COLOUR_CODES;
    chartSettings.legend = { enabled: true };
    chartSettings.plotOptions = {
      series: {
        dataLabels: { enabled: true }
      }
    };

    chartSettings.tooltip = {
      borderRadius: 7
    };

    chartSettings.yAxis = {
      min: 0,
      title: {
        text: chartData.unit.suffix ? chartData.unit.axisName + " in " + chartData.unit.suffix : chartData.unit.axisName
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
          /*( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) ||*/ "gray"
        }
      }
    };

    let min;
    const chartDataCategoryObjectList = Array.from(chartData.categories.values());
    if (typeof chartData.isNumericCategories !== "function") {
      throw new Error("Please convert response JSON to a ChartData instance;)");
    }
    if (chartData.isNumericCategories()) {
      const categories = chartDataCategoryObjectList.map((category) => category.value);
      // console.log(categories);
      min = { min: Math.min(...categories) };
    }

    const categories = chartDataCategoryObjectList.map((category) => category.label);

    // const firstCategory = chartDataCategoryObjectList[0];
    // console.log("chartDataCategoryObjectList[0].categoryType1", firstCategory?.categoryType);
    // console.log("chartDataCategoryObjectList[0].categoryType2", firstCategory?.value);
    // console.log("chartDataCategoryObjectList[0].categoryType2", CategoryTypes.DATE);
    // console.log("chartDataCategoryObjectList[0].categoryType3", firstCategory?.categoryType == CategoryTypes.DATE.toString());

    // const categoryValues = Object.values(chartDataCategoryObjectList);
    // const firstCategory = categoryValues[0]
    // console.log(firstCategory.categoryType, firstCategory.categoryType === CategoryTypes.NUMBER);
    // console.log('chartDataCategoryObjectList[0].categoryType', chartDataCategoryObjectList[0].categoryType, chartDataCategoryObjectList[0].categoryType !== CategoryTypes.NUMBER);

    chartSettings.xAxis = {
      min: null,
      categories: categories,
      // type: "category", // firstCategory?.value !== CategoryTypes.NUMBER ? "category" : null,
      // categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      // title: {
      //   text: chartData.unit.axisName + ' in ' + chartData.unit.suffix,
      // },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
          /*( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) ||*/ "gray"
        }
      }
    };
  }
}
