import { Alert, Button, Stack, TextField } from '@mui/material';
import { useState, ChangeEventHandler } from 'react';
import Chart from './Chart';
import { CalculedVals, Point } from '../function/intarface-math-logic';

type DataState = Point[];
interface ParamState {
  Lsh: number;
  h: number;
  sec: number;
}

type HandleType = 'Lsh' | 'h' | 'sec';

function Main() {
  const [calcVals, setCalcVals] = useState<CalculedVals>({} as CalculedVals);
  const [data, setData] = useState<DataState>([]);
  const [param, setParam] = useState<ParamState>({
    Lsh: 1,
    h: 1,
    sec: 1,
  });

  const handleClick = async () => {
    const vals: CalculedVals | null = await window.API.readRawFile(
      param.Lsh,
      param.h,
      param.sec
    );
    if (vals) {
      const points = [];
      for (let i = 0; i < vals.depthsOnImpulses.X.length; ++i) {
        points.push({
          X: +vals.depthsOnImpulses.X[i].toFixed(2),
          Y: vals.depthsOnImpulses.Y[i],
        });
      }
      setData(points);
      setCalcVals(vals);
    }
  };

  const handleInput = (handleType: HandleType) => {
    const handleFunc: ChangeEventHandler<HTMLInputElement> = (event) => {
      const newValue = { ...param };
      if (Number(event.target.value) < 1) return;
      switch (handleType) {
        case 'Lsh': {
          newValue.Lsh = +event.target.value;
          break;
        }
        case 'h': {
          newValue.h = +event.target.value;
          break;
        }
        case 'sec': {
          newValue.sec = +event.target.value;
          break;
        }
        default: {
          break;
        }
      }
      setParam(newValue);
    };
    return handleFunc;
  };

  const strokeRotation = calcVals.strockRation && (
    <Alert icon={false} severity="success">
      {`stroke rotation: ${calcVals.strockRation.toFixed(2)}`}
    </Alert>
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Stack sx={{ width: 250, padding: 1 }} spacing={2}>
        <TextField
          type="number"
          label="Макс. глуб. шпура"
          variant="outlined"
          onChange={handleInput('Lsh')}
          value={param.Lsh}
        />
        <TextField
          type="number"
          label="Высота выработки в мест. изм."
          variant="outlined"
          onChange={handleInput('h')}
          value={param.h}
        />
        <TextField
          type="number"
          label="интервал в сек"
          variant="outlined"
          onChange={handleInput('sec')}
          value={param.sec}
        />
        {strokeRotation}
        <Button variant="contained" onClick={handleClick}>
          Измерить
        </Button>
      </Stack>
      <Chart data={data} />
    </div>
  );
}

export default Main;
