import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html'
})
export class Chart2Component implements OnInit {

  constructor() { }

  @Input() todos=[];
  @Input() pagos=[];
  @Input() pendentes=[];
  @Input() erro=[];

  
  data = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
            ]
        }]    
    };
  
  
    options = {
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItem, chart) => {
            const label = chart.labels[tooltipItem.index]
            const realValue = 'R$: '+chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
            return realValue;
          }
        }
      }
    }
  ngOnInit(): void {
    var dataAgora = new Date();
    var dataInicial = new Date(dataAgora.getFullYear(), dataAgora.getMonth()-11,1);
    var dataFinal = new Date(dataAgora.getFullYear(), dataAgora.getMonth()+1,0);
    

    var arr = this.todos.filter(
    function(f){ 
      return new Date(f.dataEfetivaLancamento.substring(6,10),(f.dataEfetivaLancamento.substring(3,5)*1),1)>=dataInicial &&
      new Date(f.dataEfetivaLancamento.substring(6,10),(f.dataEfetivaLancamento.substring(3,5)*1),1)<=dataFinal
    })
    
    var classificacoes = ["Pago","Pendente","Erro"]
    var valores = [0,0,0]


    for(var i=0;i<arr.length;i++){
      var indx=classificacoes.indexOf(arr[i].lancamentoContaCorrenteCliente.nomeSituacaoRemessa)
      if(indx==-1){
        classificacoes.push(arr[i].lancamentoContaCorrenteCliente.nomeSituacaoRemessa)
        valores.push(arr[i].valorLancamentoRemessa)
      }else{
        valores[indx] = valores[indx] + arr[i].valorLancamentoRemessa

      }
    }
    this.data.labels = classificacoes
    this.data.datasets[0].data = valores

  }

}
