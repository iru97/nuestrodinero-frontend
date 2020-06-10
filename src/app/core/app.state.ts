import { Contract } from '../contracts/components/contract/contract.model';
import { formatDate } from '../utils';

export interface AppState {
  contractCollection: Contract[];
  dateStart: string;
  dateEnd?: string;
}

export const defaultState = (): AppState => ({
  contractCollection: [],
  dateStart: formatDate(new Date()),
});
