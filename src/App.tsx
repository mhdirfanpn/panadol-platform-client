import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import SuperAdminLayout from './components/layout/SuperAdminLayout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import DoctorsPage from './pages/DoctorsPage';

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<SuperAdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
