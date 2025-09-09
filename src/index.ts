const App = require("./App");
const PORT = process.env.PORT || 5000; // ✅ CRITICAL FIX: Added fallback port

App.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});