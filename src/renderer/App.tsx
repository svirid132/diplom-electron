import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Main from './Main';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}
