import { TestBed } from '@angular/core/testing';

import { ConnApiService } from './conn-api.service';

describe('ConnApiService', () => {
  let service: ConnApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
