export default () => ({
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fallback',
});
