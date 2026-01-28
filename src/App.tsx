import MainContent from "./components/MainContent";
import PlayerBar from "./components/PlayerBar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-full min-h-screen flex-col bg-[#0B0B0F]">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
