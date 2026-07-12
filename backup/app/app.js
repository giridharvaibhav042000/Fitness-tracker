// Vaibhav Fitness Tracker - Main Application Logic
// Data Structure and State Management

const WORKOUT_DATA = {
  monday: {
    gym: [
      { name: 'Barbell Back Squat', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/ultWZbUMPL8' },
      { name: 'Romanian Deadlift', compulsory: true, sets: 4, reps: '8-10', rest: 90, muscle: 'Hamstrings, Glutes', youtube: 'https://youtu.be/JCXUYuzwNrM' },
      { name: 'Leg Press', compulsory: true, sets: 3, reps: '10-12', rest: 75, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/IZxyjW7MPJQ' },
      { name: 'Leg Curl Machine', compulsory: false, sets: 3, reps: '12-15', rest: 60, muscle: 'Hamstrings', youtube: 'https://youtu.be/ELOCsoDSmrg' },
      { name: 'Leg Extension', compulsory: false, sets: 3, reps: '12-15', rest: 60, muscle: 'Quads', youtube: 'https://youtu.be/YyvSfVjQeL0' },
      { name: 'Standing Calf Raise', compulsory: false, sets: 3, reps: '15-20', rest: 45, muscle: 'Calves', youtube: 'https://youtu.be/-M4-G8p1fCI' }
    ],
    cali: [
      { name: 'Plank Hold', compulsory: true, sets: 3, reps: '30-45s', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/ASdvN_XEl_c' },
      { name: 'Hollow Body Hold', compulsory: true, sets: 3, reps: '20-30s', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/LlHBMHgMOmo' },
      { name: 'Lying Leg Raises', compulsory: true, sets: 3, reps: '12-15', rest: 30, muscle: 'Core, Hip Flexors', youtube: 'https://youtu.be/l4kQd9eWclE' },
      { name: 'Bodyweight Squats', compulsory: true, sets: 3, reps: '20', rest: 45, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/aclHkVaku9U' },
      { name: 'Reverse Lunges', compulsory: false, sets: 3, reps: '12/leg', rest: 45, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/D7KaRcUTQeE' },
      { name: 'Wall Sit', compulsory: false, sets: 3, reps: '30-45s', rest: 45, muscle: 'Quads', youtube: 'https://youtu.be/y-wV4Venusw' },
      { name: 'Glute Bridge', compulsory: false, sets: 3, reps: '15-20', rest: 30, muscle: 'Glutes, Hamstrings', youtube: 'https://youtu.be/wPM8icPu6H8' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-15 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  tuesday: {
    gym: [
      { name: 'Flat Bench Press', compulsory: true, sets: 4, reps: '6-10', rest: 90, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Incline Bench Press', compulsory: true, sets: 3, reps: '8-12', rest: 75, muscle: 'Upper Chest', youtube: 'https://youtu.be/DbFgADa2PL8' },
      { name: 'Close Grip Bench Press', compulsory: true, sets: 3, reps: '8-12', rest: 60, muscle: 'Triceps, Chest', youtube: 'https://youtu.be/nEF0bv2FW94' },
      { name: 'Dumbbell Flyes', compulsory: false, sets: 3, reps: '12-15', rest: 60, muscle: 'Chest', youtube: 'https://youtu.be/eozdVDA78K0' },
      { name: 'Pec-Dec / Cable Cross', compulsory: false, sets: 3, reps: '12-15', rest: 60, muscle: 'Chest', youtube: 'https://youtu.be/d3oBSXTHJCE' },
      { name: 'Cable Pushdown', compulsory: false, sets: 3, reps: '12-15', rest: 45, muscle: 'Triceps', youtube: 'https://youtu.be/vB5OHsJ3EME' }
    ],
    cali: [
      { name: 'Standard Push-Ups', compulsory: true, sets: 4, reps: '12-15', rest: 60, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/_l3ySVKYVJ8' },
      { name: 'Wide Push-Ups', compulsory: true, sets: 3, reps: '10-12', rest: 60, muscle: 'Outer Chest', youtube: 'https://youtu.be/WpPNGQFMK-s' },
      { name: 'Diamond Push-Ups', compulsory: true, sets: 3, reps: '8-10', rest: 60, muscle: 'Triceps', youtube: 'https://youtu.be/J0DXoz9r4vg' },
      { name: 'Decline Push-Ups', compulsory: false, sets: 3, reps: '8-12', rest: 60, muscle: 'Upper Chest', youtube: 'https://youtu.be/SKH0DkGMZlo' },
      { name: 'Pike Push-Ups', compulsory: false, sets: 3, reps: '8-10', rest: 60, muscle: 'Shoulders', youtube: 'https://youtu.be/x7_I5SUAd00' },
      { name: 'Tricep Dips (Chair)', compulsory: false, sets: 3, reps: '10-15', rest: 45, muscle: 'Triceps', youtube: 'https://youtu.be/0326dy_-CzM' }
    ],
    cardio: { type: 'Stationary Bike', duration: '12-15 min', details: 'Level 5-8, 70-90 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' }
  },
  wednesday: {
    gym: [
      { name: 'Deadlift', compulsory: true, sets: 4, reps: '5-6', rest: 90, muscle: 'Full Posterior Chain', youtube: 'https://youtu.be/op9kVnSso6Q' },
      { name: 'Bent-Over Barbell Row', compulsory: true, sets: 4, reps: '8-10', rest: 75, muscle: 'Back Thickness', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Lat Pulldown', compulsory: true, sets: 3, reps: '10-12', rest: 60, muscle: 'Lats, Back Width', youtube: 'https://youtu.be/CAwf7n6Luuc' },
      { name: 'Barbell Curl', compulsory: true, sets: 3, reps: '8-12', rest: 60, muscle: 'Biceps', youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
      { name: 'Seated Cable Row', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Mid Back', youtube: 'https://youtu.be/GZbfZ033f74' },
      { name: 'Hammer Curl', compulsory: false, sets: 3, reps: '10-12', rest: 45, muscle: 'Brachialis, Biceps', youtube: 'https://youtu.be/zC3nLlEvin4' },
      { name: 'Wrist Curl (Barbell)', compulsory: false, sets: 3, reps: '15-20', rest: 45, muscle: 'Forearm Flexors', youtube: 'https://youtu.be/16preceded0' },
      { name: 'Reverse Wrist Curl', compulsory: false, sets: 3, reps: '15-20', rest: 45, muscle: 'Forearm Extensors', youtube: 'https://youtu.be/IQRBHg16uF8' }
    ],
    cali: [
      { name: 'Dead Hang', compulsory: true, sets: 3, reps: '20-30s', rest: 60, muscle: 'Grip, Lats', youtube: 'https://youtu.be/B4n84Jn3oJE' },
      { name: 'Negative Pull-Ups', compulsory: true, sets: 4, reps: '4-6', rest: 90, muscle: 'Lats, Biceps', youtube: 'https://youtu.be/1R3sXvYBrv0' },
      { name: 'Australian Pull-Ups', compulsory: true, sets: 3, reps: '8-12', rest: 75, muscle: 'Back, Biceps', youtube: 'https://youtu.be/bMsHFGLKMHo' },
      { name: 'Hanging Knee Raises', compulsory: true, sets: 3, reps: '10-12', rest: 45, muscle: 'Core, Hip Flexors', youtube: 'https://youtu.be/aMkBGpWLi98' },
      { name: 'Superman Hold', compulsory: false, sets: 3, reps: '20-30s', rest: 30, muscle: 'Lower Back', youtube: 'https://youtu.be/z6PJMT2y8GQ' },
      { name: 'Bicycle Crunches', compulsory: false, sets: 3, reps: '15/side', rest: 30, muscle: 'Obliques, Core', youtube: 'https://youtu.be/9FGilxCbdz8' },
      { name: 'Towel Hang', compulsory: false, sets: 2, reps: '15-20s', rest: 60, muscle: 'Forearm Grip', youtube: 'https://youtu.be/2bsg4vxrW5o' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-12 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  thursday: {
    gym: [
      { name: 'Overhead Press (Barbell)', compulsory: true, sets: 4, reps: '6-10', rest: 90, muscle: 'Shoulders, Triceps', youtube: 'https://youtu.be/2yjwXTZQDDI' },
      { name: 'Dumbbell Shoulder Press', compulsory: true, sets: 3, reps: '10-12', rest: 75, muscle: 'Shoulders', youtube: 'https://youtu.be/qEwKCR5JCog' },
      { name: 'Lateral Raise', compulsory: false, sets: 4, reps: '12-15', rest: 45, muscle: 'Side Delts', youtube: 'https://youtu.be/3VcKaXpzqRo' },
      { name: 'Face Pull', compulsory: false, sets: 3, reps: '15', rest: 45, muscle: 'Rear Delts, Rotator Cuff', youtube: 'https://youtu.be/V8dZ3tigERU' },
      { name: 'Barbell Shrugs', compulsory: false, sets: 3, reps: '12-15', rest: 60, muscle: 'Traps', youtube: 'https://youtu.be/cJRVVxmytaM' },
      { name: 'Upright Row', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Traps, Side Delts', youtube: 'https://youtu.be/um3VlFIhFAo' }
    ],
    cali: [
      { name: 'Pike Push-Ups', compulsory: true, sets: 4, reps: '8-12', rest: 60, muscle: 'Shoulders', youtube: 'https://youtu.be/x7_I5SUAd00' },
      { name: 'Wall Handstand Hold', compulsory: true, sets: 3, reps: '15-20s', rest: 60, muscle: 'Shoulders, Core', youtube: 'https://youtu.be/zy5E7_8cECU' },
      { name: 'Plank', compulsory: true, sets: 3, reps: '40s', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/ASdvN_XEl_c' },
      { name: 'Shoulder Taps (Plank)', compulsory: false, sets: 3, reps: '20 taps', rest: 45, muscle: 'Core, Shoulders', youtube: 'https://youtu.be/OeWgMYzj3IE' },
      { name: 'Side Plank', compulsory: false, sets: 3, reps: '25s/side', rest: 30, muscle: 'Obliques', youtube: 'https://youtu.be/wqzrZlIl35U' },
      { name: 'Mountain Climbers', compulsory: false, sets: 3, reps: '20/side', rest: 30, muscle: 'Core, Cardio', youtube: 'https://youtu.be/nmwgirgXLYM' }
    ],
    cardio: { type: 'Stationary Bike', duration: '12-15 min', details: 'Level 5-8, 70-90 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' }
  },
  friday: {
    gym: [
      { name: 'Barbell Curl', compulsory: true, sets: 4, reps: '8-12', rest: 60, muscle: 'Biceps Peak', youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
      { name: 'Incline Dumbbell Curl', compulsory: true, sets: 3, reps: '10-12', rest: 60, muscle: 'Biceps Stretch', youtube: 'https://youtu.be/soxrZlIl35U' },
      { name: 'Overhead Triceps Extension', compulsory: true, sets: 3, reps: '10-12', rest: 60, muscle: 'Triceps Long Head', youtube: 'https://youtu.be/nRiJVZDpdL0' },
      { name: 'Hammer Curl', compulsory: false, sets: 3, reps: '10-12', rest: 45, muscle: 'Brachialis', youtube: 'https://youtu.be/zC3nLlEvin4' },
      { name: 'Preacher Curl', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Biceps', youtube: 'https://youtu.be/fIWP-FRFNU0' },
      { name: 'Rope Pushdown', compulsory: false, sets: 3, reps: '12-15', rest: 45, muscle: 'Triceps Lateral Head', youtube: 'https://youtu.be/vB5OHsJ3EME' },
      { name: 'Skull Crushers', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Triceps', youtube: 'https://youtu.be/l3WDbQHPRQU' },
      { name: 'Farmer Walk', compulsory: false, sets: 3, reps: '30-45s', rest: 60, muscle: 'Forearm Grip Strength', youtube: 'https://youtu.be/rt14ArRMLvk' },
      { name: 'Plate Pinch Hold', compulsory: false, sets: 3, reps: '20-30s', rest: 45, muscle: 'Forearm Pinch Grip', youtube: 'https://youtu.be/rnhSp-mxJIs' }
    ],
    cali: [
      { name: 'Burpees', compulsory: true, sets: 4, reps: '8-10', rest: 60, muscle: 'Full Body', youtube: 'https://youtu.be/dZgVxmf6jkA' },
      { name: 'Jump Squats', compulsory: true, sets: 3, reps: '10-12', rest: 60, muscle: 'Quads, Power', youtube: 'https://youtu.be/A-cFYWvaHr0' },
      { name: 'Push-Up to T-Rotation', compulsory: true, sets: 3, reps: '8/side', rest: 45, muscle: 'Chest, Core, Obliques', youtube: 'https://youtu.be/RzOiTxMa8M0' },
      { name: 'Inchworm Walk-Out', compulsory: false, sets: 3, reps: '8-10', rest: 45, muscle: 'Full Body, Mobility', youtube: 'https://youtu.be/1M5Z_jxKMvo' },
      { name: 'Plank to Down-Dog', compulsory: false, sets: 3, reps: '10', rest: 30, muscle: 'Core, Shoulders', youtube: 'https://youtu.be/jWpUMdCxoAo' },
      { name: 'V-Ups', compulsory: false, sets: 3, reps: '10-12', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/7UGaafhFmDQ' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-12 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  saturday: {
    gym: [
      { name: 'Barbell Back Squat', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Full Lower Body', youtube: 'https://youtu.be/ultWZbUMPL8' },
      { name: 'Flat Bench Press', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Deadlift', compulsory: true, sets: 3, reps: '6-8', rest: 90, muscle: 'Posterior Chain', youtube: 'https://youtu.be/op9kVnSso6Q' },
      { name: 'Bent-Over Row', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Back', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Kettlebell Swing', compulsory: false, sets: 3, reps: '15', rest: 45, muscle: 'Glutes, Cardio', youtube: 'https://youtu.be/sSESeQAir2Y' },
      { name: 'Dumbbell Thruster', compulsory: false, sets: 3, reps: '12', rest: 45, muscle: 'Full Body, Fat Burn', youtube: 'https://youtu.be/L219gBEcfb4' }
    ],
    cali: [
      { name: 'Pull-Up (Assisted/Full)', compulsory: true, sets: 4, reps: 'max reps', rest: 90, muscle: 'Lats, Biceps', youtube: 'https://youtu.be/eGo4IYlbE5g' },
      { name: 'Parallel Bar Dips', compulsory: true, sets: 4, reps: '8-12', rest: 90, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/2z8JmcrW-As' },
      { name: 'L-Sit Tuck Hold', compulsory: true, sets: 3, reps: '10-15s', rest: 60, muscle: 'Core, Hip Flexors', youtube: 'https://youtu.be/IUZJoD_rdTM' },
      { name: 'Box Jumps / Jump Squats', compulsory: false, sets: 3, reps: '8-10', rest: 60, muscle: 'Power, Legs', youtube: 'https://youtu.be/52r_Ul5k03g' },
      { name: 'Bear Crawl', compulsory: false, sets: 3, reps: '15m', rest: 45, muscle: 'Full Body', youtube: 'https://youtu.be/TNLMFH3HKZQ' }
    ],
    cardio: { type: 'HIIT Sprints', duration: '10-12 min', details: '30s on / 30s off, 8-10 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' }
  },
  sunday: {
    gym: [],
    cali: [],
    cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light outdoor walk, optional stretching/yoga', youtube: '' }
  }
};

const FOOD_DATABASE = {
  'Chicken Breast 100g': { protein: 31, carbs: 0, fats: 3.6 },
  '2 Whole Eggs': { protein: 13, carbs: 1, fats: 10 },
  'Paneer 100g': { protein: 18, carbs: 1.2, fats: 20 },
  'Dal 200g': { protein: 18, carbs: 40, fats: 1 },
  'Curd 100g': { protein: 10, carbs: 5, fats: 4 },
  'Whey Protein 1 scoop': { protein: 24, carbs: 3, fats: 1 },
  'Rice 100g cooked': { protein: 2.7, carbs: 28, fats: 0.3 },
  'Roti 1 piece': { protein: 3, carbs: 15, fats: 0.4 },
  'Banana 1 medium': { protein: 1.3, carbs: 27, fats: 0.3 },
  'Almonds 30g': { protein: 6, carbs: 6, fats: 14 }
};

// Application State
let appState = {
  currentWeek: 1,
  currentDay: getCurrentDayName(),
  currentSession: 'gym',
  workoutHistory: [],
  personalRecords: {},
  bodyMeasurements: [],
  dailyNutrition: { protein: 0, carbs: 0, fats: 0, meals: [] },
  startDate: new Date()
};

// Get current day name
function getCurrentDayName() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

// LocalStorage Functions
function saveState() {
  localStorage.setItem('fitnessAppState', JSON.stringify(appState));
}

function loadState() {
  const saved = localStorage.getItem('fitnessAppState');
  if (saved) {
    appState = JSON.parse(saved);
    appState.startDate = new Date(appState.startDate);
  }
}

// Export/Import Functions
function exportWorkoutData() {
  const exportData = {
    exportDate: new Date().toISOString(),
    appVersion: '1.0',
    data: appState
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `vaibhav-fitness-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showNotification('✅ Workout data exported successfully!');
}

function importWorkoutData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        
        if (!importedData.data || !importedData.data.workoutHistory) {
          throw new Error('Invalid backup file format');
        }
        
        // Confirm before overwriting
        if (confirm('⚠️ This will replace all current data. Continue?')) {
          appState = importedData.data;
          appState.startDate = new Date(appState.startDate);
          saveState();
          
          // Refresh current screen
          if (document.getElementById('dashboardScreen').classList.contains('active')) {
            updateDashboard();
          } else if (document.getElementById('workoutScreen').classList.contains('active')) {
            loadWorkoutScreen();
          } else if (document.getElementById('progressScreen').classList.contains('active')) {
            loadProgressScreen();
          }
          
          showNotification('✅ Workout data imported successfully!');
        }
      } catch (error) {
        showNotification('❌ Error importing data: Invalid file format');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

function updateWorkoutData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        
        if (!importedData.data || !importedData.data.workoutHistory) {
          throw new Error('Invalid backup file format');
        }
        
        const imported = importedData.data;
        
        // Show merge options dialog
        const mergeChoice = confirm(
          '🔄 UPDATE MODE\n\n' +
          'Click OK to MERGE data (keeps current + adds new)\n' +
          'Click Cancel to see what will be merged'
        );
        
        if (mergeChoice) {
          // Merge workout history (combine arrays, remove duplicates by date)
          const mergedWorkouts = [...appState.workoutHistory];
          imported.workoutHistory.forEach(workout => {
            const exists = mergedWorkouts.some(w => 
              w.date === workout.date && w.exercise === workout.exercise
            );
            if (!exists) {
              mergedWorkouts.push(workout);
            }
          });
          appState.workoutHistory = mergedWorkouts;
          
          // Merge personal records (keep best values)
          Object.keys(imported.personalRecords || {}).forEach(exercise => {
            const importedPR = imported.personalRecords[exercise];
            const currentPR = appState.personalRecords[exercise];
            
            if (!currentPR || importedPR.weight > currentPR.weight) {
              appState.personalRecords[exercise] = importedPR;
            }
          });
          
          // Merge body measurements (combine arrays, sort by date)
          const mergedMeasurements = [...appState.bodyMeasurements, ...(imported.bodyMeasurements || [])];
          const uniqueMeasurements = mergedMeasurements.filter((m, index, self) =>
            index === self.findIndex(t => t.date === m.date)
          );
          appState.bodyMeasurements = uniqueMeasurements.sort((a, b) => 
            new Date(a.date) - new Date(b.date)
          );
          
          // Use imported week if higher
          if (imported.currentWeek > appState.currentWeek) {
            appState.currentWeek = imported.currentWeek;
          }
          
          // Keep earlier start date
          const importedStart = new Date(imported.startDate);
          if (importedStart < appState.startDate) {
            appState.startDate = importedStart;
          }
          
          saveState();
          
          // Refresh current screen
          if (document.getElementById('dashboardScreen').classList.contains('active')) {
            updateDashboard();
          } else if (document.getElementById('workoutScreen').classList.contains('active')) {
            loadWorkoutScreen();
          } else if (document.getElementById('progressScreen').classList.contains('active')) {
            loadProgressScreen();
          }
          
          showNotification('✅ Data merged successfully! Combined workouts and PRs.');
        } else {
          // Show preview
          const newWorkouts = imported.workoutHistory.filter(workout => 
            !appState.workoutHistory.some(w => 
              w.date === workout.date && w.exercise === workout.exercise
            )
          ).length;
          
          alert(
            '📊 MERGE PREVIEW\n\n' +
            `New workouts to add: ${newWorkouts}\n` +
            `Current workouts: ${appState.workoutHistory.length}\n` +
            `Import file workouts: ${imported.workoutHistory.length}\n\n` +
            'Run Update again to merge.'
          );
        }
      } catch (error) {
        showNotification('❌ Error updating data: Invalid file format');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

function clearAllData() {
  if (confirm('⚠️ This will delete ALL workout data permanently. Are you sure?')) {
    if (confirm('🚨 FINAL WARNING: This cannot be undone!')) {
      localStorage.removeItem('fitnessAppState');
      localStorage.removeItem('lastNutritionReset');
      
      // Reset to initial state
      appState = {
        currentWeek: 1,
        currentDay: getCurrentDayName(),
        currentSession: 'gym',
        workoutHistory: [],
        personalRecords: {},
        bodyMeasurements: [],
        dailyNutrition: { protein: 0, carbs: 0, fats: 0, meals: [] },
        startDate: new Date()
      };
      
      saveState();
      updateDashboard();
      showNotification('✅ All data cleared');
    }
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1F2937;
    color: #E2E8F0;
    padding: 16px 24px;
    border-radius: 12px;
    border: 2px solid #F97316;
    font-family: 'Oxanium', sans-serif;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(249,115,22,0.3);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Screen Navigation
function switchScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  document.getElementById(`${screenName}Screen`).classList.add('active');
  event.target.closest('.nav-item').classList.add('active');
  
  if (screenName === 'dashboard') updateDashboard();
  if (screenName === 'workout') {
    // Set current day if not already set
    if (!appState.currentDay || appState.currentDay === '') {
      appState.currentDay = getCurrentDayName();
    }
    loadWorkoutScreen();
  }
  if (screenName === 'progress') loadProgressScreen();
  if (screenName === 'diet') loadDietScreen();
}

function switchSession(sessionType) {
  appState.currentSession = sessionType;
  document.querySelectorAll('.session-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderExercises();
}

// Dashboard Functions
function updateDashboard() {
  const today = new Date();
  document.getElementById('currentDate').textContent = 
    today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Calculate current week
  const daysSinceStart = Math.floor((today - appState.startDate) / (1000 * 60 * 60 * 24));
  appState.currentWeek = Math.min(Math.floor(daysSinceStart / 7) + 1, 6);
  document.getElementById('currentWeek').textContent = appState.currentWeek;
  
  // Count this week's workouts
  const thisWeekStart = new Date(appState.startDate);
  thisWeekStart.setDate(thisWeekStart.getDate() + (appState.currentWeek - 1) * 7);
  const weekWorkouts = appState.workoutHistory.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= thisWeekStart && workoutDate < new Date(thisWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  }).length;
  document.getElementById('weekWorkouts').textContent = `${weekWorkouts}/6`;
  
  // Total workouts
  document.getElementById('totalWorkouts').textContent = appState.workoutHistory.length;
  
  // Streak calculation
  const streak = calculateStreak();
  document.getElementById('streak').textContent = streak;
  
  // Week progress
  const progress = (weekWorkouts / 6) * 100;
  document.getElementById('weekProgressBar').style.width = `${progress}%`;
  
  // Render week day grid
  renderWeekDayGrid();
}

function calculateStreak() {
  if (appState.workoutHistory.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    const hasWorkout = appState.workoutHistory.some(w => w.date === dateStr);
    
    if (hasWorkout) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

function renderWeekDayGrid() {
  const container = document.getElementById('weekDayGrid');
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  container.innerHTML = days.map((day, i) => {
    // Map array index to actual day of week
    // Array: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    // Days: [1, 2, 3, 4, 5, 6, 0]
    let actualDayIndex;
    if (i === 6) {
      actualDayIndex = 0; // Sunday
    } else {
      actualDayIndex = i + 1; // Monday-Saturday
    }
    
    const isToday = actualDayIndex === today;
    const isRest = i === 6; // Sunday
    const dateStr = getTodayDateString();
    const hasWorkout = appState.workoutHistory.some(w => w.date === dateStr && w.day === dayNames[i]);
    
    return `
      <div class="day-circle ${isToday ? 'today' : ''} ${hasWorkout ? 'completed' : ''} ${isRest ? 'rest' : ''}"
           onclick="selectDay('${dayNames[i]}')">
        ${day}
      </div>
    `;
  }).join('');
}

function selectDay(day) {
  appState.currentDay = day;
  switchScreen('workout');
}

function startTodayWorkout() {
  const today = getCurrentDayName();
  appState.currentDay = today;
  appState.currentSession = 'gym';
  switchScreen('workout');
}

// Workout Screen Functions
function loadWorkoutScreen() {
  // Ensure current day is set
  if (!appState.currentDay || appState.currentDay === '') {
    appState.currentDay = getCurrentDayName();
  }
  
  const dayDisplay = appState.currentDay.toUpperCase();
  document.getElementById('selectedDay').textContent = dayDisplay;
  
  // Reset session tab active states
  document.querySelectorAll('.session-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.session-tab')[0].classList.add('active'); // Make gym active by default
  appState.currentSession = 'gym';
  
  renderExercises();
}

function renderExercises() {
  const container = document.getElementById('exerciseList');
  const exercises = WORKOUT_DATA[appState.currentDay][appState.currentSession];
  
  if (appState.currentSession === 'cardio') {
    const cardio = exercises;
    container.innerHTML = `
      <div class="exercise-card">
        <div class="exercise-header">
          <div>
            <div class="exercise-name">${cardio.type}</div>
            <div class="exercise-muscle">${cardio.duration} — ${cardio.details}</div>
          </div>
          ${cardio.youtube ? `<button class="video-btn" onclick="openVideoModal('${cardio.type}', '${cardio.youtube}')">▶ Watch</button>` : ''}
        </div>
      </div>
    `;
    return;
  }
  
  if (!exercises || exercises.length === 0) {
    container.innerHTML = '<div class="loading">🏖️ Rest Day — No workout scheduled</div>';
    return;
  }
  
  container.innerHTML = exercises.map((ex, idx) => `
    <div class="exercise-card ${ex.compulsory ? 'compulsory' : ''}" id="exercise-${idx}">
      <div class="exercise-header">
        <div>
          <div class="exercise-name">
            ${ex.compulsory ? '<span class="exercise-star">⭐</span>' : ''}
            ${ex.name}
          </div>
          <div class="exercise-muscle">${ex.muscle}</div>
        </div>
        <button class="video-btn" onclick="openVideoModal('${ex.name}', '${ex.youtube}')">▶ Watch</button>
      </div>
      
      <div class="exercise-prescription">
        <span class="prescription-pill">${ex.sets} sets</span>
        <span class="prescription-pill">${ex.reps} reps</span>
        <span class="prescription-pill">${ex.rest}s rest</span>
      </div>
      
      <div class="set-logger">
        ${Array.from({length: ex.sets}, (_, i) => `
          <div class="set-row">
            <span class="set-label">Set ${i + 1}</span>
            <input type="number" class="set-input" placeholder="Weight (kg)" 
                   id="weight-${idx}-${i}" step="0.5">
            <input type="number" class="set-input" placeholder="Reps" 
                   id="reps-${idx}-${i}">
            <div class="set-check" id="check-${idx}-${i}" 
                 onclick="toggleSetComplete(${idx}, ${i}, ${ex.rest})">
              ✓
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="rest-timer" id="timer-${idx}">
        <div class="timer-display" id="timer-display-${idx}">00:00</div>
        <div class="timer-controls">
          <button class="timer-btn" onclick="startRestTimer(${idx}, ${ex.rest})">Start ${ex.rest}s Rest</button>
          <button class="timer-btn" onclick="stopRestTimer(${idx})">Skip</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Set Logging Functions
function toggleSetComplete(exerciseIdx, setIdx, restTime) {
  const checkEl = document.getElementById(`check-${exerciseIdx}-${setIdx}`);
  const weightEl = document.getElementById(`weight-${exerciseIdx}-${setIdx}`);
  const repsEl = document.getElementById(`reps-${exerciseIdx}-${setIdx}`);
  
  if (checkEl.classList.contains('completed')) {
    checkEl.classList.remove('completed');
  } else {
    checkEl.classList.add('completed');
    
    // Save the set data
    const weight = parseFloat(weightEl.value) || 0;
    const reps = parseInt(repsEl.value) || 0;
    
    if (weight > 0 && reps > 0) {
      saveSetData(exerciseIdx, setIdx, weight, reps);
      
      // Auto-start rest timer
      startRestTimer(exerciseIdx, restTime);
    }
  }
}

function saveSetData(exerciseIdx, setIdx, weight, reps) {
  const dateStr = getTodayDateString();
  const exercises = WORKOUT_DATA[appState.currentDay][appState.currentSession];
  const exerciseName = exercises[exerciseIdx].name;
  
  let workout = appState.workoutHistory.find(w => 
    w.date === dateStr && 
    w.day === appState.currentDay && 
    w.session === appState.currentSession
  );
  
  if (!workout) {
    workout = {
      date: dateStr,
      day: appState.currentDay,
      session: appState.currentSession,
      exercises: []
    };
    appState.workoutHistory.push(workout);
  }
  
  let exercise = workout.exercises.find(e => e.name === exerciseName);
  if (!exercise) {
    exercise = { name: exerciseName, sets: [] };
    workout.exercises.push(exercise);
  }
  
  exercise.sets[setIdx] = { weight, reps };
  
  // Check for PR
  checkPersonalRecord(exerciseName, weight, reps);
  
  saveState();
}

function checkPersonalRecord(exerciseName, weight, reps) {
  const currentPR = appState.personalRecords[exerciseName];
  const volume = weight * reps;
  
  if (!currentPR || volume > currentPR.weight * currentPR.reps) {
    appState.personalRecords[exerciseName] = {
      weight,
      reps,
      date: getTodayDateString()
    };
    
    // Show notification (simple alert for now)
    setTimeout(() => {
      if (window.confirm(`🎉 New Personal Record!\n${exerciseName}\n${weight}kg × ${reps} reps`)) {
        saveState();
      }
    }, 500);
  }
}

function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

// Rest Timer Functions
let activeTimers = {};

function startRestTimer(exerciseIdx, duration) {
  const timerEl = document.getElementById(`timer-${exerciseIdx}`);
  const displayEl = document.getElementById(`timer-display-${exerciseIdx}`);
  
  timerEl.classList.add('active');
  
  if (activeTimers[exerciseIdx]) {
    clearInterval(activeTimers[exerciseIdx]);
  }
  
  let timeLeft = duration;
  displayEl.textContent = formatTime(timeLeft);
  
  activeTimers[exerciseIdx] = setInterval(() => {
    timeLeft--;
    displayEl.textContent = formatTime(timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(activeTimers[exerciseIdx]);
      playTimerSound();
      timerEl.classList.remove('active');
    }
  }, 1000);
}

function stopRestTimer(exerciseIdx) {
  if (activeTimers[exerciseIdx]) {
    clearInterval(activeTimers[exerciseIdx]);
  }
  document.getElementById(`timer-${exerciseIdx}`).classList.remove('active');
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function playTimerSound() {
  // Vibration if available
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
  
  // Visual feedback
  document.body.style.backgroundColor = 'var(--gym)';
  setTimeout(() => {
    document.body.style.backgroundColor = 'var(--bg)';
  }, 300);
}

// Video Modal Functions
function openVideoModal(exerciseName, youtubeUrl) {
  const modal = document.getElementById('videoModal');
  const modalTitle = document.getElementById('modalExerciseName');
  const videoContainer = document.getElementById('videoContainer');
  
  modalTitle.textContent = exerciseName;
  
  // Extract YouTube video ID and create embed
  const videoId = youtubeUrl.split('/').pop().split('?')[0];
  videoContainer.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
  
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  
  videoContainer.innerHTML = '';
  modal.classList.remove('active');
}

// Progress Screen Functions
function loadProgressScreen() {
  renderPersonalRecords();
  updateBodyMeasurements();
}

function renderPersonalRecords() {
  const container = document.getElementById('prList');
  const prs = Object.entries(appState.personalRecords);
  
  if (prs.length === 0) {
    container.innerHTML = '<div class="loading">No personal records yet. Start training to set PRs!</div>';
    return;
  }
  
  container.innerHTML = prs
    .sort((a, b) => (b[1].weight * b[1].reps) - (a[1].weight * a[1].reps))
    .map(([exercise, pr]) => `
      <div class="pr-card">
        <div>
          <div class="pr-exercise">${exercise}</div>
          <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
            ${new Date(pr.date).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div class="pr-value">${pr.weight}kg × ${pr.reps}</div>
        </div>
      </div>
    `).join('');
}

function updateBodyMeasurements() {
  const latestMeasurement = appState.bodyMeasurements[appState.bodyMeasurements.length - 1];
  
  if (latestMeasurement) {
    document.getElementById('currentWeight').textContent = latestMeasurement.weight.toFixed(1);
    
    if (appState.bodyMeasurements.length > 1) {
      const firstMeasurement = appState.bodyMeasurements[0];
      const change = latestMeasurement.weight - firstMeasurement.weight;
      const changeEl = document.getElementById('weightChange');
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}`;
      changeEl.style.color = change > 0 ? 'var(--cardio)' : 'var(--warn)';
    }
  } else {
    document.getElementById('currentWeight').textContent = '75.2';
    document.getElementById('weightChange').textContent = '+0.0';
  }
}

// Diet Screen Functions
function loadDietScreen() {
  updateNutritionDisplay();
  renderMealList();
}

function updateNutritionDisplay() {
  const targets = { protein: 125, carbs: 240, fats: 70 };
  
  document.getElementById('proteinValue').textContent = appState.dailyNutrition.protein;
  document.getElementById('carbsValue').textContent = appState.dailyNutrition.carbs;
  document.getElementById('fatsValue').textContent = appState.dailyNutrition.fats;
  
  document.getElementById('proteinProgress').style.width = 
    `${Math.min((appState.dailyNutrition.protein / targets.protein) * 100, 100)}%`;
  document.getElementById('carbsProgress').style.width = 
    `${Math.min((appState.dailyNutrition.carbs / targets.carbs) * 100, 100)}%`;
  document.getElementById('fatsProgress').style.width = 
    `${Math.min((appState.dailyNutrition.fats / targets.fats) * 100, 100)}%`;
}

function renderMealList() {
  const container = document.getElementById('mealList');
  
  if (appState.dailyNutrition.meals.length === 0) {
    container.innerHTML = '<div class="loading">No meals logged today. Add your meals above!</div>';
    return;
  }
  
  container.innerHTML = appState.dailyNutrition.meals.map((meal, idx) => `
    <div class="meal-item">
      <div>
        <div style="font-weight: 600;">${meal.name}</div>
        <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
          P: ${meal.protein}g · C: ${meal.carbs}g · F: ${meal.fats}g
        </div>
      </div>
      <button class="delete-btn" onclick="deleteMeal(${idx})">Delete</button>
    </div>
  `).join('');
}

function addMeal() {
  const nameInput = document.getElementById('mealName');
  const proteinInput = document.getElementById('mealProtein');
  
  const mealName = nameInput.value.trim();
  const protein = parseInt(proteinInput.value) || 0;
  
  if (!mealName || protein === 0) {
    alert('Please enter meal name and protein amount');
    return;
  }
  
  // Check if meal exists in database
  let macros = FOOD_DATABASE[mealName];
  
  if (!macros) {
    // Manual entry - estimate carbs and fats
    macros = {
      protein: protein,
      carbs: Math.round(protein * 0.5),
      fats: Math.round(protein * 0.3)
    };
  }
  
  const meal = {
    name: mealName,
    protein: macros.protein,
    carbs: macros.carbs,
    fats: macros.fats,
    time: new Date().toLocaleTimeString()
  };
  
  appState.dailyNutrition.meals.push(meal);
  appState.dailyNutrition.protein += macros.protein;
  appState.dailyNutrition.carbs += macros.carbs;
  appState.dailyNutrition.fats += macros.fats;
  
  nameInput.value = '';
  proteinInput.value = '';
  
  saveState();
  updateNutritionDisplay();
  renderMealList();
}

function deleteMeal(idx) {
  const meal = appState.dailyNutrition.meals[idx];
  
  appState.dailyNutrition.protein -= meal.protein;
  appState.dailyNutrition.carbs -= meal.carbs;
  appState.dailyNutrition.fats -= meal.fats;
  appState.dailyNutrition.meals.splice(idx, 1);
  
  saveState();
  updateNutritionDisplay();
  renderMealList();
}

// Reset daily nutrition at midnight
function checkDailyReset() {
  const lastReset = localStorage.getItem('lastNutritionReset');
  const today = getTodayDateString();
  
  if (lastReset !== today) {
    appState.dailyNutrition = { protein: 0, carbs: 0, fats: 0, meals: [] };
    localStorage.setItem('lastNutritionReset', today);
    saveState();
  }
}

// Initialize App
function initApp() {
  loadState();
  checkDailyReset();
  
  // Set current day if not set
  if (!appState.currentDay || appState.currentDay === '') {
    appState.currentDay = getCurrentDayName();
  }
  
  updateDashboard();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });
  
  // Close modal on background click
  document.getElementById('videoModal').addEventListener('click', (e) => {
    if (e.target.id === 'videoModal') {
      closeVideoModal();
    }
  });
  
  // Service Worker Registration for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      console.log('Service Worker registration failed');
    });
  }
  
  console.log('🏋️ Vaibhav Fitness Tracker Initialized!');
  console.log('Current Week:', appState.currentWeek);
  console.log('Current Day:', appState.currentDay);
  console.log('Total Workouts:', appState.workoutHistory.length);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
