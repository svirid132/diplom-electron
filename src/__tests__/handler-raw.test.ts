import handleRaw, { isHandleRaw } from '../function/handler-raw';

const fs = require('fs');

const stereoData = fs.readFileSync('assets/square.raw');

describe('math-logic', () => {
  it('handleRaw', () => {
    // console.log('stereoData', stereoData.length);
    const data = handleRaw(stereoData, 1);
    expect(data[0]).toBe(767);
    expect(data[1000]).toBe(64767);
    expect(data.length).toBe(44100);
  });
  it('isHandleRaw', () => {
    expect(isHandleRaw(stereoData, 1)).toBe(true);
    expect(isHandleRaw(stereoData, 5)).toBe(false);
  });
});
