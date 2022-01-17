import { XY, Point, CalculedVals } from './intarface-math-logic';

function findXFromMaxY(Xs: number[], Ys: number[]): number {
  const maxY = Ys.reduce((accam, num) => {
    return accam > num ? accam : num;
  }, -Infinity);

  let maxYOnIndex = 0;
  for (let i = 0; i < Ys.length; ++i) {
    if (maxY === Ys[i]) {
      maxYOnIndex = i;
    }
  }

  return Xs[maxYOnIndex];
}

function calcStrockRation(
  Lsh: number,
  h: number,
  maxImpulse: number,
  zeroImpulse: number
): number {
  const LshOnh = Lsh / h;
  const maxImpulseOnZeroImpulse = maxImpulse / zeroImpulse;
  const calcValue =
    (4.8 * LshOnh ** 3 + 14.0229 * LshOnh ** 2 - 1.5029 * LshOnh + 7.3129) /
    maxImpulseOnZeroImpulse;
  return calcValue;
}

function calcIndexCategory(X1Onh: number): number {
  const caclVal =
    4.8 * X1Onh ** 3 + 14.0229 * X1Onh ** 2 - 1.5029 * X1Onh + 7.3129;
  return caclVal;
}

function calcCriticalPoint(X1onh: number, NmaxOnN0: number): Point {
  const X1OnhForPoint = X1onh * 20 + 1;
  const point: Point = {
    X: NmaxOnN0,
    Y: X1OnhForPoint,
  };
  return point;
}

function handleImpulses(Lsh: number, h: number, impulses: number[]) {
  // X1OnhOnNmaxOnN0
  const constX1Onh = new Array(20).fill(null);
  const constNmaxOnN0 = new Array(20).fill(null);
  for (let i = 0; i < 20; ++i) {
    constX1Onh[i] = i * 0.05;
    constNmaxOnN0[i] =
      4.8 * constX1Onh[i] ** 3 +
      14.0229 * constX1Onh[i] ** 2 -
      1.5029 * constX1Onh[i] +
      7.3129;
  }
  const X1OnhOnNmaxOnN0: XY = {
    X: constX1Onh,
    Y: constNmaxOnN0,
  };

  // depthsOnImpulses
  const step = Lsh / (impulses.length - 1);
  const calcImpulses = new Array(impulses.length).fill(0);
  const calcDepths = new Array(impulses.length).fill(0);
  for (let i = 0; i < impulses.length; ++i) {
    calcImpulses[i] = impulses[i];
    if (i === 0) {
      calcDepths[0] = 0;
      i += 1;
      calcImpulses[i] = impulses[i];
    }
    calcDepths[i] = step + calcDepths[i - 1];
  }
  const depthsOnImpulses: XY = {
    X: calcDepths,
    Y: calcImpulses,
  };

  // X1Onh
  const X1 = findXFromMaxY(calcImpulses, calcDepths);
  const X1Onh = X1 / h;

  // N0 Nmax NmaxOnN0
  const N0 = impulses[0];
  const Nmax = impulses.reduce((accam, num) => {
    return accam > num ? accam : num;
  }, -Infinity);
  const NmaxOnN0 = Nmax / impulses[0];

  // category warning
  const indexCategory = calcIndexCategory(X1Onh);
  const category = NmaxOnN0 > indexCategory ? 'ОПАСНО' : 'НЕОПАСНО';

  // critical point
  const criticalPoint = calcCriticalPoint(X1Onh, NmaxOnN0);

  // strockRation
  const strockRation = calcStrockRation(Lsh, h, Nmax, impulses[0]);

  const calculedValue: CalculedVals = {
    X1OnhOnNmaxOnN0,
    depthsOnImpulses,
    X1Onh,
    criticalPoint,
    N0,
    Nmax,
    NmaxOnN0,
    strockRation,
    category,
  };
  return calculedValue;
}

export default handleImpulses;

export { findXFromMaxY, calcIndexCategory, calcStrockRation };
