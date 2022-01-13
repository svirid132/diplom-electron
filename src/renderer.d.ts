export interface IAPI {
  readRawFile: (Lsh: number, h: number, sec: number) => number[];
}

declare global {
  interface Window {
    API: IAPI;
  }
}
