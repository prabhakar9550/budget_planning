import { TestBed } from '@angular/core/testing';

import { BudgetPlannerServiceService } from './budget-planner-service.service';

describe('BudgetPlannerServiceService', () => {
  let service: BudgetPlannerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetPlannerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
