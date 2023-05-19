module.exports = {
    escapeRegex: (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
};
