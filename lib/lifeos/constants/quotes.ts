export const DAILY_QUOTES: { quote: string; author: string }[] = [
  { quote: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { quote: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { quote: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
  { quote: "Small daily improvements are the key to staggering long-term results.", author: "James Clear" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { quote: "What gets measured gets managed.", author: "Peter Drucker" },
  { quote: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { quote: "The pain of discipline weighs ounces; the pain of regret weighs tons.", author: "Jim Rohn" },
  { quote: "You either run the day or the day runs you.", author: "Jim Rohn" },
  { quote: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { quote: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupery" },
  { quote: "Deep work is the ability to focus without distraction on a cognitively demanding task.", author: "Cal Newport" },
  { quote: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { quote: "Amateurs sit and wait for inspiration; the rest of us just get up and go to work.", author: "Stephen King" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Progress, not perfection.", author: "Unknown" },
];

export function quoteForDayOfYear(dayOfYear: number): { quote: string; author: string } {
  const index = dayOfYear % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
}
