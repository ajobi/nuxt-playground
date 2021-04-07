<template>
  <div class="container">
    <canvas id="chartJSContainer" width="600" height="400" />
  </div>
</template>

<script>
import { Chart } from 'chart.js/dist/Chart'

export default {
  mounted () {
    const options = {
      type: 'bubble',
      data: {
        datasets: [
          {
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
            data: [
              {
                x: 50,
                y: 50,
                r: 100
              },
              {
                x: 70,
                y: 70,
                r: 100
              }
            ],
            borderColor: '#FBFDFF',
            backgroundColor: '#FBFDFF',
            hoverBackgroundColor: '#FBFDFF'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        scales:
          {
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
          }
      }
    }

    const canvas = document.getElementById('chartJSContainer')
    const ctx = canvas.getContext('2d')

    Chart.defaults.global.legend.display = false

    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, options)

    canvas.onclick = function (e) {
      const { _datasetIndex, _index } = myChart.getElementsAtEvent(e).filter(item => item._datasetIndex === 0)[0]
      console.log(options.data.datasets[_datasetIndex].data[_index])
    }
  }
}
</script>

<style>
.container {
  background-color: hsl(208, 100%, 97%);
}
</style>
