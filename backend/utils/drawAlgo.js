// utils/drawAlgo.js

export const randomDraw = () => {
  return Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );
};

export const weightedDraw = (scores) => {
  const freq = {};

  scores.forEach(s => {
    freq[s.value] = (freq[s.value] || 0) + 1;
  });

  const pool = [];
  Object.entries(freq).forEach(([num, count]) => {
    for (let i = 0; i < count; i++) {
      pool.push(Number(num));
    }
  });

  return Array.from({ length: 5 }, () =>
    pool[Math.floor(Math.random() * pool.length)] || Math.floor(Math.random()*45)
  );
};