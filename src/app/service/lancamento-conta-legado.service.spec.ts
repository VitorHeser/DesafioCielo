import { TestBed } from '@angular/core/testing';

import { LancamentoContaLegadoService } from './lancamento-conta-legado.service';

describe('LancamentoContaLegadoService', () => {
  let service: LancamentoContaLegadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancamentoContaLegadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
