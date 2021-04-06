import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
})
export class Chart1Component implements OnInit {

  constructor() { }

  @Input() todos=[];
  @Input() pagos=[];
  @Input() pendentes=[];
  @Input() erro=[];
  
  chartData = {
      labels: [],
      datasets: [
          {
            type: 'line',
            label: 'Quantidade',
            yAxisID: 'y-axis-1',
            data: [],
            fill: false,
            borderColor: '#007be5'
          },
          {
            type: 'bar',
            label: 'Valor Total',
            yAxisID: 'y-axis-2',
            data: [],
          }
      ]
  };
  options = {
    responsive: true,
    legend:{
      display: true,
      position: 'bottom'
    },
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-2',
          gridLines: {
            display: true,
            drawborder: true,
            drawOnChartArea:false
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-1',
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: (tooltipItem, chart) => {
          const label = chart.labels[tooltipItem.index]
          const realValue = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
          return realValue;
        }
      }
    }
  }

  ngOnInit(): void {
    var dataAgora = new Date();
    var dataInicial = new Date(dataAgora.getFullYear(), dataAgora.getMonth()-11,1);
    var dataFinal = new Date(dataAgora.getFullYear(), dataAgora.getMonth()+1,0);
    
    var labels = []
    var dataset = []
    var qtds = []

    for(var data = dataInicial; data<dataFinal;data = new Date(data.getFullYear(), data.getMonth()+1,1)){
      
      labels.push(this.format1(data))

      var dado = 0
      var arr = this.todos.filter(
      function(f){ 
        return (f.dataEfetivaLancamento.substring(6,10)+"-"+(f.dataEfetivaLancamento.substring(3,5)*1)).indexOf(data.getFullYear()+"-"+(data.getMonth()+1))>-1
      })

      for(var i=0;i<arr.length;i++){
        dado=dado+arr[i].valorLancamentoRemessa
      }
      dataset.push(dado)
      qtds.push(arr.length)
    }

    this.chartData.labels = labels
    this.chartData.datasets[0].data = qtds
    this.chartData.datasets[1].data = dataset
  }


  format1(data:Date){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
  }  
}
