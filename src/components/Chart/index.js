import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March", "April", "May","June","July","August","Sep","Oc","Nov","Dec"],
                datasets: [
                    {
                        label: "Monthly User",
                        data: [10, 5, 3, 5, 2, 3,5,1,2,3,1],


                        backgroundColor: [
                            "#fff"
                        ],

                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],


                    },
                    {
                        label: "Monthly product",
                        data: [3, 15, 20, 50, 2, 7,5,1,21,10,17],



                        borderColor: [
                            'rgb(100, 234, 145)'
                        ],
                        backgroundColor: [
                            "#fff"
                        ],


                    },
                    {
                        label: "Monthly Active User",
                        data: [5, 10, 20, 11, 5, 2,5,0,2,5,3,10],
                        backgroundColor: [
                            "#fff"
                        ],



                        borderColor: [
                            'rgb(216, 151, 235)'
                        ],


                    }
                ]
            },
            options: {
                color: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return value < 0 ? 'red' :  // draw negative values in red
                        index % 2 ? 'blue' :    // else, alternate values in blue and green
                            'green';
                }

            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}

                />
            </div>
        )
    }
}