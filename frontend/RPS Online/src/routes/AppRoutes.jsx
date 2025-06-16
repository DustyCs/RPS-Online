import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MainPage from '../features/main/pages/MainPage'
import Play from '../features/game/pages/Play'
import About from '../features/main/pages/About'
import Credits from '../features/main/pages/Credits'

export function AppRoutes() {
  return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/play/:gameId" element={<Play />} />
                <Route path="/about" element={<About />} />
                <Route path="/credits" element={<Credits />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
  )
}
