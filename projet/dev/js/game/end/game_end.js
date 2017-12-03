/**
 * @author Ludiwg GUERIN
 */

import "../../globals/flash"
import {removeSpinnerLord} from "../../globals/removeSpinnerLord"
import {Highcharts} from "../../globals/highcharts-loader"

removeSpinnerLord(()=>{}, 100, 500);

$(()=>{
    const data = $("#chart").data("pie");
    Highcharts.chart("chart", {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            backgroundColor: null,
            borderColor: null
        },
        title: {
            text: data.title
        },
        tooltip: {
            pointFormat: ""
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: `<b>{point.name}</b>`
                },
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastColor) || "black"
                }
            }
        },
        series: [
            {
                name: "Lobbies",
                type: "pie",
                colorByPoint: true,
                data: data.points
            }
        ]
    });
});