import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './lib/api.js';
import './App.css';

function App() {
  const navItems = [
    { to: '/', label: 'Overview' },
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Octofit Tracker</p>
            <h1 className="h2 mb-0">Fitness dashboard</h1>
          </div>
          <div className="text-muted small">
            API: {getApiBaseUrl()}
          </div>
        </div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded mt-3 px-3">
          <div className="navbar-nav d-flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="row g-4">
              <div className="col-md-6">
                <Users />
              </div>
              <div className="col-md-6">
                <Teams />
              </div>
              <div className="col-md-6">
                <Activities />
              </div>
              <div className="col-md-6">
                <Leaderboard />
              </div>
              <div className="col-12">
                <Workouts />
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
