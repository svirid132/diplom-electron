export interface XY {
  X: number[];
  Y: number[];
}

export interface Point {
  X: number;
  Y: number;
}

export interface CalculedVals {
  X1OnhOnNmaxOnN0: XY;
  X1Onh: number;
  depthsOnImpulses: XY;
  criticalPoint: Point;
  N0: number;
  Nmax: number;
  NmaxOnN0: number;
  strockRation: number;
  category: string;
}
