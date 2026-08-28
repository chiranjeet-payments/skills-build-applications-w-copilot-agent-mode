import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamAlpha = await Team.create({
      name: 'Velocity Crew',
      captain: 'Ava Patel',
      members: ['Ava Patel', 'Noah Kim', 'Olivia Chen', 'Leo Martin'],
      focus: 'Endurance and strength',
      wins: 8,
    });

    const teamBeta = await Team.create({
      name: 'Summit Squad',
      captain: 'Maya Rodriguez',
      members: ['Maya Rodriguez', 'Ethan Brooks', 'Sofia Nguyen', 'Daniel Ruiz'],
      focus: 'HIIT and recovery',
      wins: 5,
    });

    const users = await User.create([
      {
        name: 'Ava Patel',
        email: 'ava@example.com',
        fitnessLevel: 'advanced',
        teamId: teamAlpha._id,
        goals: ['Run 5K', 'Increase strength'],
        isActive: true,
      },
      {
        name: 'Noah Kim',
        email: 'noah@example.com',
        fitnessLevel: 'advanced',
        teamId: teamAlpha._id,
        goals: ['Improve pace', 'Mobility'],
        isActive: true,
      },
      {
        name: 'Olivia Chen',
        email: 'olivia@example.com',
        fitnessLevel: 'intermediate',
        teamId: teamAlpha._id,
        goals: ['Strength balance', 'Nutrition consistency'],
        isActive: true,
      },
      {
        name: 'Maya Rodriguez',
        email: 'maya@example.com',
        fitnessLevel: 'advanced',
        teamId: teamBeta._id,
        goals: ['Race prep', 'Power training'],
        isActive: true,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan@example.com',
        fitnessLevel: 'intermediate',
        teamId: teamBeta._id,
        goals: ['Lose 3kg', 'Cardio endurance'],
        isActive: true,
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 42,
        caloriesBurned: 540,
        date: new Date('2026-08-20'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 610,
        date: new Date('2026-08-21'),
      },
      {
        userId: users[3]._id,
        type: 'Cycling',
        durationMinutes: 38,
        caloriesBurned: 470,
        date: new Date('2026-08-22'),
      },
      {
        userId: users[4]._id,
        type: 'HIIT',
        durationMinutes: 30,
        caloriesBurned: 420,
        date: new Date('2026-08-23'),
      },
    ]);

    await LeaderboardEntry.create([
      { name: 'Ava Patel', score: 950, streak: 12, rank: 1 },
      { name: 'Maya Rodriguez', score: 920, streak: 9, rank: 2 },
      { name: 'Noah Kim', score: 890, streak: 7, rank: 3 },
      { name: 'Olivia Chen', score: 860, streak: 5, rank: 4 },
      { name: 'Ethan Brooks', score: 810, streak: 4, rank: 5 },
    ]);

    await Workout.create([
      {
        name: 'Trail Tempo Run',
        category: 'Cardio',
        difficulty: 'moderate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cooldown walk'],
        equipment: ['Running shoes'],
      },
      {
        name: 'Full Body Circuit',
        category: 'Strength',
        difficulty: 'hard',
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Rows', 'Lunges'],
        equipment: ['Dumbbells', 'Bench'],
      },
      {
        name: 'Core Reset',
        category: 'Mobility',
        difficulty: 'easy',
        durationMinutes: 20,
        exercises: ['Planks', 'Bird dogs', 'Stretching'],
        equipment: ['Yoga mat'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
