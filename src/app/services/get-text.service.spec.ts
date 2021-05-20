import { TestBed } from '@angular/core/testing';

import { GetTextService } from './get-text.service';

describe('GetTextService', () => {
  let service: GetTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
