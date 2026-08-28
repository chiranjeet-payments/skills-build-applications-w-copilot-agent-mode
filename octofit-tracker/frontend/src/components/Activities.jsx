import { useEffect, useState } from 'react';
import { fetchCollection, getApiBaseUrl } from '../lib/api.js';

const ACTIVITIES_API_ENDPOINT = `${getApiBaseUrl()}/api/activities/`;

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadActivities() {
      try {
        const data = await fetchCollection(ACTIVITIES_API_ENDPOINT);
        if (!ignore) {
          setActivities(data);
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

    loadActivities();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Minutes</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || activity.date || activity.type}>
                    <td>{activity.type}</td>
                    <td>
                      {typeof activity.userId === 'object' && activity.userId
                        ? activity.userId.name
                        : activity.userId || 'Unknown'}
                    </td>
                    <td>{activity.durationMinutes}</td>
                    <td>{activity.caloriesBurned}</td>
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
