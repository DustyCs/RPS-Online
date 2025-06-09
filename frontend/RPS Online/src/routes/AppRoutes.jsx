import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MainPage from '../features/main/pages/MainPage'
import Play from '../features/game/pages/Play'

export function AppRoutes() {
  return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/play" element={<Play />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
  )
}
