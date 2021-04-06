import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html'
})
export class Chart3Component implements OnInit {


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
            label: 'Qtd. Transações',
            yAxisID: 'y-axis-1',
            fill: false,
            borderColor: '#007be5',
            data: [],
          },
          {
            type: 'bar',
            label: 'Valor R$',
            data: [],
            yAxisID: 'y-axis-2',
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
    console.log(this.todos)
    var dataAgora = new Date();
    var dataInicial = new Date(dataAgora.getFullYear(), dataAgora.getMonth()-11,1);
    var dataFinal = new Date(dataAgora.getFullYear(), dataAgora.getMonth()+2,0);
    
    var arr = this.todos.filter(
    function(f){ 
      return new Date(f.dataEfetivaLancamento.substring(6,10),(f.dataEfetivaLancamento.substring(3,5)*1),1)>=dataInicial &&
      new Date(f.dataEfetivaLancamento.substring(6,10),(f.dataEfetivaLancamento.substring(3,5)*1),1)<=dataFinal
    })

    var objs = []
    var bancos2 = []

    for(var i=0;i<arr.length;i++){
      var indx=bancos2.indexOf(arr[i].nomeBanco)
      if(indx==-1){
        var obj = {
          banco: arr[i].nomeBanco,
          valor: arr[i].valorLancamentoRemessa,
          qtd: 1 
        }
        objs.push(obj)
        bancos2.push(arr[i].nomeBanco)
      }else{
        objs[indx].valor = objs[indx].valor + arr[i].valorLancamentoRemessa
        objs[indx].qtd = objs[indx].qtd + 1
      }
    }

    //Ordenar Lista de Objetos
    objs = objs.sort(function(a,b){
      return a.valor < b.valor ? 1 : -1
    })

    var bancos = []
    var valores = []
    var qtds = []


    for(var i=0;i<objs.length;i++){
      bancos.push(objs[i].banco)
      valores.push(objs[i].valor)
      qtds.push(objs[i].qtd)
    }

    this.chartData.labels =bancos
    this.chartData.datasets[0].data = qtds
    this.chartData.datasets[1].data =  valores
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
