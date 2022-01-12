const int16Bytes = 2;
const hz = 44100;

function stereoToMono(stereoData: Buffer): Buffer {
  let isSave = true;
  let count = 0;
  const swith = 2;
  const monoData: Uint8Array = stereoData.filter(() => {
    if (count === swith) {
      count = 0;
      isSave = !isSave;
    }
    count += 1;
    return isSave;
  });
  return Buffer.from(monoData);
}

function normalizeData(data: Buffer): Uint16Array {
  const int16MaxValue = 32767;
  const encData = new Int16Array(
    data.buffer,
    data.byteOffset,
    data.length / int16Bytes
  );
  const normData = Uint16Array.from(
    encData.map((elem) => elem + int16MaxValue)
  );
  return normData;
}

function selectData(normData: Uint16Array, secInterval: number): Uint16Array {
  const countElemInt = secInterval * hz;
  const countInterval = Math.floor(normData.length / countElemInt);
  const dataPaths = [];
  const level = 0.75;
  for (let i = 0; i < countInterval; ++i) {
    const beginIdx = i * countElemInt;
    const dataPath = normData.slice(beginIdx, beginIdx + countElemInt);
    // console.log('begin', beginIdx, beginIdx + countElemInt);
    // console.log('length', dataPath.length);

    const maxValue = Math.max(...dataPath);
    // console.log('maxValue', maxValue);
    const countMaxValue = dataPath.reduce((accam: number, elem) => {
      let newAccam = accam;
      if (elem >= level * maxValue) newAccam += 1;
      return newAccam;
    }, 0);
    dataPaths.push({
      id: i,
      data: dataPath,
      countMaxValue,
    });
  }
  const maxDataPath = dataPaths.reduce(
    (accam, elem) => (elem.countMaxValue > accam.countMaxValue ? elem : accam),
    { id: -1, data: new Uint16Array(), countMaxValue: -1 }
  );
  const selData = maxDataPath.data;
  return selData;
}

function isHandleRaw(data: Buffer, secInterval: number): boolean {
  const countElemInt = secInterval * hz;
  return Math.floor(data.length / int16Bytes / countElemInt) > 0;
}

function handleRaw(stereoData: Buffer, secInterval: number): number[] {
  const monoData = stereoToMono(stereoData);
  // console.log('monoData', monoData.length);
  const normData = normalizeData(monoData);
  // console.log('normData', normData.length);
  const selData = selectData(normData, secInterval);
  // console.log('selData', selData.length);
  return [...selData.values()];
}

export { isHandleRaw };
export default handleRaw;
