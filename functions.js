module.exports = function avg (args) {
  return args.reduce((a, b) => a + b, null) / args.length;
} 