export const WORKOUT_DATA = {
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
}

export const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const DAY_LABELS = {
  monday: 'Monday — Lower Body',
  tuesday: 'Tuesday — Chest + Triceps',
  wednesday: 'Wednesday — Back + Biceps',
  thursday: 'Thursday — Shoulders + Traps',
  friday: 'Friday — Arms',
  saturday: 'Saturday — Full Body Power',
}

export function getTodayKey() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[new Date().getDay()]
}

export function isRestDay(dayKey) {
  return dayKey === 'sunday'
}

export function getAllExercises() {
  const seen = new Set()
  const result = []
  for (const day of Object.values(WORKOUT_DATA)) {
    for (const ex of [...(day.gym || []), ...(day.cali || [])]) {
      if (!seen.has(ex.name)) {
        seen.add(ex.name)
        result.push(ex)
      }
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
}
