import { CalculedVals } from '../function/intarface-math-logic';

interface IAPI {
  readRawFile: (
    Lsh: number,
    h: number,
    sec: number
  ) => Promise<CalculedVals | null>;
}

declare global {
  interface Window {
    API: IAPI;
  }
}
