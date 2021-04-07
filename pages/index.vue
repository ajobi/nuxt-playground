<template>
  <div class="container">
    <canvas id="chartJSContainer" width="600" height="400" />
  </div>
</template>

<script>
import { Chart } from 'chart.js/dist/Chart'
import 'chartjs-plugin-datalabels'

export default {
  mounted () {
    const options = {
      type: 'bubble',
      data: {
        datasets: [
          {
            datalabels: {
              display: false
            },
            data: [
              {
                id: 'point1',
                x: 49,
                y: 49,
                r: 7
              },
              {
                id: 'point2',
                x: 52,
                y: 47,
                r: 7
              },
              {
                id: 'point3',
                x: 66,
                y: 65,
                r: 7
              },
              {
                id: 'point4',
                x: 69,
                y: 69,
                r: 7
              },
              {
                id: 'point5',
                x: 72,
                y: 70,
                r: 7
              },
              {
                id: 'point6',
                x: 46,
                y: 45,
                r: 7
              }
            ],
            backgroundColor: '#88DBFD',
            hoverBackgroundColor: '#88DBFD'
          },
          {
            datalabels: {
              display: true
            },
            label: 'Krankenstand',
            data: [
              {
                x: 70,
                y: 70,
                r: 100
              }
            ],
            borderColor: '#FBFDFF',
            backgroundColor: '#FBFDFF',
            hoverBackgroundColor: '#FBFDFF',
            hoverBorderColor: '#FBFDFF',
            hoverRadius: 0
          },
          {
            datalabels: {
              display: true
            },
            label: 'Steuern',
            data: [
              {
                x: 50,
                y: 50,
                r: 100
              }
            ],
            borderColor: '#FBFDFF',
            backgroundColor: '#FBFDFF',
            hoverBackgroundColor: '#FBFDFF',
            hoverBorderColor: '#FBFDFF',
            hoverRadius: 0
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              min: 0,
              max: 100
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            display: false,
            ticks: {
              min: 0,
              max: 100
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: '#B8C1CA',
            font: {
              size: 20
            },
            formatter (value, context) {
              return context.dataset.label
            },
            offset: -25,
            padding: 0
          }
        }
      }
    }

    const canvas = document.getElementById('chartJSContainer')
    const ctx = canvas.getContext('2d')

    Chart.defaults.global.legend.display = false

    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, options)

    canvas.onclick = function (e) {
      const point = myChart.getElementsAtEvent(e).filter(item => item._datasetIndex === 0)[0]

      if (!point) {
        return
      }

      const { _datasetIndex, _index } = point
      console.log(options.data.datasets[_datasetIndex].data[_index])
    }
  }
}
</script>

<style>
.container {
  margin: auto;
  background-color: hsl(208, 100%, 97%);
}
</style>
