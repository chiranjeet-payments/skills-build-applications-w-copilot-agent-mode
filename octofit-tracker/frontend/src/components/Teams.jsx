import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const TEAMS_API_ENDPOINT = 'https://shiny-doodle-q75j4p9v99q9369wx-8000.app.github.dev/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadTeams() {
      try {
        const data = await fetchCollection(TEAMS_API_ENDPOINT);
        if (!ignore) {
          setTeams(data);
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

    loadTeams();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Captain</th>
                <th>Focus</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No teams found.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id || team.name}>
                    <td>{team.name}</td>
                    <td>{team.captain}</td>
                    <td>{team.focus}</td>
                    <td>{Array.isArray(team.members) ? team.members.join(', ') : '—'}</td>
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
