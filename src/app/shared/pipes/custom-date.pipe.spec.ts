import { CustomDatePipe } from './custom-date.pipe';

describe('CustomDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });
  it('returns empty if null is passed', () => {
    const pipe = new CustomDatePipe();
    const givenResult = pipe.transform(undefined);
    expect(givenResult).toEqual('');
  });
  it('Parses a date', () => {
    const pipe = new CustomDatePipe();
    const givenResult = pipe.transform('20200510');
    expect(givenResult).toEqual('10/05/2020');
  });
});
