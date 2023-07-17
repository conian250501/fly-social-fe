import React, { useEffect, useState } from "react";
import styles from "./statisticApp.module.scss";
import { Chart } from "primereact/chart";
type Props = {};

const StatisticApp = (props: Props) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = "#000";
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "Tweets",
          borderColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointBackgroundColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointBorderColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue("#3f9cf0"),
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "Users",
          borderColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointBackgroundColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointBorderColor: documentStyle.getPropertyValue("#3f9cf0"),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue("#3f9cf0"),
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Chart
        type="radar"
        data={chartData}
        options={chartOptions}
        className={styles.chart}
      />
    </div>
  );
};

export default StatisticApp;
