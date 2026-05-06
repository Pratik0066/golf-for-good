export default function generateNumbers() {
  const set = new Set();
  while (set.size < 5) {
    set.add(Math.floor(Math.random() * 50) + 1);
  }
  return [...set].sort((a, b) => a - b);
}