import { Component, OnInit } from '@angular/core';
import { LancamentoContaLegadoService } from '../service/lancamento-conta-legado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private service:LancamentoContaLegadoService) { }

  Lancamentos:any[] = []
  LancamentosPagos:any[] = []
  LancamentosPendentes:any[] = []
  LancamentosErros:any[] = []


  ngOnInit(): void {
    this.service.GetLancamentos().subscribe(
      response=>{
        var ListaDeLancamentos = response

        //Caso tenha que subir um nível de consulta, colocar a partir desta linha

        if(ListaDeLancamentos['listaControleLancamento']==undefined){
          ListaDeLancamentos = ListaDeLancamentos
        }else{
          ListaDeLancamentos = ListaDeLancamentos['listaControleLancamento']
        }

        //===========================================================

        this.Lancamentos = ListaDeLancamentos
        ListaDeLancamentos = ListaDeLancamentos.sort( function(a,b){
          var data1 = new Date(a.dataEfetivaLancamento.substring(6,10),a.dataEfetivaLancamento.substring(3,5),a.dataEfetivaLancamento.substring(0,2))
          var data2 = new Date(b.dataEfetivaLancamento.substring(6,10),b.dataEfetivaLancamento.substring(3,5),b.dataEfetivaLancamento.substring(0,2))
          return  data1 < data2 ? 1 : -1 
        } )

        this.LancamentosPagos = ListaDeLancamentos.filter(function(e){
          return e.lancamentoContaCorrenteCliente.nomeSituacaoRemessa.indexOf("Pago")>-1
        })
        this.LancamentosPendentes = ListaDeLancamentos.filter(function(e){
          return e.lancamentoContaCorrenteCliente.nomeSituacaoRemessa.indexOf("Pendente")>-1
        })
        this.LancamentosErros = ListaDeLancamentos.filter(function(e){
          return e.lancamentoContaCorrenteCliente.nomeSituacaoRemessa.indexOf("Erro")>-1
        })

      }, error=>{

      }
    )
  }

}
