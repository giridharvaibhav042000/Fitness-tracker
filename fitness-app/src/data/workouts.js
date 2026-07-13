export const WORKOUT_DATA = {
  monday: {
    gym: [
      { name: 'Barbell Back Squat', compulsory: true, sets: 4, reps: '4-6', rest: 120, muscle: 'Quads, Glutes, Core', youtube: 'https://youtu.be/ultWZbUMPL8' },
      { name: 'Flat Barbell Bench Press', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Chest, Triceps, Front Delt', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Bent-Over Barbell Row', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Lats, Rhomboids, Biceps', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Romanian Deadlift', compulsory: true, sets: 3, reps: '8-10', rest: 90, muscle: 'Hamstrings, Glutes, Erectors', youtube: 'https://youtu.be/JCXUYuzwNrM' },
      { name: 'Dumbbell Shoulder Press', compulsory: false, sets: 3, reps: '10-12', rest: 75, muscle: 'Shoulders, Triceps', youtube: 'https://youtu.be/qEwKCR5JCog' },
      { name: 'Lateral Raise', compulsory: false, sets: 3, reps: '12-15', rest: 45, muscle: 'Side Delts', youtube: 'https://youtu.be/3VcKaXpzqRo' },
      { name: 'Ab Wheel Rollout', compulsory: false, sets: 3, reps: '8-10', rest: 30, muscle: 'Core, Abs, Erectors', youtube: '' },
      { name: 'Barbell Wrist Curl', compulsory: false, sets: 3, reps: '15-20', rest: 30, muscle: 'Forearms, Wrist Flexors', youtube: '' }
    ],
    cali: [
      { name: 'Plank Hold', compulsory: true, sets: 3, reps: '45s', rest: 30, muscle: 'Core, Shoulders', youtube: 'https://youtu.be/ASdvN_XEl_c' },
      { name: 'Hollow Body Hold', compulsory: true, sets: 3, reps: '20-30s', rest: 30, muscle: 'Core, Hip Flexors', youtube: 'https://youtu.be/LlHBMHgMOmo' },
      { name: 'Lying Leg Raises', compulsory: false, sets: 3, reps: '12-15', rest: 30, muscle: 'Lower Abs, Hip Flexors', youtube: 'https://youtu.be/l4kQd9eWclE' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-12 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  tuesday: {
    gym: [
      { name: 'Conventional Deadlift', compulsory: true, sets: 4, reps: '4-5', rest: 120, muscle: 'Full Posterior Chain, Quads', youtube: 'https://youtu.be/op9kVnSso6Q' },
      { name: 'Lat Pulldown', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Lats, Biceps, Rear Delt', youtube: 'https://youtu.be/CAwf7n6Luuc' },
      { name: 'Incline Barbell Bench Press', compulsory: true, sets: 3, reps: '8-10', rest: 90, muscle: 'Upper Chest, Triceps', youtube: 'https://youtu.be/DbFgADa2PL8' },
      { name: 'Leg Press', compulsory: true, sets: 3, reps: '10-12', rest: 75, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/IZxyjW7MPJQ' },
      { name: 'Seated Cable Row', compulsory: false, sets: 3, reps: '10-12', rest: 75, muscle: 'Mid Back, Biceps', youtube: 'https://youtu.be/GZbfZ033f74' },
      { name: 'Cable Pushdown', compulsory: false, sets: 3, reps: '12-15', rest: 45, muscle: 'Triceps', youtube: 'https://youtu.be/vB5OHsJ3EME' },
      { name: 'Cable Crunch', compulsory: false, sets: 3, reps: '12-15', rest: 30, muscle: 'Abs, Core', youtube: '' },
      { name: 'Reverse Wrist Curl', compulsory: false, sets: 3, reps: '15-20', rest: 30, muscle: 'Forearms, Wrist Extensors', youtube: '' }
    ],
    cali: [
      { name: 'Dead Hang', compulsory: true, sets: 3, reps: '20-30s', rest: 60, muscle: 'Grip, Lats, Shoulder Health', youtube: 'https://youtu.be/B4n84Jn3oJE' },
      { name: 'Hanging Knee Raises', compulsory: true, sets: 3, reps: '12-15', rest: 45, muscle: 'Lower Abs, Hip Flexors', youtube: 'https://youtu.be/aMkBGpWLi98' },
      { name: 'Side Plank', compulsory: false, sets: 3, reps: '30s/side', rest: 30, muscle: 'Obliques, Core', youtube: 'https://youtu.be/wqzrZlIl35U' }
    ],
    cardio: { type: 'Stationary Bike', duration: '12-15 min', details: 'Level 6-9, 70-90 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' }
  },
  wednesday: {
    gym: [
      { name: 'Overhead Barbell Press', compulsory: true, sets: 4, reps: '5-6', rest: 90, muscle: 'Shoulders, Triceps, Upper Chest', youtube: 'https://youtu.be/2yjwXTZQDDI' },
      { name: 'Romanian Deadlift', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Hamstrings, Glutes, Erectors', youtube: 'https://youtu.be/JCXUYuzwNrM' },
      { name: 'Incline Dumbbell Press', compulsory: true, sets: 3, reps: '10-12', rest: 75, muscle: 'Upper Chest, Triceps', youtube: 'https://youtu.be/DbFgADa2PL8' },
      { name: 'Bent-Over Barbell Row', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Back Thickness, Biceps', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Leg Curl Machine', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Hamstrings', youtube: 'https://youtu.be/ELOCsoDSmrg' },
      { name: 'Barbell Curl', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Biceps', youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
      { name: 'Hanging Leg Raises', compulsory: false, sets: 3, reps: '12-15', rest: 30, muscle: 'Lower Abs, Hip Flexors, Core', youtube: 'https://youtu.be/aMkBGpWLi98' },
      { name: 'Plate Pinch Hold', compulsory: false, sets: 3, reps: '20-30s', rest: 45, muscle: 'Forearms, Pinch Grip', youtube: '' }
    ],
    cali: [
      { name: 'Superman Hold', compulsory: true, sets: 3, reps: '20-30s', rest: 30, muscle: 'Erectors, Glutes, Lower Back', youtube: 'https://youtu.be/z6PJMT2y8GQ' },
      { name: 'Bicycle Crunches', compulsory: true, sets: 3, reps: '15/side', rest: 30, muscle: 'Obliques, Core', youtube: 'https://youtu.be/9FGilxCbdz8' },
      { name: 'Mountain Climbers', compulsory: false, sets: 3, reps: '20/side', rest: 30, muscle: 'Core, Cardio', youtube: 'https://youtu.be/nmwgirgXLYM' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-12 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  thursday: {
    gym: [
      { name: 'Barbell Back Squat', compulsory: true, sets: 4, reps: '6-8', rest: 90, muscle: 'Quads, Glutes, Hamstrings', youtube: 'https://youtu.be/ultWZbUMPL8' },
      { name: 'Barbell Row (Pendlay)', compulsory: true, sets: 4, reps: '5-6', rest: 90, muscle: 'Lats, Rhomboids, Spinal Erectors', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Flat Dumbbell Press', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Hack Squat', compulsory: false, sets: 3, reps: '10-12', rest: 75, muscle: 'Quads, Glutes', youtube: '' },
      { name: 'Hammer Curl', compulsory: false, sets: 3, reps: '10-12', rest: 45, muscle: 'Brachialis, Biceps, Forearms', youtube: 'https://youtu.be/zC3nLlEvin4' },
      { name: 'Skull Crushers', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Triceps Long Head', youtube: 'https://youtu.be/l3WDbQHPRQU' },
      { name: 'Russian Twist (Weighted)', compulsory: false, sets: 3, reps: '15/side', rest: 30, muscle: 'Obliques, Abs, Core', youtube: '' },
      { name: 'Behind-Back Wrist Curl', compulsory: false, sets: 3, reps: '15-20', rest: 30, muscle: 'Forearms, Wrist Flexors', youtube: '' }
    ],
    cali: [
      { name: 'L-Sit Tuck Hold', compulsory: true, sets: 3, reps: '10-15s', rest: 60, muscle: 'Core, Hip Flexors, Triceps', youtube: 'https://youtu.be/IUZJoD_rdTM' },
      { name: 'Lying Leg Raises', compulsory: true, sets: 3, reps: '12-15', rest: 30, muscle: 'Lower Abs', youtube: 'https://youtu.be/l4kQd9eWclE' },
      { name: 'Side Plank', compulsory: false, sets: 3, reps: '30s/side', rest: 30, muscle: 'Obliques', youtube: 'https://youtu.be/wqzrZlIl35U' }
    ],
    cardio: { type: 'Stationary Bike', duration: '12-15 min', details: 'Level 6-9, 70-90 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' }
  },
  friday: {
    gym: [
      { name: 'Leg Press', compulsory: true, sets: 4, reps: '10-12', rest: 75, muscle: 'Quads, Glutes', youtube: 'https://youtu.be/IZxyjW7MPJQ' },
      { name: 'Lat Pulldown', compulsory: true, sets: 4, reps: '10-12', rest: 75, muscle: 'Lats, Biceps', youtube: 'https://youtu.be/CAwf7n6Luuc' },
      { name: 'Flat Dumbbell Press', compulsory: true, sets: 4, reps: '10-12', rest: 75, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Walking Lunges', compulsory: false, sets: 3, reps: '12/leg', rest: 60, muscle: 'Quads, Glutes, Balance', youtube: 'https://youtu.be/D7KaRcUTQeE' },
      { name: 'Face Pull', compulsory: false, sets: 3, reps: '15', rest: 45, muscle: 'Rear Delts, Rotator Cuff', youtube: 'https://youtu.be/V8dZ3tigERU' },
      { name: 'Overhead Triceps Extension', compulsory: false, sets: 3, reps: '10-12', rest: 60, muscle: 'Triceps Long Head', youtube: 'https://youtu.be/nRiJVZDpdL0' },
      { name: 'Preacher Curl', compulsory: false, sets: 3, reps: '10-12', rest: 45, muscle: 'Biceps Peak', youtube: 'https://youtu.be/fIWP-FRFNU0' },
      { name: 'Lateral Raise', compulsory: false, sets: 3, reps: '15', rest: 45, muscle: 'Side Delts', youtube: 'https://youtu.be/3VcKaXpzqRo' },
      { name: 'Decline Sit-Up', compulsory: false, sets: 3, reps: '12-15', rest: 30, muscle: 'Abs, Core', youtube: '' },
      { name: 'Dumbbell Wrist Curl', compulsory: false, sets: 3, reps: '15-20', rest: 30, muscle: 'Forearms, Wrist Flexors', youtube: '' }
    ],
    cali: [
      { name: 'Hollow Body Hold', compulsory: true, sets: 3, reps: '30s', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/LlHBMHgMOmo' },
      { name: 'Hanging Knee Raises', compulsory: true, sets: 3, reps: '12', rest: 45, muscle: 'Lower Abs', youtube: 'https://youtu.be/aMkBGpWLi98' },
      { name: 'V-Ups', compulsory: false, sets: 3, reps: '10-12', rest: 30, muscle: 'Core', youtube: 'https://youtu.be/7UGaafhFmDQ' }
    ],
    cardio: { type: 'Incline Walk', duration: '10-12 min', details: '5-6 km/h, 10-12% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' }
  },
  saturday: {
    gym: [
      { name: 'Barbell Back Squat', compulsory: true, sets: 3, reps: '6-8', rest: 90, muscle: 'Full Lower Body', youtube: 'https://youtu.be/ultWZbUMPL8' },
      { name: 'Flat Barbell Bench Press', compulsory: true, sets: 3, reps: '6-8', rest: 90, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/rT7DgCr-3pg' },
      { name: 'Conventional Deadlift', compulsory: true, sets: 3, reps: '4-5', rest: 120, muscle: 'Posterior Chain', youtube: 'https://youtu.be/op9kVnSso6Q' },
      { name: 'Bent-Over Barbell Row', compulsory: true, sets: 3, reps: '8-10', rest: 75, muscle: 'Back', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
      { name: 'Kettlebell Swing', compulsory: false, sets: 3, reps: '15', rest: 45, muscle: 'Glutes, Hamstrings, Power', youtube: 'https://youtu.be/sSESeQAir2Y' },
      { name: 'Farmer Walk', compulsory: false, sets: 3, reps: '30-40s', rest: 60, muscle: 'Forearm Grip, Traps, Core', youtube: 'https://youtu.be/rt14ArRMLvk' },
      { name: 'Cable Woodchop', compulsory: false, sets: 3, reps: '12/side', rest: 30, muscle: 'Obliques, Abs, Core, Shoulders', youtube: '' },
      { name: 'Wrist Roller', compulsory: false, sets: 3, reps: '3 rolls up+down', rest: 45, muscle: 'Forearms, Grip Strength', youtube: '' }
    ],
    cali: [
      { name: 'Pull-Up (Assisted/Full)', compulsory: true, sets: 4, reps: 'max reps', rest: 90, muscle: 'Lats, Biceps', youtube: 'https://youtu.be/eGo4IYlbE5g' },
      { name: 'Parallel Bar Dips', compulsory: true, sets: 3, reps: '10-12', rest: 90, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/2z8JmcrW-As' },
      { name: 'Box Jumps', compulsory: false, sets: 3, reps: '8-10', rest: 60, muscle: 'Power, Quads, Glutes', youtube: 'https://youtu.be/52r_Ul5k03g' },
      { name: 'Bear Crawl', compulsory: false, sets: 3, reps: '15m', rest: 45, muscle: 'Full Body, Core', youtube: 'https://youtu.be/TNLMFH3HKZQ' }
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
  monday: 'Monday — Full Body A (Squat + Horizontal Push)',
  tuesday: 'Tuesday — Full Body B (Deadlift + Vertical Pull)',
  wednesday: 'Wednesday — Full Body C (Overhead Press + Hinge)',
  thursday: 'Thursday — Full Body D (Squat + Row)',
  friday: 'Friday — Full Body E (Volume Day)',
  saturday: 'Saturday — Full Body F (Strength + Conditioning)',
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
