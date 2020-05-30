import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return NO if null|undefined is passed', () => {
    const pipe = new YesNoPipe();
    const givenResultNull = pipe.transform(null);
    const givenResultUndefined = pipe.transform(undefined);
    expect(givenResultNull).toEqual('No');
    expect(givenResultUndefined).toEqual('No');
  });

  it('should return NO', () => {
    const pipe = new YesNoPipe();
    const givenResult = pipe.transform(false);
    expect(givenResult).toEqual('No');
  });

  it('should return SI', () => {
    const pipe = new YesNoPipe();

    const givenResult = pipe.transform(true);
    expect(givenResult).toEqual('Si');
  });
});
