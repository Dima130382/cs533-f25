let sum = 0;

// Start from index 2 since first two are ['node', 'baby-steps.js']
for (let i = 2; i < process.argv.length; i++) {
  sum += Number(process.argv[i]);
}

console.log(sum);