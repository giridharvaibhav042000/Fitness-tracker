export const GOALS = {
  STRENGTH:    'strength',
  HYPERTROPHY: 'hypertrophy',
  FAT_LOSS:    'fat_loss',
  ATHLETIC:    'athletic',
  RECOVERY:    'recovery',
}

export const GOAL_META = {
  strength: {
    label: 'Strength',
    fullLabel: 'Strength Training',
    icon: '💪',
    color: 'text-gym',
    activeBg: 'bg-gym text-black border-gym',
    cardBg: 'bg-gym/10 border-gym/30',
    description: 'Build raw strength through progressive heavy compound lifting. Low reps, long rest, max load.',
    repFocus: '3–6 reps',
    restFocus: '90–180s rest',
  },
  hypertrophy: {
    label: 'Hypertrophy',
    fullLabel: 'Hypertrophy',
    icon: '📈',
    color: 'text-gold',
    activeBg: 'bg-gold text-black border-gold',
    cardBg: 'bg-gold/10 border-gold/30',
    description: 'Maximize muscle growth with high-volume, moderate-weight training. Full ROM, slow eccentric.',
    repFocus: '8–12 reps',
    restFocus: '60–90s rest',
  },
  fat_loss: {
    label: 'Fat Loss',
    fullLabel: 'Fat Loss',
    icon: '🔥',
    color: 'text-warn',
    activeBg: 'bg-warn text-black border-warn',
    cardBg: 'bg-warn/10 border-warn/30',
    description: 'Burn fat with high-rep circuits, minimal rest, and metabolic conditioning after each session.',
    repFocus: '15–20 reps',
    restFocus: '20–45s rest',
  },
  athletic: {
    label: 'Athletic',
    fullLabel: 'Athletic Performance',
    icon: '⚡',
    color: 'text-cali',
    activeBg: 'bg-cali text-black border-cali',
    cardBg: 'bg-cali/10 border-cali/30',
    description: 'Develop explosive power, speed, and functional strength. Fast concentric, controlled eccentric.',
    repFocus: '3–6 reps (power)',
    restFocus: '90–150s rest',
  },
  recovery: {
    label: 'Recovery',
    fullLabel: 'Recovery Mode',
    icon: '🌿',
    color: 'text-cardio',
    activeBg: 'bg-cardio text-black border-cardio',
    cardBg: 'bg-cardio/10 border-cardio/30',
    description: 'Deload and active recovery. Very light weights, high reps, restore movement quality.',
    repFocus: '15–20 reps',
    restFocus: '20–45s rest',
  },
}

// Each week entry: sets, reps, rest (seconds), intensity label, coaching note, compulsoryOnly flag
export const WEEK_CYCLES = {
  strength: {
    3: [
      { week: 1, label: 'Foundation', sets: 4, reps: '6–8',  rest: 90,  intensity: '70–75% 1RM', note: 'Dial in form. Controlled tempo. Learn the pattern.', compulsoryOnly: false },
      { week: 2, label: 'Overload',   sets: 4, reps: '4–6',  rest: 120, intensity: '80–85% 1RM', note: 'Push weight up. Last rep should be a grind.', compulsoryOnly: false },
      { week: 3, label: 'Peak',       sets: 5, reps: '3–5',  rest: 150, intensity: '85–90% 1RM', note: 'Max effort on main lifts. Skip optional accessories.', compulsoryOnly: true },
    ],
    4: [
      { week: 1, label: 'Foundation', sets: 4, reps: '6–8',  rest: 90,  intensity: '65–70% 1RM', note: 'Moderate effort. Build the habit, dial in technique.', compulsoryOnly: false },
      { week: 2, label: 'Build',      sets: 4, reps: '5–6',  rest: 90,  intensity: '75–80% 1RM', note: 'Add weight from week 1. Keep tight, stay controlled.', compulsoryOnly: false },
      { week: 3, label: 'Overload',   sets: 5, reps: '4–5',  rest: 120, intensity: '80–85% 1RM', note: 'Heavy week. Prioritize compounds, cut accessories if needed.', compulsoryOnly: false },
      { week: 4, label: 'Deload',     sets: 3, reps: '8–10', rest: 60,  intensity: '60% 1RM',    note: 'Deload. Let your body recover. No ego lifting.', compulsoryOnly: true },
    ],
  },
  hypertrophy: {
    3: [
      { week: 1, label: 'Volume Intro', sets: 3, reps: '10–12', rest: 75, intensity: '65–70% 1RM', note: 'Full ROM. Slow eccentric (3s down). Squeeze at top.', compulsoryOnly: false },
      { week: 2, label: 'Volume Build', sets: 4, reps: '8–12',  rest: 75, intensity: '70–75% 1RM', note: 'Add a set. Increase load where possible.', compulsoryOnly: false },
      { week: 3, label: 'High Volume',  sets: 4, reps: '10–15', rest: 60, intensity: '65–70% 1RM', note: 'Shorter rest, pump focus. Last 2 reps should burn.', compulsoryOnly: false },
    ],
    4: [
      { week: 1, label: 'Volume Intro',  sets: 3, reps: '12–15', rest: 75, intensity: '60–65% 1RM', note: 'Learn the volume. Feel every rep.', compulsoryOnly: false },
      { week: 2, label: 'Volume Build',  sets: 4, reps: '10–12', rest: 75, intensity: '65–70% 1RM', note: 'All exercises, full effort. No skipping isolation.', compulsoryOnly: false },
      { week: 3, label: 'Intensify',     sets: 4, reps: '8–10',  rest: 60, intensity: '70–75% 1RM', note: 'Heavier weight, still controlled. No sloppy reps.', compulsoryOnly: false },
      { week: 4, label: 'Deload',        sets: 3, reps: '12–15', rest: 45, intensity: '55% 1RM',    note: 'Light week. Mind-muscle connection only.', compulsoryOnly: true },
    ],
  },
  fat_loss: {
    3: [
      { week: 1, label: 'Circuit Intro',  sets: 3, reps: '15–20', rest: 45, intensity: '50–60% 1RM', note: 'Move fast. Minimal rest. Keep heart rate elevated.', compulsoryOnly: false },
      { week: 2, label: 'Intensity Up',   sets: 4, reps: '12–15', rest: 30, intensity: '55–65% 1RM', note: 'Shorter rest. Pair exercises back-to-back (superset).', compulsoryOnly: false },
      { week: 3, label: 'Max Intensity',  sets: 4, reps: '15–20', rest: 20, intensity: '50–60% 1RM', note: 'Near-zero rest. Circuit style. Add 10min HIIT after session.', compulsoryOnly: false },
    ],
    4: [
      { week: 1, label: 'Circuit Intro',   sets: 3, reps: '15',    rest: 45, intensity: '50–55% 1RM', note: 'Intro to circuits. Keep moving between exercises.', compulsoryOnly: false },
      { week: 2, label: 'Circuit Build',   sets: 3, reps: '15–20', rest: 30, intensity: '55–60% 1RM', note: 'Cut rest further. Superset push + pull movements.', compulsoryOnly: false },
      { week: 3, label: 'AMRAP Circuits',  sets: 4, reps: '20',    rest: 20, intensity: '50–55% 1RM', note: 'AMRAP style. Max calorie burn. Finish with HIIT sprints.', compulsoryOnly: false },
      { week: 4, label: 'Active Recovery', sets: 3, reps: '12–15', rest: 45, intensity: '50% 1RM',    note: 'Lighter week. Maintain movement quality. No HIIT.', compulsoryOnly: true },
    ],
  },
  athletic: {
    3: [
      { week: 1, label: 'Power Base',  sets: 4, reps: '5–6', rest: 120, intensity: '75–80% 1RM', note: 'Explosive concentric. Fast up, controlled down. Intent matters.', compulsoryOnly: false },
      { week: 2, label: 'Power Build', sets: 5, reps: '4–5', rest: 120, intensity: '80–85% 1RM', note: 'Add volume. Maintain speed and power output every rep.', compulsoryOnly: false },
      { week: 3, label: 'Peak Power',  sets: 5, reps: '3–4', rest: 150, intensity: '85–90% 1RM', note: 'Max power output. Quality over quantity. Primaries only.', compulsoryOnly: true },
    ],
    4: [
      { week: 1, label: 'Power Base',   sets: 4, reps: '6–8', rest: 90,  intensity: '70–75% 1RM', note: 'Fast, powerful reps. Develop the intent.', compulsoryOnly: false },
      { week: 2, label: 'Power Build',  sets: 4, reps: '5–6', rest: 120, intensity: '75–80% 1RM', note: 'Heavier. Drive through the floor. Accelerate the bar.', compulsoryOnly: false },
      { week: 3, label: 'Max Effort',   sets: 5, reps: '3–5', rest: 150, intensity: '85–90% 1RM', note: 'Peak power. Every rep with full intent.', compulsoryOnly: true },
      { week: 4, label: 'Power Deload', sets: 3, reps: '6–8', rest: 90,  intensity: '65% 1RM',    note: 'Deload. Maintain patterns, reduce load.', compulsoryOnly: true },
    ],
  },
  recovery: {
    3: [
      { week: 1, label: 'Flush',       sets: 2, reps: '15–20', rest: 30, intensity: '40–50% 1RM', note: 'Very light. Blood flow and mobility focus only.', compulsoryOnly: true },
      { week: 2, label: 'Light Load',  sets: 3, reps: '12–15', rest: 45, intensity: '50–55% 1RM', note: 'Gradually increase. No soreness should result.', compulsoryOnly: true },
      { week: 3, label: 'Return',      sets: 3, reps: '10–12', rest: 60, intensity: '55–60% 1RM', note: 'Getting back to normal. Listen to your body.', compulsoryOnly: false },
    ],
    4: [
      { week: 1, label: 'Passive Recovery', sets: 2, reps: '20',    rest: 20, intensity: '40% 1RM',    note: 'Minimal load. Flush the muscles. No failure.', compulsoryOnly: true },
      { week: 2, label: 'Active Recovery',  sets: 2, reps: '15–20', rest: 30, intensity: '45–50% 1RM', note: 'Slightly more volume. Still very easy.', compulsoryOnly: true },
      { week: 3, label: 'Light Volume',     sets: 3, reps: '12–15', rest: 45, intensity: '50–55% 1RM', note: 'Feeling better. Add some weight slowly.', compulsoryOnly: true },
      { week: 4, label: 'Return',           sets: 3, reps: '10–12', rest: 60, intensity: '60–65% 1RM', note: 'Back to real training. You are ready.', compulsoryOnly: false },
    ],
  },
}
