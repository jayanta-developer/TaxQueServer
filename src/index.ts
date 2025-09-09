const App = require("./App");
const PORT = process.env.PORT;

App.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
