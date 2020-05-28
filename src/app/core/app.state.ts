import { Contract } from '../contracts/components/contract/contract.model';

export interface AppState {
  contractCollection: Contract[];
  dateStart: Date;
  dateEnd: Date | undefined;
}
