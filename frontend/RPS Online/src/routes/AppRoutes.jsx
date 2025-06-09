import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

export function AppRoutes() {
  return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/play" element={<h1>Home</h1>} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
  )
}
