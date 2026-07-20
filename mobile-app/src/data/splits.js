// ─── Shared cali snippets reused across splits ────────────────────────────────
const PUSH_CALI = [
  { name: 'Standard Push-Ups',  compulsory: true,  sets: 3, reps: '15-20',  rest: 45, muscle: 'Chest, Triceps',      youtube: 'https://youtu.be/_l3ySVKYVJ8' },
  { name: 'Diamond Push-Ups',   compulsory: false, sets: 3, reps: '10-12',  rest: 45, muscle: 'Triceps',             youtube: '' },
  { name: 'Plank Hold',         compulsory: false, sets: 3, reps: '45s',    rest: 30, muscle: 'Core',                youtube: 'https://youtu.be/ASdvN_XEl_c' },
]
const PULL_CALI = [
  { name: 'Dead Hang',          compulsory: true,  sets: 3, reps: '20-30s', rest: 60, muscle: 'Grip, Lats',          youtube: 'https://youtu.be/B4n84Jn3oJE' },
  { name: 'Hanging Knee Raises',compulsory: true,  sets: 3, reps: '12-15',  rest: 45, muscle: 'Lower Abs',           youtube: 'https://youtu.be/aMkBGpWLi98' },
  { name: 'Bicycle Crunches',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Core',      youtube: 'https://youtu.be/9FGilxCbdz8' },
]
const LEGS_CALI = [
  { name: 'Plank Hold',         compulsory: true,  sets: 3, reps: '45s',    rest: 30, muscle: 'Core',                youtube: 'https://youtu.be/ASdvN_XEl_c' },
  { name: 'Hollow Body Hold',   compulsory: true,  sets: 3, reps: '30s',    rest: 30, muscle: 'Core, Hip Flexors',   youtube: 'https://youtu.be/LlHBMHgMOmo' },
  { name: 'Side Plank',         compulsory: false, sets: 3, reps: '30s/side',rest: 30, muscle: 'Obliques',           youtube: 'https://youtu.be/wqzrZlIl35U' },
]
const SHOULDER_CALI = [
  { name: 'Pike Push-Ups',      compulsory: true,  sets: 3, reps: '8-12',   rest: 60, muscle: 'Shoulders',          youtube: 'https://youtu.be/x7_I5SUAd00' },
  { name: 'Plank Hold',         compulsory: false, sets: 3, reps: '45s',    rest: 30, muscle: 'Core',                youtube: 'https://youtu.be/ASdvN_XEl_c' },
  { name: 'Mountain Climbers',  compulsory: false, sets: 3, reps: '20/side',rest: 30, muscle: 'Core, Cardio',        youtube: 'https://youtu.be/nmwgirgXLYM' },
]
const ARMS_CALI = [
  { name: 'Parallel Bar Dips',  compulsory: true,  sets: 3, reps: '10-15',  rest: 60, muscle: 'Triceps, Chest',      youtube: 'https://youtu.be/2z8JmcrW-As' },
  { name: 'Dead Hang',          compulsory: true,  sets: 3, reps: '20-30s', rest: 60, muscle: 'Grip, Forearms',      youtube: 'https://youtu.be/B4n84Jn3oJE' },
  { name: 'Hollow Body Hold',   compulsory: false, sets: 3, reps: '30s',    rest: 30, muscle: 'Core',                youtube: 'https://youtu.be/LlHBMHgMOmo' },
]
const FULL_CALI = [
  { name: 'Pull-Up (Assisted/Full)', compulsory: true,  sets: 3, reps: 'max reps', rest: 90, muscle: 'Lats, Biceps', youtube: 'https://youtu.be/eGo4IYlbE5g' },
  { name: 'Parallel Bar Dips',       compulsory: true,  sets: 3, reps: '10-12',    rest: 75, muscle: 'Chest, Triceps', youtube: 'https://youtu.be/2z8JmcrW-As' },
  { name: 'Plank Hold',              compulsory: false, sets: 3, reps: '45s',      rest: 30, muscle: 'Core',           youtube: 'https://youtu.be/ASdvN_XEl_c' },
]

// ─── Split metadata ───────────────────────────────────────────────────────────
export const SPLITS = {
  FULL_BODY:   'full_body',
  PPL:         'ppl',
  UPPER_LOWER: 'upper_lower',
  BRO_SPLIT:   'bro_split',
  ARNOLD:      'arnold',
  RECOVERY:    'recovery',
  REST_DAY:    'rest_day',
  CARDIO:      'cardio_only',
  YOGA:        'yoga',
}

export const SPLIT_META = {
  full_body: {
    label: 'Full Body',
    icon: '🔥',
    color: 'text-gym',
    activeBg: 'bg-gym text-black border-gym',
    cardBg: 'bg-gym/10 border-gym/30',
    description: '6-day full body training. Every session hits all major muscle groups with rotating emphasis. Best for intermediate lifters wanting balanced development.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Full Body A — Squat + Horizontal Push',
      tuesday:   'Full Body B — Deadlift + Vertical Pull',
      wednesday: 'Full Body C — OHP + Hinge',
      thursday:  'Full Body D — Squat + Row',
      friday:    'Full Body E — Volume Day',
      saturday:  'Full Body F — Strength + Conditioning',
      sunday:    'Rest Day',
    },
  },
  ppl: {
    label: 'Push · Pull · Legs',
    icon: '⚡',
    color: 'text-cali',
    activeBg: 'bg-cali text-black border-cali',
    cardBg: 'bg-cali/10 border-cali/30',
    description: 'Most popular intermediate split. Each muscle group trained 2×/week. Push (chest/shoulders/triceps), Pull (back/biceps/forearms), Legs (quads/hamstrings/glutes/calves/abs) repeated twice.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Push — Chest · Shoulders · Triceps',
      tuesday:   'Pull — Back · Biceps · Forearms',
      wednesday: 'Legs + Core + Abs',
      thursday:  'Push — Chest · Shoulders · Triceps',
      friday:    'Pull — Back · Biceps · Forearms',
      saturday:  'Legs + Core + Abs',
      sunday:    'Rest Day',
    },
  },
  upper_lower: {
    label: 'Upper / Lower',
    icon: '🏗',
    color: 'text-gold',
    activeBg: 'bg-gold text-black border-gold',
    cardBg: 'bg-gold/10 border-gold/30',
    description: 'Science-backed strength split. Upper body days alternate with lower body days. Midweek conditioning. Best for raw strength + hypertrophy balance with good recovery.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Upper A — Horizontal Push + Pull',
      tuesday:   'Lower A — Squat Focus',
      wednesday: 'Conditioning + Core + Forearms',
      thursday:  'Upper B — Vertical Push + Pull',
      friday:    'Lower B — Hinge Focus',
      saturday:  'Full Compound + Abs + Forearms',
      sunday:    'Rest Day',
    },
  },
  bro_split: {
    label: 'Bro Split',
    icon: '💪',
    color: 'text-warn',
    activeBg: 'bg-warn text-black border-warn',
    cardBg: 'bg-warn/10 border-warn/30',
    description: 'Classic bodybuilder split. One muscle group per day, maximum volume. Chest + Biceps / Back + Triceps / Shoulders + Abs / Legs / Arms + Forearms / Full Body.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Chest + Biceps',
      tuesday:   'Back + Triceps',
      wednesday: 'Shoulders + Abs',
      thursday:  'Legs',
      friday:    'Arms + Forearms',
      saturday:  'Full Body + Weak Points',
      sunday:    'Rest Day',
    },
  },
  arnold: {
    label: 'Arnold Split',
    icon: '🦁',
    color: 'text-cardio',
    activeBg: 'bg-cardio text-black border-cardio',
    cardBg: 'bg-cardio/10 border-cardio/30',
    description: 'Arnold Schwarzenegger\'s training split. Chest+Back / Shoulders+Arms / Legs+Abs repeated twice per week. High frequency for each muscle group with great recovery balance.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Chest + Back A',
      tuesday:   'Shoulders + Arms A',
      wednesday: 'Legs + Abs A',
      thursday:  'Chest + Back B',
      friday:    'Shoulders + Arms B',
      saturday:  'Legs + Abs B',
      sunday:    'Rest Day',
    },
  },
  recovery: {
    label: 'Recovery',
    icon: '🌿',
    color: 'text-cardio',
    activeBg: 'bg-cardio text-black border-cardio',
    cardBg: 'bg-cardio/10 border-cardio/30',
    description: 'Active recovery program. Light movement, mobility drills, and decompression work. Reduces soreness, improves flexibility, and keeps the body primed for the next training block.',
    frequency: '6 days/week (light)',
    dayLabels: {
      monday:    'Upper Mobility + Shoulder Health',
      tuesday:   'Lower Mobility + Hip Work',
      wednesday: 'Core Activation + Breathwork',
      thursday:  'Upper Activation + Rotator Cuff',
      friday:    'Lower Mobility + Ankle + Glute',
      saturday:  'Full Body Flow + Decompression',
      sunday:    'Complete Rest',
    },
  },
  rest_day: {
    label: 'Rest Day',
    icon: '😴',
    color: 'text-muted',
    activeBg: 'bg-line text-white border-line',
    cardBg: 'bg-line/30 border-line',
    description: 'Full rest. No structured training. Walk, stretch, sleep, eat well. Essential for muscle repair, CNS recovery, and long-term progression.',
    frequency: 'All rest',
    dayLabels: {
      monday:    'Rest — Light walk only',
      tuesday:   'Rest — Light walk only',
      wednesday: 'Rest — Light walk only',
      thursday:  'Rest — Light walk only',
      friday:    'Rest — Light walk only',
      saturday:  'Rest — Light walk only',
      sunday:    'Rest — Light walk only',
    },
  },
  cardio_only: {
    label: 'Cardio',
    icon: '🏃',
    color: 'text-warn',
    activeBg: 'bg-warn text-black border-warn',
    cardBg: 'bg-warn/10 border-warn/30',
    description: 'Pure cardio program. Treadmill, rowing, bike, jump rope, and HIIT circuits. Builds cardiovascular endurance, burns fat, and improves stamina. Ideal as a dedicated cardio block or alongside a strength plan.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Steady State Run + Core',
      tuesday:   'Rowing + HIIT Intervals',
      wednesday: 'Stair Climber + Battle Ropes',
      thursday:  'Bike Intervals + Jump Rope',
      friday:    'HIIT Circuit — Full Body',
      saturday:  'Long Steady State (Endurance)',
      sunday:    'Rest Day',
    },
  },
  yoga: {
    label: 'Yoga',
    icon: '🧘',
    color: 'text-gold',
    activeBg: 'bg-gold text-black border-gold',
    cardBg: 'bg-gold/10 border-gold/30',
    description: 'Daily yoga practice. Builds flexibility, balance, core strength, and mental focus. Flows progress from dynamic (early week) to restorative (weekend). Works as a standalone practice or active recovery alongside lifting.',
    frequency: '6 days/week',
    dayLabels: {
      monday:    'Sun Salutation + Warrior Series',
      tuesday:   'Hip Openers + Hamstring Flow',
      wednesday: 'Core Flow + Twists',
      thursday:  'Shoulder Opening + Chest',
      friday:    'Balance + Standing Poses',
      saturday:  'Restorative / Yin Yoga',
      sunday:    'Rest — Savasana Only',
    },
  },
}

// ─── Split exercise data ──────────────────────────────────────────────────────
// Note: 'full_body' split reads from workouts.js — no entry needed here

export const SPLIT_DATA = {

  // ── Push Pull Legs ──────────────────────────────────────────────────────────
  ppl: {
    monday: {
      gym: [
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Chest, Triceps, Front Delt',   youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Overhead Barbell Press',     compulsory: true,  sets: 4, reps: '5-6',   rest: 90,  muscle: 'Shoulders, Triceps, Upper Chest', youtube: 'https://youtu.be/2yjwXTZQDDI' },
        { name: 'Incline Dumbbell Press',     compulsory: true,  sets: 3, reps: '8-10',  rest: 75,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Lateral Raise',              compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Skull Crushers',             compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/l3WDbQHPRQU' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PUSH_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    tuesday: {
      gym: [
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 4, reps: '4-5',   rest: 120, muscle: 'Full Posterior Chain, Quads',   youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Bent-Over Barbell Row',      compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Lats, Rhomboids, Biceps',       youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Lat Pulldown',               compulsory: true,  sets: 3, reps: '8-10',  rest: 75,  muscle: 'Lats, Biceps, Rear Delt',       youtube: 'https://youtu.be/CAwf7n6Luuc' },
        { name: 'Seated Cable Row',           compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Barbell Curl',               compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps',                        youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
        { name: 'Reverse Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
      ],
      cali: PULL_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    wednesday: {
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Quads, Glutes, Core',           youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Leg Press',                  compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: 'https://youtu.be/IZxyjW7MPJQ' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Walking Lunges',             compulsory: false, sets: 3, reps: '12/leg',rest: 60,  muscle: 'Quads, Glutes, Balance',        youtube: 'https://youtu.be/D7KaRcUTQeE' },
        { name: 'Cable Crunch',               compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Hanging Leg Raises',         compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Lower Abs, Hip Flexors, Core',  youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Russian Twist (Weighted)',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    thursday: {
      gym: [
        { name: 'Incline Barbell Bench Press',compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Dumbbell Shoulder Press',    compulsory: true,  sets: 4, reps: '8-10',  rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/qEwKCR5JCog' },
        { name: 'Flat Dumbbell Press',        compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Chest, Triceps',                youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Lateral Raise',              compulsory: false, sets: 4, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Overhead Triceps Extension', compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/nRiJVZDpdL0' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PUSH_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    friday: {
      gym: [
        { name: 'Barbell Row (Pendlay)',       compulsory: true,  sets: 4, reps: '5-6',   rest: 90,  muscle: 'Lats, Rhomboids, Spinal Erectors', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Lat Pulldown',               compulsory: true,  sets: 4, reps: '8-10',  rest: 75,  muscle: 'Lats, Biceps',                  youtube: 'https://youtu.be/CAwf7n6Luuc' },
        { name: 'Seated Cable Row',           compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Preacher Curl',              compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps Peak',                   youtube: 'https://youtu.be/fIWP-FRFNU0' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Reverse Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
      ],
      cali: PULL_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    saturday: {
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Quads, Glutes, Core',           youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Leg Press',                  compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: 'https://youtu.be/IZxyjW7MPJQ' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Walking Lunges',             compulsory: false, sets: 3, reps: '12/leg',rest: 60,  muscle: 'Quads, Glutes, Balance',        youtube: 'https://youtu.be/D7KaRcUTQeE' },
        { name: 'Cable Crunch',               compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Decline Sit-Up',             compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Russian Twist (Weighted)',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Farmer Walk',                compulsory: false, sets: 3, reps: '30-40s',rest: 60, muscle: 'Forearm Grip, Traps, Core',     youtube: 'https://youtu.be/rt14ArRMLvk' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'HIIT Sprints', duration: '10 min', details: '30s on / 30s off, 8 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light walk or yoga', youtube: '' } },
  },

  // ── Upper / Lower ───────────────────────────────────────────────────────────
  upper_lower: {
    monday: { // Upper A
      gym: [
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 4, reps: '5-6',   rest: 90,  muscle: 'Chest, Triceps, Front Delt',   youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Bent-Over Barbell Row',      compulsory: true,  sets: 4, reps: '5-6',   rest: 90,  muscle: 'Lats, Rhomboids, Biceps',       youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Overhead Barbell Press',     compulsory: true,  sets: 3, reps: '8-10',  rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/2yjwXTZQDDI' },
        { name: 'Lat Pulldown',               compulsory: false, sets: 3, reps: '8-10',  rest: 75,  muscle: 'Lats, Biceps',                  youtube: 'https://youtu.be/CAwf7n6Luuc' },
        { name: 'Lateral Raise',              compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Barbell Curl',               compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps',                        youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PUSH_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    tuesday: { // Lower A
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 4, reps: '5-6',   rest: 120, muscle: 'Quads, Glutes, Core',           youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Leg Press',                  compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: 'https://youtu.be/IZxyjW7MPJQ' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Cable Crunch',               compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Hanging Leg Raises',         compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Lower Abs, Hip Flexors, Core',  youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    wednesday: { // Conditioning
      gym: [
        { name: 'Kettlebell Swing',           compulsory: true,  sets: 4, reps: '15',    rest: 45,  muscle: 'Glutes, Hamstrings, Power',     youtube: 'https://youtu.be/sSESeQAir2Y' },
        { name: 'Box Jumps',                  compulsory: true,  sets: 3, reps: '10',    rest: 60,  muscle: 'Power, Quads, Glutes',          youtube: 'https://youtu.be/52r_Ul5k03g' },
        { name: 'Dumbbell Thruster',          compulsory: false, sets: 3, reps: '12',    rest: 45,  muscle: 'Full Body, Cardio',             youtube: '' },
        { name: 'Cable Crunch',               compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Russian Twist (Weighted)',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Hanging Leg Raises',         compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Lower Abs, Hip Flexors, Core',  youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Behind-Back Wrist Curl',     compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
        { name: 'Farmer Walk',                compulsory: false, sets: 3, reps: '30-40s',rest: 60, muscle: 'Forearm Grip, Traps, Core',     youtube: 'https://youtu.be/rt14ArRMLvk' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'HIIT Sprints', duration: '10 min', details: '30s on / 30s off, 8 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' },
    },
    thursday: { // Upper B
      gym: [
        { name: 'Incline Barbell Bench Press',compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 4, reps: '4-5',   rest: 120, muscle: 'Full Posterior Chain, Quads',   youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Dumbbell Shoulder Press',    compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/qEwKCR5JCog' },
        { name: 'Seated Cable Row',           compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Skull Crushers',             compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/l3WDbQHPRQU' },
        { name: 'Reverse Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
      ],
      cali: PULL_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    friday: { // Lower B
      gym: [
        { name: 'Hack Squat',                 compulsory: true,  sets: 4, reps: '8-10',  rest: 90,  muscle: 'Quads, Glutes',                 youtube: '' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Walking Lunges',             compulsory: true,  sets: 3, reps: '12/leg',rest: 60,  muscle: 'Quads, Glutes, Balance',        youtube: 'https://youtu.be/D7KaRcUTQeE' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Decline Sit-Up',             compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Dumbbell Wrist Curl',        compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    saturday: { // Full Compound
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 3, reps: '6-8',   rest: 90,  muscle: 'Full Lower Body',               youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 3, reps: '6-8',   rest: 90,  muscle: 'Chest, Triceps',                youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 3, reps: '4-5',   rest: 120, muscle: 'Posterior Chain',               youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Bent-Over Barbell Row',      compulsory: true,  sets: 3, reps: '8-10',  rest: 75,  muscle: 'Back',                          youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Cable Woodchop',             compulsory: false, sets: 3, reps: '12/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Farmer Walk',                compulsory: false, sets: 3, reps: '30-40s',rest: 60, muscle: 'Forearm Grip, Traps, Core',     youtube: 'https://youtu.be/rt14ArRMLvk' },
        { name: 'Wrist Roller',               compulsory: false, sets: 3, reps: '3 rolls',rest: 45, muscle: 'Forearms, Grip Strength',       youtube: '' },
      ],
      cali: FULL_CALI,
      cardio: { type: 'HIIT Sprints', duration: '10 min', details: '30s on / 30s off, 8 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light walk or yoga', youtube: '' } },
  },

  // ── Bro Split ───────────────────────────────────────────────────────────────
  bro_split: {
    monday: { // Chest + Biceps
      gym: [
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Chest, Triceps, Front Delt',   youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Incline Barbell Bench Press',compulsory: true,  sets: 4, reps: '8-10',  rest: 90,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Incline Dumbbell Press',     compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Barbell Curl',               compulsory: true,  sets: 4, reps: '8-10',  rest: 60,  muscle: 'Biceps',                        youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
        { name: 'Preacher Curl',              compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps Peak',                   youtube: 'https://youtu.be/fIWP-FRFNU0' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PUSH_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    tuesday: { // Back + Triceps
      gym: [
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 4, reps: '4-5',   rest: 120, muscle: 'Full Posterior Chain, Quads',   youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Bent-Over Barbell Row',      compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Lats, Rhomboids, Biceps',       youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Lat Pulldown',               compulsory: true,  sets: 3, reps: '8-10',  rest: 75,  muscle: 'Lats, Biceps',                  youtube: 'https://youtu.be/CAwf7n6Luuc' },
        { name: 'Seated Cable Row',           compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Skull Crushers',             compulsory: true,  sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/l3WDbQHPRQU' },
        { name: 'Overhead Triceps Extension', compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/nRiJVZDpdL0' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Reverse Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
      ],
      cali: PULL_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    wednesday: { // Shoulders + Abs
      gym: [
        { name: 'Overhead Barbell Press',     compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Shoulders, Triceps, Upper Chest', youtube: 'https://youtu.be/2yjwXTZQDDI' },
        { name: 'Dumbbell Shoulder Press',    compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/qEwKCR5JCog' },
        { name: 'Lateral Raise',              compulsory: true,  sets: 4, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Cable Crunch',               compulsory: true,  sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Hanging Leg Raises',         compulsory: true,  sets: 3, reps: '12-15', rest: 30,  muscle: 'Lower Abs, Hip Flexors, Core',  youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Russian Twist (Weighted)',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Decline Sit-Up',             compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Behind-Back Wrist Curl',     compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: SHOULDER_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    thursday: { // Legs
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Quads, Glutes, Hamstrings',     youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 4, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Leg Press',                  compulsory: true,  sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: 'https://youtu.be/IZxyjW7MPJQ' },
        { name: 'Hack Squat',                 compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: '' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Walking Lunges',             compulsory: false, sets: 3, reps: '12/leg',rest: 60,  muscle: 'Quads, Glutes, Balance',        youtube: 'https://youtu.be/D7KaRcUTQeE' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    friday: { // Arms + Forearms
      gym: [
        { name: 'Skull Crushers',             compulsory: true,  sets: 4, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/l3WDbQHPRQU' },
        { name: 'Overhead Triceps Extension', compulsory: true,  sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/nRiJVZDpdL0' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Barbell Curl',               compulsory: true,  sets: 4, reps: '8-10',  rest: 60,  muscle: 'Biceps',                        youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
        { name: 'Preacher Curl',              compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps Peak',                   youtube: 'https://youtu.be/fIWP-FRFNU0' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Barbell Wrist Curl',         compulsory: true,  sets: 4, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
        { name: 'Reverse Wrist Curl',         compulsory: true,  sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
        { name: 'Farmer Walk',                compulsory: false, sets: 3, reps: '30-40s',rest: 60, muscle: 'Forearm Grip, Traps, Core',     youtube: 'https://youtu.be/rt14ArRMLvk' },
      ],
      cali: ARMS_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    saturday: { // Full Body / Weak Point
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Full Lower Body',               youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Chest, Triceps',                youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 3, reps: '5',     rest: 120, muscle: 'Posterior Chain',               youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Bent-Over Barbell Row',      compulsory: false, sets: 3, reps: '8-10',  rest: 75,  muscle: 'Back',                          youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Cable Crunch',               compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Wrist Roller',               compulsory: false, sets: 3, reps: '3 rolls',rest: 45, muscle: 'Forearms, Grip Strength',       youtube: '' },
      ],
      cali: FULL_CALI,
      cardio: { type: 'HIIT Sprints', duration: '10 min', details: '30s on / 30s off, 8 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light walk or yoga', youtube: '' } },
  },

  // ── Arnold Split ────────────────────────────────────────────────────────────
  arnold: {
    monday: { // Chest + Back A
      gym: [
        { name: 'Flat Barbell Bench Press',   compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Chest, Triceps, Front Delt',   youtube: 'https://youtu.be/rT7DgCr-3pg' },
        { name: 'Bent-Over Barbell Row',      compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Lats, Rhomboids, Biceps',       youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Incline Barbell Bench Press',compulsory: false, sets: 3, reps: '8-10',  rest: 75,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Lat Pulldown',               compulsory: false, sets: 3, reps: '8-10',  rest: 75,  muscle: 'Lats, Biceps',                  youtube: 'https://youtu.be/CAwf7n6Luuc' },
        { name: 'Seated Cable Row',           compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PUSH_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    tuesday: { // Shoulders + Arms A
      gym: [
        { name: 'Overhead Barbell Press',     compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Shoulders, Triceps, Upper Chest', youtube: 'https://youtu.be/2yjwXTZQDDI' },
        { name: 'Barbell Curl',               compulsory: true,  sets: 4, reps: '8-10',  rest: 60,  muscle: 'Biceps',                        youtube: 'https://youtu.be/ykJmrZ5v0Oo' },
        { name: 'Lateral Raise',              compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Skull Crushers',             compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/l3WDbQHPRQU' },
        { name: 'Dumbbell Shoulder Press',    compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/qEwKCR5JCog' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Overhead Triceps Extension', compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/nRiJVZDpdL0' },
        { name: 'Reverse Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Extensors',     youtube: '' },
      ],
      cali: SHOULDER_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    wednesday: { // Legs + Abs A
      gym: [
        { name: 'Barbell Back Squat',         compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Quads, Glutes, Core',           youtube: 'https://youtu.be/ultWZbUMPL8' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Leg Press',                  compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Quads, Glutes',                 youtube: 'https://youtu.be/IZxyjW7MPJQ' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Cable Crunch',               compulsory: true,  sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Hanging Leg Raises',         compulsory: false, sets: 3, reps: '12-15', rest: 30,  muscle: 'Lower Abs, Hip Flexors, Core',  youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Ab Wheel Rollout',           compulsory: false, sets: 3, reps: '8-10',  rest: 30,  muscle: 'Core, Abs, Erectors',           youtube: '' },
        { name: 'Plate Pinch Hold',           compulsory: false, sets: 3, reps: '20-30s',rest: 45, muscle: 'Forearms, Pinch Grip',           youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    thursday: { // Chest + Back B
      gym: [
        { name: 'Incline Barbell Bench Press',compulsory: true,  sets: 4, reps: '6-8',   rest: 90,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Conventional Deadlift',      compulsory: true,  sets: 4, reps: '4-5',   rest: 120, muscle: 'Full Posterior Chain, Quads',   youtube: 'https://youtu.be/op9kVnSso6Q' },
        { name: 'Incline Dumbbell Press',     compulsory: false, sets: 3, reps: '10-12', rest: 75,  muscle: 'Upper Chest, Triceps',          youtube: 'https://youtu.be/DbFgADa2PL8' },
        { name: 'Barbell Row (Pendlay)',       compulsory: true,  sets: 3, reps: '6-8',   rest: 90,  muscle: 'Lats, Rhomboids, Spinal Erectors', youtube: 'https://youtu.be/FWJR5Ve8bnQ' },
        { name: 'Seated Cable Row',           compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Mid Back, Biceps',              youtube: 'https://youtu.be/GZbfZ033f74' },
        { name: 'Barbell Wrist Curl',         compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: PULL_CALI,
      cardio: { type: 'Stationary Bike', duration: '12 min', details: 'Level 6, 80 RPM', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    friday: { // Shoulders + Arms B
      gym: [
        { name: 'Dumbbell Shoulder Press',    compulsory: true,  sets: 4, reps: '8-10',  rest: 75,  muscle: 'Shoulders, Triceps',            youtube: 'https://youtu.be/qEwKCR5JCog' },
        { name: 'Preacher Curl',              compulsory: true,  sets: 3, reps: '10-12', rest: 60,  muscle: 'Biceps Peak',                   youtube: 'https://youtu.be/fIWP-FRFNU0' },
        { name: 'Lateral Raise',              compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Side Delts',                    youtube: 'https://youtu.be/3VcKaXpzqRo' },
        { name: 'Overhead Triceps Extension', compulsory: false, sets: 3, reps: '10-12', rest: 60,  muscle: 'Triceps Long Head',             youtube: 'https://youtu.be/nRiJVZDpdL0' },
        { name: 'Face Pull',                  compulsory: false, sets: 3, reps: '15',    rest: 45,  muscle: 'Rear Delts, Rotator Cuff',      youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Hammer Curl',                compulsory: false, sets: 3, reps: '10-12', rest: 45,  muscle: 'Brachialis, Biceps, Forearms',  youtube: 'https://youtu.be/zC3nLlEvin4' },
        { name: 'Cable Pushdown',             compulsory: false, sets: 3, reps: '12-15', rest: 45,  muscle: 'Triceps',                       youtube: 'https://youtu.be/vB5OHsJ3EME' },
        { name: 'Behind-Back Wrist Curl',     compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: ARMS_CALI,
      cardio: { type: 'Incline Walk', duration: '10 min', details: '5 km/h, 10% incline', youtube: 'https://youtu.be/4Xnkr1ARD6A' },
    },
    saturday: { // Legs + Abs B
      gym: [
        { name: 'Hack Squat',                 compulsory: true,  sets: 4, reps: '8-10',  rest: 90,  muscle: 'Quads, Glutes',                 youtube: '' },
        { name: 'Romanian Deadlift',          compulsory: true,  sets: 3, reps: '8-10',  rest: 90,  muscle: 'Hamstrings, Glutes, Erectors',  youtube: 'https://youtu.be/JCXUYuzwNrM' },
        { name: 'Walking Lunges',             compulsory: false, sets: 3, reps: '12/leg',rest: 60,  muscle: 'Quads, Glutes, Balance',        youtube: 'https://youtu.be/D7KaRcUTQeE' },
        { name: 'Leg Curl Machine',           compulsory: false, sets: 3, reps: '12-15', rest: 60,  muscle: 'Hamstrings',                    youtube: 'https://youtu.be/ELOCsoDSmrg' },
        { name: 'Decline Sit-Up',             compulsory: true,  sets: 3, reps: '12-15', rest: 30,  muscle: 'Abs, Core',                     youtube: '' },
        { name: 'Russian Twist (Weighted)',   compulsory: false, sets: 3, reps: '15/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Cable Woodchop',             compulsory: false, sets: 3, reps: '12/side',rest: 30, muscle: 'Obliques, Abs, Core',           youtube: '' },
        { name: 'Dumbbell Wrist Curl',        compulsory: false, sets: 3, reps: '15-20', rest: 30,  muscle: 'Forearms, Wrist Flexors',       youtube: '' },
      ],
      cali: LEGS_CALI,
      cardio: { type: 'HIIT Sprints', duration: '10 min', details: '30s on / 30s off, 8 rounds', youtube: 'https://youtu.be/ml6cT4AZdqI' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light walk or yoga', youtube: '' } },
  },

  // ── Recovery Training ───────────────────────────────────────────────────────
  recovery: {
    monday: { // Upper Mobility + Shoulder Health
      gym: [
        { name: 'Face Pull (Light)',          compulsory: true,  sets: 2, reps: '15-20',   rest: 30, muscle: 'Rear Delts, Rotator Cuff, External Rotators', youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Band Pull-Apart',            compulsory: true,  sets: 2, reps: '20',      rest: 30, muscle: 'Rear Delts, Rhomboids, Shoulder Health',       youtube: '' },
        { name: 'Dead Hang',                  compulsory: true,  sets: 3, reps: '20-30s',  rest: 45, muscle: 'Grip, Lats, Shoulder Decompression',           youtube: 'https://youtu.be/B4n84Jn3oJE' },
        { name: 'Cat-Cow Stretch',            compulsory: true,  sets: 2, reps: '10 slow', rest: 30, muscle: 'Spine, Thoracic Mobility, Core',               youtube: '' },
        { name: 'Chest Doorway Stretch',      compulsory: false, sets: 2, reps: '30s/side',rest: 30, muscle: 'Chest, Front Delt, Shoulder Capsule',          youtube: '' },
        { name: 'Wrist Circles',              compulsory: false, sets: 2, reps: '10/dir',  rest: 15, muscle: 'Forearms, Wrist Joint, Grip',                  youtube: '' },
      ],
      cali: [
        { name: 'Plank Hold (Easy)',          compulsory: true,  sets: 2, reps: '30s',     rest: 30, muscle: 'Core',                                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: "Child's Pose",              compulsory: true,  sets: 2, reps: '45s',     rest: 15, muscle: 'Lats, Spine, Hip Flexors',                     youtube: '' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    tuesday: { // Lower Mobility + Hip Work
      gym: [
        { name: 'Glute Bridge (Bodyweight)',  compulsory: true,  sets: 2, reps: '15-20',   rest: 30, muscle: 'Glutes, Hamstrings, Lower Back',               youtube: '' },
        { name: "World's Greatest Stretch", compulsory: true,  sets: 2, reps: '5/side',  rest: 30, muscle: 'Hip Flexors, Thoracic, Hamstrings',            youtube: '' },
        { name: 'Hip 90/90 Stretch',          compulsory: true,  sets: 2, reps: '30s/side',rest: 30, muscle: 'Hip External Rotators, Glutes',                youtube: '' },
        { name: 'Calf Raises (Slow)',         compulsory: false, sets: 2, reps: '15 slow', rest: 30, muscle: 'Calves, Ankle Mobility',                       youtube: '' },
        { name: 'Ankle Circles',              compulsory: false, sets: 2, reps: '10/dir',  rest: 15, muscle: 'Ankle Joint, Calves',                          youtube: '' },
      ],
      cali: [
        { name: 'Hollow Body Hold (Easy)',    compulsory: true,  sets: 2, reps: '20s',     rest: 30, muscle: 'Core, Hip Flexors',                            youtube: 'https://youtu.be/LlHBMHgMOmo' },
        { name: 'Side Plank (Easy)',          compulsory: false, sets: 2, reps: '20s/side',rest: 30, muscle: 'Obliques, Core',                               youtube: '' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    wednesday: { // Core Activation + Breathwork
      gym: [
        { name: 'Dead Bug',                   compulsory: true,  sets: 2, reps: '8/side',  rest: 30, muscle: 'Core, Hip Flexors, Lumbar Stability',          youtube: '' },
        { name: 'Bird-Dog',                   compulsory: true,  sets: 2, reps: '8/side',  rest: 30, muscle: 'Core, Glutes, Erectors, Balance',              youtube: '' },
        { name: 'Diaphragmatic Breathing',    compulsory: true,  sets: 3, reps: '5 cycles',rest: 15, muscle: 'Core, Diaphragm, Parasympathetic Reset',       youtube: '' },
        { name: 'Cat-Cow Stretch',            compulsory: false, sets: 2, reps: '10 slow', rest: 30, muscle: 'Spine, Thoracic Mobility',                     youtube: '' },
      ],
      cali: [
        { name: 'Plank Hold (Easy)',          compulsory: true,  sets: 2, reps: '30s',     rest: 30, muscle: 'Core',                                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: "Child's Pose",              compulsory: true,  sets: 2, reps: '45s',     rest: 15, muscle: 'Lats, Spine, Hip Flexors',                     youtube: '' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    thursday: { // Upper Activation + Rotator Cuff
      gym: [
        { name: 'Face Pull (Light)',          compulsory: true,  sets: 3, reps: '15-20',   rest: 30, muscle: 'Rear Delts, Rotator Cuff, External Rotators', youtube: 'https://youtu.be/V8dZ3tigERU' },
        { name: 'Band Pull-Apart',            compulsory: true,  sets: 3, reps: '20',      rest: 30, muscle: 'Rear Delts, Rhomboids, Shoulder Health',       youtube: '' },
        { name: 'Dead Hang',                  compulsory: true,  sets: 3, reps: '20-30s',  rest: 45, muscle: 'Grip, Lats, Shoulder Decompression',           youtube: 'https://youtu.be/B4n84Jn3oJE' },
        { name: 'Shoulder CARs',              compulsory: false, sets: 2, reps: '5/dir',   rest: 30, muscle: 'Shoulder Capsule, Full Range Mobility',        youtube: '' },
        { name: 'Wrist Circles',              compulsory: false, sets: 2, reps: '10/dir',  rest: 15, muscle: 'Forearms, Wrist Joint',                        youtube: '' },
      ],
      cali: [
        { name: 'Plank Hold (Easy)',          compulsory: true,  sets: 2, reps: '30s',     rest: 30, muscle: 'Core',                                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: 'Bicycle Crunches (Slow)',    compulsory: false, sets: 2, reps: '10/side', rest: 30, muscle: 'Obliques, Core',                               youtube: 'https://youtu.be/9FGilxCbdz8' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    friday: { // Lower Mobility + Ankle + Glute
      gym: [
        { name: 'Glute Bridge (Bodyweight)',  compulsory: true,  sets: 3, reps: '15-20',   rest: 30, muscle: 'Glutes, Hamstrings, Lower Back',               youtube: '' },
        { name: 'Hip 90/90 Stretch',          compulsory: true,  sets: 2, reps: '30s/side',rest: 30, muscle: 'Hip External Rotators, Glutes',                youtube: '' },
        { name: "World's Greatest Stretch", compulsory: true,  sets: 2, reps: '5/side',  rest: 30, muscle: 'Hip Flexors, Thoracic, Hamstrings',            youtube: '' },
        { name: 'Cossack Squat (BW)',         compulsory: false, sets: 2, reps: '8/side',  rest: 30, muscle: 'Adductors, Glutes, Hip Mobility',              youtube: '' },
        { name: 'Ankle Circles',              compulsory: false, sets: 2, reps: '10/dir',  rest: 15, muscle: 'Ankle Joint, Calves',                          youtube: '' },
      ],
      cali: [
        { name: 'Hollow Body Hold (Easy)',    compulsory: true,  sets: 2, reps: '20s',     rest: 30, muscle: 'Core, Hip Flexors',                            youtube: 'https://youtu.be/LlHBMHgMOmo' },
        { name: "Child's Pose",              compulsory: false, sets: 2, reps: '45s',     rest: 15, muscle: 'Lats, Spine, Hip Flexors',                     youtube: '' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    saturday: { // Full Body Flow + Decompression
      gym: [
        { name: 'Inchworm Walk-Out',          compulsory: true,  sets: 2, reps: '5',       rest: 30, muscle: 'Full Chain, Hamstrings, Shoulders, Core',      youtube: '' },
        { name: "World's Greatest Stretch", compulsory: true,  sets: 2, reps: '5/side',  rest: 30, muscle: 'Hip Flexors, Thoracic, Hamstrings',            youtube: '' },
        { name: 'Dead Hang',                  compulsory: true,  sets: 3, reps: '20-30s',  rest: 45, muscle: 'Grip, Lats, Shoulder Decompression',           youtube: 'https://youtu.be/B4n84Jn3oJE' },
        { name: 'Deep Squat Hold',            compulsory: false, sets: 2, reps: '30-45s',  rest: 30, muscle: 'Hip Flexors, Ankles, Glutes, Thoracic',        youtube: '' },
        { name: 'Farmer Walk (Light)',        compulsory: false, sets: 2, reps: '20-30s',  rest: 45, muscle: 'Grip, Traps, Core, Gait Pattern',              youtube: 'https://youtu.be/rt14ArRMLvk' },
      ],
      cali: [
        { name: 'Plank Hold (Easy)',          compulsory: true,  sets: 2, reps: '30s',     rest: 30, muscle: 'Core',                                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: "Child's Pose",              compulsory: true,  sets: 2, reps: '60s',     rest: 15, muscle: 'Lats, Spine, Hip Flexors',                     youtube: '' },
      ],
      cardio: { type: 'Light Walk', duration: '20-30 min', details: 'Easy pace, no elevation', youtube: '' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Complete Rest', duration: 'All day', details: 'Sleep, eat, recover', youtube: '' } },
  },

  // ── Rest Day ────────────────────────────────────────────────────────────────
  rest_day: {
    monday:    { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    tuesday:   { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    wednesday: { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    thursday:  { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    friday:    { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    saturday:  { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
    sunday:    { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min walk', details: 'Light walk only', youtube: '' } },
  },

  // ── Cardio ──────────────────────────────────────────────────────────────────
  cardio_only: {
    monday: { // Steady State Run + Core
      gym: [
        { name: 'Treadmill Run (Steady State)', compulsory: true,  sets: 1, reps: '25 min',  rest: 0,  muscle: 'Cardio, Legs, Lungs',          youtube: '' },
        { name: 'Jump Rope',                    compulsory: true,  sets: 4, reps: '2 min',   rest: 60, muscle: 'Cardio, Calves, Coordination', youtube: '' },
        { name: 'Mountain Climbers',            compulsory: false, sets: 4, reps: '30s',     rest: 30, muscle: 'Cardio, Core, Shoulders',      youtube: 'https://youtu.be/nmwgirgXLYM' },
        { name: 'Hanging Knee Raises',          compulsory: false, sets: 3, reps: '15',      rest: 30, muscle: 'Lower Abs, Core',              youtube: 'https://youtu.be/aMkBGpWLi98' },
      ],
      cali: [
        { name: 'Plank Hold',                   compulsory: true,  sets: 3, reps: '45s',     rest: 30, muscle: 'Core',                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: 'Bicycle Crunches',             compulsory: false, sets: 3, reps: '20/side', rest: 30, muscle: 'Obliques, Core',               youtube: 'https://youtu.be/9FGilxCbdz8' },
      ],
      cardio: { type: 'Treadmill', duration: '25 min', details: 'Zone 2 pace, 140-155 BPM', youtube: '' },
    },
    tuesday: { // Rowing + HIIT
      gym: [
        { name: 'Rowing Machine',               compulsory: true,  sets: 1, reps: '20 min',  rest: 0,  muscle: 'Cardio, Back, Legs, Arms',     youtube: '' },
        { name: 'Burpees',                      compulsory: true,  sets: 4, reps: '10',      rest: 60, muscle: 'Cardio, Full Body',            youtube: '' },
        { name: 'Box Jumps',                    compulsory: false, sets: 4, reps: '8',       rest: 60, muscle: 'Power, Cardio, Legs',          youtube: 'https://youtu.be/52r_Ul5k03g' },
        { name: 'Battle Ropes',                 compulsory: false, sets: 4, reps: '30s',     rest: 30, muscle: 'Cardio, Shoulders, Arms, Core', youtube: '' },
      ],
      cali: [
        { name: 'Jump Rope',                    compulsory: true,  sets: 4, reps: '90s',     rest: 45, muscle: 'Cardio, Calves',               youtube: '' },
        { name: 'Mountain Climbers',            compulsory: false, sets: 3, reps: '30s',     rest: 30, muscle: 'Cardio, Core',                 youtube: 'https://youtu.be/nmwgirgXLYM' },
      ],
      cardio: { type: 'Rowing Machine', duration: '20 min', details: 'Moderate pace, 500m splits', youtube: '' },
    },
    wednesday: { // Stair Climber + Battle Ropes
      gym: [
        { name: 'Stair Climber',                compulsory: true,  sets: 1, reps: '20 min',  rest: 0,  muscle: 'Cardio, Glutes, Quads, Calves', youtube: '' },
        { name: 'Battle Ropes',                 compulsory: true,  sets: 5, reps: '30s',     rest: 30, muscle: 'Cardio, Shoulders, Arms, Core', youtube: '' },
        { name: 'Kettlebell Swing',             compulsory: false, sets: 4, reps: '20',      rest: 45, muscle: 'Cardio, Glutes, Hamstrings',   youtube: 'https://youtu.be/sSESeQAir2Y' },
        { name: 'Jump Rope',                    compulsory: false, sets: 4, reps: '2 min',   rest: 60, muscle: 'Cardio, Calves, Coordination', youtube: '' },
      ],
      cali: [
        { name: 'Plank Hold',                   compulsory: true,  sets: 3, reps: '45s',     rest: 30, muscle: 'Core',                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: 'Hollow Body Hold',             compulsory: false, sets: 3, reps: '30s',     rest: 30, muscle: 'Core, Hip Flexors',            youtube: 'https://youtu.be/LlHBMHgMOmo' },
      ],
      cardio: { type: 'Stair Climber', duration: '20 min', details: 'Level 8-10, steady pace', youtube: '' },
    },
    thursday: { // Bike Intervals + Jump Rope
      gym: [
        { name: 'Stationary Bike (Intervals)',  compulsory: true,  sets: 1, reps: '25 min',  rest: 0,  muscle: 'Cardio, Quads, Glutes',        youtube: 'https://youtu.be/Q5PaGNoTBog' },
        { name: 'Jump Rope',                    compulsory: true,  sets: 5, reps: '2 min',   rest: 60, muscle: 'Cardio, Calves, Coordination', youtube: '' },
        { name: 'Mountain Climbers',            compulsory: false, sets: 4, reps: '30s',     rest: 30, muscle: 'Cardio, Core, Shoulders',      youtube: 'https://youtu.be/nmwgirgXLYM' },
        { name: 'Burpees',                      compulsory: false, sets: 3, reps: '10',      rest: 60, muscle: 'Cardio, Full Body',            youtube: '' },
      ],
      cali: [
        { name: 'Hanging Knee Raises',          compulsory: true,  sets: 3, reps: '15',      rest: 30, muscle: 'Lower Abs, Core',              youtube: 'https://youtu.be/aMkBGpWLi98' },
        { name: 'Bicycle Crunches',             compulsory: false, sets: 3, reps: '20/side', rest: 30, muscle: 'Obliques, Core',               youtube: 'https://youtu.be/9FGilxCbdz8' },
      ],
      cardio: { type: 'Stationary Bike', duration: '25 min', details: '30s sprint / 60s easy, repeat', youtube: 'https://youtu.be/Q5PaGNoTBog' },
    },
    friday: { // HIIT Circuit
      gym: [
        { name: 'Burpees',                      compulsory: true,  sets: 5, reps: '10',      rest: 60, muscle: 'Cardio, Full Body',            youtube: '' },
        { name: 'Box Jumps',                    compulsory: true,  sets: 5, reps: '10',      rest: 60, muscle: 'Power, Cardio, Legs',          youtube: 'https://youtu.be/52r_Ul5k03g' },
        { name: 'Kettlebell Swing',             compulsory: true,  sets: 4, reps: '20',      rest: 45, muscle: 'Cardio, Glutes, Hamstrings',   youtube: 'https://youtu.be/sSESeQAir2Y' },
        { name: 'Battle Ropes',                 compulsory: false, sets: 4, reps: '30s',     rest: 30, muscle: 'Cardio, Shoulders, Arms',      youtube: '' },
        { name: 'Jump Rope',                    compulsory: false, sets: 4, reps: '2 min',   rest: 60, muscle: 'Cardio, Calves',               youtube: '' },
        { name: 'Mountain Climbers',            compulsory: false, sets: 4, reps: '30s',     rest: 30, muscle: 'Cardio, Core',                 youtube: 'https://youtu.be/nmwgirgXLYM' },
      ],
      cali: [
        { name: 'Plank Hold',                   compulsory: true,  sets: 3, reps: '45s',     rest: 30, muscle: 'Core',                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
        { name: 'Mountain Climbers',            compulsory: false, sets: 3, reps: '30s',     rest: 30, muscle: 'Cardio, Core',                 youtube: 'https://youtu.be/nmwgirgXLYM' },
      ],
      cardio: { type: 'HIIT Circuit', duration: '35-45 min', details: 'Max effort intervals', youtube: '' },
    },
    saturday: { // Long Steady State (Endurance)
      gym: [
        { name: 'Treadmill Run (Long)',         compulsory: true,  sets: 1, reps: '40-50 min', rest: 0, muscle: 'Cardio, Legs, Endurance',     youtube: '' },
        { name: 'Stationary Bike (Cooldown)',   compulsory: false, sets: 1, reps: '15 min',  rest: 0,  muscle: 'Cardio, Active Recovery',      youtube: 'https://youtu.be/Q5PaGNoTBog' },
        { name: 'Hanging Knee Raises',          compulsory: false, sets: 3, reps: '12',      rest: 30, muscle: 'Lower Abs, Core',              youtube: 'https://youtu.be/aMkBGpWLi98' },
      ],
      cali: [
        { name: 'Plank Hold',                   compulsory: true,  sets: 3, reps: '45s',     rest: 30, muscle: 'Core',                         youtube: 'https://youtu.be/ASdvN_XEl_c' },
      ],
      cardio: { type: 'Long Run', duration: '40-50 min', details: 'Zone 2, easy conversational pace', youtube: '' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest Day', duration: '30-45 min', details: 'Light walk only', youtube: '' } },
  },

  // ── Yoga ────────────────────────────────────────────────────────────────────
  yoga: {
    monday: { // Sun Salutation + Warrior Series
      gym: [
        { name: 'Sun Salutation A',             compulsory: true,  sets: 5, reps: '5 breaths',  rest: 0,  muscle: 'Full Body, Spine, Hamstrings, Shoulders', youtube: '' },
        { name: 'Warrior I (Virabhadrasana I)', compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Hips, Quads, Shoulders, Core',       youtube: '' },
        { name: 'Warrior II',                   compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Legs, Core, Shoulders, Hips',         youtube: '' },
        { name: 'Downward Dog',                 compulsory: false, sets: 3, reps: '5 breaths',  rest: 0,  muscle: 'Hamstrings, Calves, Shoulders, Spine',   youtube: '' },
        { name: "Child's Pose",                compulsory: false, sets: 2, reps: '60s',         rest: 0,  muscle: 'Lats, Spine, Hip Flexors',               youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Yoga Flow', duration: '45-60 min', details: 'Dynamic vinyasa, moderate pace', youtube: '' },
    },
    tuesday: { // Hip Openers + Hamstring Flow
      gym: [
        { name: 'Pigeon Pose (Eka Pada)',       compulsory: true,  sets: 2, reps: '90s/side',  rest: 0,  muscle: 'Hip External Rotators, Glutes, IT Band',  youtube: '' },
        { name: 'Low Lunge (Anjaneyasana)',     compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Hip Flexors, Quads, Core',            youtube: '' },
        { name: 'Seated Forward Fold',          compulsory: true,  sets: 2, reps: '60-90s',    rest: 0,  muscle: 'Hamstrings, Lower Back, Calves',          youtube: '' },
        { name: 'Happy Baby Pose',              compulsory: false, sets: 1, reps: '60s',        rest: 0,  muscle: 'Hips, Inner Groin, Lower Back',           youtube: '' },
        { name: 'Supine Twist',                 compulsory: false, sets: 2, reps: '60s/side',  rest: 0,  muscle: 'Spine, Obliques, Hips, Lower Back',       youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Yoga Flow', duration: '45-60 min', details: 'Yin-style, long holds', youtube: '' },
    },
    wednesday: { // Core Flow + Twists
      gym: [
        { name: 'Boat Pose (Navasana)',         compulsory: true,  sets: 3, reps: '30s',       rest: 15, muscle: 'Core, Hip Flexors, Lumbar',               youtube: '' },
        { name: 'Side Plank (Vasisthasana)',    compulsory: true,  sets: 2, reps: '30s/side',  rest: 15, muscle: 'Obliques, Core, Shoulder Stability',       youtube: '' },
        { name: 'Seated Twist (Ardha Matsya)', compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Spine Rotation, Obliques, Hips',       youtube: '' },
        { name: 'Cobra Pose',                   compulsory: false, sets: 3, reps: '30s',       rest: 15, muscle: 'Spine Extension, Chest, Core',             youtube: '' },
        { name: 'Cat-Cow Stretch',              compulsory: false, sets: 2, reps: '10 cycles', rest: 0,  muscle: 'Spine, Core, Thoracic Mobility',           youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Yoga Flow', duration: '40-50 min', details: 'Core-focused vinyasa', youtube: '' },
    },
    thursday: { // Shoulder Opening + Chest
      gym: [
        { name: 'Thread the Needle',            compulsory: true,  sets: 2, reps: '60s/side',  rest: 0,  muscle: 'Thoracic Rotation, Shoulder, Upper Back',  youtube: '' },
        { name: 'Cobra Pose',                   compulsory: true,  sets: 3, reps: '30s',       rest: 15, muscle: 'Spine, Chest, Core',                       youtube: '' },
        { name: 'Downward Dog',                 compulsory: true,  sets: 3, reps: '5 breaths', rest: 0,  muscle: 'Hamstrings, Calves, Shoulders, Spine',     youtube: '' },
        { name: 'Eagle Arms Stretch',           compulsory: false, sets: 2, reps: '30s/side',  rest: 0,  muscle: 'Rear Delts, Rhomboids, Shoulder Capsule',  youtube: '' },
        { name: "Child's Pose",                compulsory: false, sets: 2, reps: '60s',        rest: 0,  muscle: 'Lats, Spine, Hip Flexors',                 youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Yoga Flow', duration: '40-50 min', details: 'Shoulder & chest focus', youtube: '' },
    },
    friday: { // Balance + Standing Poses
      gym: [
        { name: 'Tree Pose (Vrksasana)',        compulsory: true,  sets: 2, reps: '30s/side',  rest: 0,  muscle: 'Balance, Ankles, Core, Glutes',            youtube: '' },
        { name: 'Warrior III',                  compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Balance, Glutes, Hamstrings, Core',    youtube: '' },
        { name: 'Triangle Pose (Trikonasana)',  compulsory: true,  sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Hamstrings, Obliques, Hips, Balance',  youtube: '' },
        { name: 'Half Moon Pose',               compulsory: false, sets: 2, reps: '5 breaths/side', rest: 0, muscle: 'Balance, Core, Glutes, Hamstrings',    youtube: '' },
        { name: 'Mountain Pose (Mindful)',      compulsory: false, sets: 3, reps: '5 breaths', rest: 0,  muscle: 'Posture, Full Body Awareness, Breath',     youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Yoga Flow', duration: '45-55 min', details: 'Balance and standing series', youtube: '' },
    },
    saturday: { // Restorative / Yin
      gym: [
        { name: 'Legs Up Wall (Viparita)',      compulsory: true,  sets: 1, reps: '5 min',     rest: 0,  muscle: 'Recovery, Circulation, Nervous System',    youtube: '' },
        { name: 'Supine Twist',                 compulsory: true,  sets: 2, reps: '90s/side',  rest: 0,  muscle: 'Spine, Obliques, Hips, Lower Back',        youtube: '' },
        { name: 'Seated Forward Fold',          compulsory: true,  sets: 2, reps: '90s',       rest: 0,  muscle: 'Hamstrings, Lower Back, Calves',           youtube: '' },
        { name: 'Happy Baby Pose',              compulsory: false, sets: 1, reps: '2 min',     rest: 0,  muscle: 'Hips, Inner Groin, Lower Back',            youtube: '' },
        { name: 'Savasana (Corpse Pose)',       compulsory: true,  sets: 1, reps: '10 min',    rest: 0,  muscle: 'Full Body Relaxation, Nervous System Reset', youtube: '' },
      ],
      cali: [],
      cardio: { type: 'Restorative Yoga', duration: '50-60 min', details: 'Long holds, deep relaxation', youtube: '' },
    },
    sunday: { gym: [], cali: [], cardio: { type: 'Rest', duration: '20-30 min', details: 'Savasana or light walk', youtube: '' } },
  },
}
