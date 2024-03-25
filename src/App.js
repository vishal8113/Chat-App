import DashboardLayout from "./layouts/dashboardLayout";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
}
export default App;
