export const WORKOUT_MODES = {
  GYM_CALI: 'gym+cali',
  GYM_ONLY: 'gym',
  CALI_ONLY: 'cali',
  HIIT: 'hiit',
  WARMUP: 'warmup',
}

export const MODE_LABELS = {
  'gym+cali': 'Gym + Cali',
  'gym': 'Gym Only',
  'cali': 'Cali Only',
  'hiit': 'HIIT',
  'warmup': 'Warmup',
}

export const MODE_GOALS = {
  'gym+cali': 'Strength + Bodyweight Skills',
  'gym': 'Pure Strength & Hypertrophy',
  'cali': 'Bodyweight Mastery',
  'hiit': 'Fat Loss & Conditioning',
  'warmup': 'Mobility & Recovery',
}

export const HIIT_EXERCISES = [
  { name: 'Burpees', compulsory: true, sets: 4, reps: '10', rest: 30, muscle: 'Full Body, Cardio', youtube: 'https://youtu.be/dZgVxmf6jkA' },
  { name: 'Box Jumps', compulsory: true, sets: 4, reps: '8-10', rest: 45, muscle: 'Quads, Glutes, Power', youtube: 'https://youtu.be/52r_Ul5k03g' },
  { name: 'Kettlebell Swing', compulsory: true, sets: 4, reps: '15', rest: 30, muscle: 'Glutes, Hamstrings, Core', youtube: 'https://youtu.be/sSESeQAir2Y' },
  { name: 'Jump Squats', compulsory: true, sets: 4, reps: '12', rest: 30, muscle: 'Quads, Glutes, Power', youtube: 'https://youtu.be/A-cFYWvaHr0' },
  { name: 'Mountain Climbers', compulsory: true, sets: 4, reps: '20/side', rest: 20, muscle: 'Core, Shoulders, Cardio', youtube: 'https://youtu.be/nmwgirgXLYM' },
  { name: 'Dumbbell Thruster', compulsory: false, sets: 4, reps: '12', rest: 30, muscle: 'Full Body, Cardio', youtube: '' },
  { name: 'Battle Ropes', compulsory: false, sets: 5, reps: '30s', rest: 30, muscle: 'Shoulders, Core, Cardio', youtube: '' },
  { name: 'Tuck Jumps', compulsory: false, sets: 3, reps: '10', rest: 45, muscle: 'Full Body, Power', youtube: '' },
  { name: 'Rowing Machine Intervals', compulsory: false, sets: 6, reps: '250m sprint', rest: 60, muscle: 'Full Body, Cardio', youtube: '' },
  { name: 'Sled Push', compulsory: false, sets: 4, reps: '20m', rest: 60, muscle: 'Legs, Glutes, Cardio', youtube: '' },
  { name: 'Medicine Ball Slam', compulsory: false, sets: 4, reps: '10', rest: 30, muscle: 'Core, Shoulders, Power', youtube: '' },
  { name: 'Plyo Push-Ups', compulsory: false, sets: 3, reps: '8-10', rest: 45, muscle: 'Chest, Triceps, Power', youtube: '' },
  { name: 'High Knees', compulsory: false, sets: 4, reps: '30s', rest: 20, muscle: 'Cardio, Hip Flexors, Core', youtube: '' },
  { name: 'Jump Rope', compulsory: false, sets: 5, reps: '60s', rest: 30, muscle: 'Full Body, Cardio, Coordination', youtube: '' },
  { name: 'Stair Sprints', compulsory: false, sets: 6, reps: '1 flight', rest: 45, muscle: 'Legs, Cardio, Power', youtube: '' },
]

export const WARMUP_EXERCISES = [
  { name: 'Jumping Jacks', compulsory: true, sets: 2, reps: '20', rest: 15, muscle: 'Full Body Activation', youtube: '' },
  { name: 'Arm Circles', compulsory: true, sets: 2, reps: '15/direction', rest: 0, muscle: 'Shoulders, Rotator Cuff', youtube: '' },
  { name: 'Leg Swings (Front-Back)', compulsory: true, sets: 2, reps: '15/leg', rest: 0, muscle: 'Hips, Hamstrings', youtube: '' },
  { name: 'Hip Circles', compulsory: true, sets: 2, reps: '10/direction', rest: 0, muscle: 'Hips, Lower Back', youtube: '' },
  { name: 'Inchworm Walk-Out', compulsory: true, sets: 2, reps: '8', rest: 15, muscle: 'Full Body, Hamstrings, Core', youtube: '' },
  { name: 'World Greatest Stretch', compulsory: true, sets: 2, reps: '5/side', rest: 15, muscle: 'Hips, Thoracic, Ankles', youtube: '' },
  { name: 'Cat-Cow Stretch', compulsory: false, sets: 2, reps: '10', rest: 0, muscle: 'Spine, Core', youtube: '' },
  { name: 'Thoracic Rotation', compulsory: false, sets: 2, reps: '10/side', rest: 0, muscle: 'Upper Back, Spine', youtube: '' },
  { name: 'Glute Bridge', compulsory: false, sets: 2, reps: '15', rest: 15, muscle: 'Glutes, Hamstrings', youtube: 'https://youtu.be/wPM8icPu6H8' },
  { name: 'Bird Dog', compulsory: false, sets: 2, reps: '10/side', rest: 0, muscle: 'Core, Lower Back, Glutes', youtube: '' },
  { name: 'Leg Swings (Lateral)', compulsory: false, sets: 2, reps: '15/leg', rest: 0, muscle: 'Hip Abductors, Adductors', youtube: '' },
  { name: 'Ankle Circles', compulsory: false, sets: 1, reps: '10/direction/ankle', rest: 0, muscle: 'Ankles, Calves', youtube: '' },
  { name: 'Dynamic Quad Stretch', compulsory: false, sets: 2, reps: '10/leg', rest: 0, muscle: 'Quads, Hip Flexors', youtube: '' },
  { name: 'Hip Flexor Lunge Stretch', compulsory: false, sets: 2, reps: '30s/side', rest: 0, muscle: 'Hip Flexors, Groin', youtube: '' },
  { name: 'Shoulder Rolls', compulsory: false, sets: 2, reps: '10/direction', rest: 0, muscle: 'Shoulders, Upper Traps', youtube: '' },
]
