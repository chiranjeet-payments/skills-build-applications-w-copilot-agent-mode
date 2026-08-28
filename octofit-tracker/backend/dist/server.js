import express from 'express';
import cors from 'cors';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
app.use(cors());
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.get('/', (_request, response) => {
    response.json({
        name: 'OctoFit Tracker API',
        status: 'ok',
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
            '/api/health',
        ],
    });
});
app.get('/api/users/', async (_request, response) => {
    const users = await User.find().lean();
    response.json(users);
});
app.get('/api/teams/', async (_request, response) => {
    const teams = await Team.find().lean();
    response.json(teams);
});
app.get('/api/activities/', async (_request, response) => {
    const activities = await Activity.find().populate('userId').lean();
    response.json(activities);
});
app.get('/api/leaderboard/', async (_request, response) => {
    const rankings = await LeaderboardEntry.find().sort({ score: -1 }).lean();
    response.json(rankings);
});
app.get('/api/workouts/', async (_request, response) => {
    const workouts = await Workout.find().lean();
    response.json(workouts);
});
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
export function startServer() {
    return app.listen(port, () => {
        console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
    });
}
