
import Navigation from "../routes/nav/Navigation";
import Content from "./content/content";

function Dashboard() {
  return (
    <div id="dashboard">
      <h1 style={{ textAlign: "center", fontFamily: "-moz-initial" }}>App chicken</h1>
      <Navigation  />
      <Content />
    </div>
  );
}

export default Dashboard;