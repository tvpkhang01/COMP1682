import './App.css';
import Body from "./layout/Body";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Container">
        <div className="Sider">
          <Navigation />
        </div>
        <div className="Main">
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;