import { Button, Stack, TextField } from '@mui/material';

function Main() {
  const asyncFunc = window.API;
  console.log(asyncFunc.readRawFile(123, 123, 123));
  return (
    <Stack sx={{ width: 250 }} spacing={2}>
      <TextField type="number" label="Макс. глуб. шпура" variant="outlined" />
      <TextField
        type="number"
        label="Высота выработки в мест. изм."
        variant="outlined"
      />
      <TextField type="number" label="интервал в сек" variant="outlined" />
      <Button variant="contained">Измерить</Button>
    </Stack>
  );
}

export default Main;
