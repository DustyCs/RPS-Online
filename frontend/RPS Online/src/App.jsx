import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { PlayerDataProvider } from './context/PlayerDataContext';

function App() {
  return (
    <BrowserRouter>
      <PlayerDataProvider>
        <AppRoutes />
      </PlayerDataProvider>
    </BrowserRouter>
  )
}

export default App
