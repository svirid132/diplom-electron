import handleImpulses, {
  calcIndexCategory,
  findXFromMaxY,
  calcStrockRation,
} from '../function/math-logic';

describe('math-logic', () => {
  it('findXFromMaxY', () => {
    const Xs: number[] = [1.3, 2.4, 6.5];
    const Ys: number[] = [5, 6.4, 2.5];
    expect(findXFromMaxY(Xs, Ys)).toBe(2.4);
  });
  it('calcIndexCategory', () => {
    const calcValue = calcIndexCategory(0.05848);
    expect(calcValue.toFixed(2)).toBe((7.2739274).toFixed(2));
  });
  it('calcStrockRation', () => {
    const value = calcStrockRation(0.263157895, 4.5, 2500, 588);
    expect(value.toFixed(2)).toBe((1.710827716).toFixed(2));
  });
  it('handleImpulses', () => {
    const impulses = [
      588, 1700, 2500, 2000, 500, 160, 12, 0, 0, 0, 0, 230, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    const calculedVals = handleImpulses(2.5, 4.5, impulses);
    const calcDepths = calculedVals.depthsOnImpulses.X.map((num) =>
      Number(num.toFixed(2))
    );
    const calcImpulses = calculedVals.depthsOnImpulses.Y.map((num) =>
      Number(num.toFixed(2))
    );
    const equalImpulses = [
      588, 1700, 2500, 2000, 500, 160, 12, 0, 0, 0, 0, 230, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    const equalDepths = [
      0, 0.13, 0.26, 0.39, 0.53, 0.66, 0.79, 0.92, 1.05, 1.18, 1.32, 1.45, 1.58,
      1.71, 1.84, 1.97, 2.11, 2.24, 2.37, 2.5,
    ];
    expect(calcDepths).toEqual(equalDepths);
    expect(calcImpulses).toEqual(equalImpulses);
  });
});
