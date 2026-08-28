import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts');
        if (!ignore) {
          setWorkouts(data);
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

    loadWorkouts();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="list-group">
          {workouts.length === 0 ? (
            <div className="text-muted text-center py-3">No workouts found.</div>
          ) : (
            workouts.map((workout) => (
              <div key={workout._id || workout.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <h3 className="h6 mb-1">{workout.name}</h3>
                    <div className="text-muted small mb-2">
                      {workout.category} • {workout.difficulty} • {workout.durationMinutes} min
                    </div>
                    <div className="small">
                      <strong>Exercises:</strong> {Array.isArray(workout.exercises) ? workout.exercises.join(', ') : '—'}
                    </div>
                    <div className="small">
                      <strong>Equipment:</strong> {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : '—'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
