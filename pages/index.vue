<template>
  <div class="container">
    <canvas id="chartJSContainer" width="600" height="400" />
    ZOOM: {{ zoomLevel }}
  </div>
</template>

<script>
import { Chart } from 'chart.js/dist/Chart'
import 'chartjs-plugin-datalabels'

export default {
  data () {
    return {
      zoomLevel: 1
    }
  },
  async mounted () {
    await import('chartjs-plugin-zoom')

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
                id: 'Article 1',
                x: 49,
                y: 49
              },
              {
                id: 'Article 2',
                x: 52,
                y: 47
              },
              {
                id: 'Article 3',
                x: 66,
                y: 65
              },
              {
                id: 'Article 4',
                x: 69,
                y: 69
              },
              {
                id: 'Article 5',
                x: 72,
                y: 70
              },
              {
                id: 'Article 6',
                x: 46,
                y: 45
              }
            ],
            backgroundColor: '#88DBFD',
            hoverBackgroundColor: '#88DBFD',
            radius: (context) => {
              return 7 * this.zoomLevel
            }
          },
          {
            datalabels: {
              display: true
            },
            label: 'Krankenstand',
            data: [
              {
                x: 70,
                y: 70
              }
            ],
            borderColor: '#FBFDFF',
            backgroundColor: '#FBFDFF',
            hoverBackgroundColor: '#FBFDFF',
            hoverBorderColor: '#FBFDFF',
            hoverRadius: 0,
            radius: (context) => {
              return 100 * this.zoomLevel
            }
          },
          {
            datalabels: {
              display: true
            },
            label: 'Steuern',
            data: [
              {
                x: 50,
                y: 50
              }
            ],
            borderColor: '#FBFDFF',
            backgroundColor: '#FBFDFF',
            hoverBackgroundColor: '#FBFDFF',
            hoverBorderColor: '#FBFDFF',
            hoverRadius: 0,
            radius: (context) => {
              return 100 * this.zoomLevel
            }
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
          },
          zoom: {
            // Container for pan options
            pan: {
              // Boolean to enable panning
              enabled: true,

              // Panning directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow panning in the y direction
              // A function that is called as the user is panning and returns the
              // available directions can also be used:
              //   mode: function({ chart }) {
              //     return 'xy';
              //   },
              mode: 'xy',

              // Which of the enabled panning directions should only be available
              // when the mouse cursor is over one of scale.
              overScaleMode: 'xy',

              rangeMin: {
                // Format of min pan range depends on scale type
                x: null,
                y: null
              },
              rangeMax: {
                // Format of max pan range depends on scale type
                x: null,
                y: null
              },

              // On category scale, factor of pan velocity
              speed: 20,

              // Minimal pan distance required before actually applying pan
              threshold: 10
            },

            // Container for zoom options
            zoom: {
              // Boolean to enable zooming
              enabled: true,

              // Enable drag-to-zoom behavior
              drag: false,

              // Drag-to-zoom effect can be customized
              // drag: {
              //   borderColor: 'rgba(225,225,225,0.3)'
              //   borderWidth: 5,
              //   backgroundColor: 'rgb(225,225,225)',
              //   animationDuration: 0
              // },

              // Zooming directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow zooming in the y direction
              // A function that is called as the user is zooming and returns the
              // available directions can also be used:
              //   mode: function({ chart }) {
              //     return 'xy';
              //   },
              mode: 'xy',

              // Which of the enabled zooming directions should only be available
              // when the mouse cursor is over one of scale.
              overScaleMode: 'xy',

              rangeMin: {
                // Format of min zoom range depends on scale type
                x: null,
                y: null
              },
              rangeMax: {
                // Format of max zoom range depends on scale type
                x: null,
                y: null
              },

              // Speed of zoom via mouse wheel
              // (percentage of zoom on a wheel event)
              speed: 0.1,

              // Minimal zoom distance required before actually applying zoom
              threshold: 2,

              // On category scale, minimal zoom level before actually applying zoom
              sensitivity: 3,

              // Function called while the user is zooming
              onZoom: ({ chart }) => {
                const { min, max } = chart.scales['x-axis-0']
                this.zoomLevel = 100 / (max - min)
              }
            }
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
      const dataPoint = options.data.datasets[_datasetIndex].data[_index]
      alert(dataPoint.id)
      console.log(dataPoint)
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
