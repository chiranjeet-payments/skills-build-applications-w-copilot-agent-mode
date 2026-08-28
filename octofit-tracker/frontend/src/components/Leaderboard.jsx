import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const LEADERBOARD_API_ENDPOINT = 'https://shiny-doodle-q75j4p9v99q9369wx-8000.app.github.dev/api/leaderboard/';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection(LEADERBOARD_API_ENDPOINT);
        if (!ignore) {
          setRows(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No leaderboard data yet.
                  </td>
                </tr>
              ) : (
                rows.map((entry) => (
                  <tr key={entry._id || entry.name}>
                    <td>{entry.rank || '—'}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.streak}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
