import MainContent from "./components/MainContent";
import PlayerBar from "./components/PlayerBar";
import Sidebar from "./components/Sidebar";
import { PlayerProvider } from "./player";

function App() {
	return (
		<PlayerProvider>
			<div className="flex h-full min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
				<div className="flex min-h-0 flex-1">
					<Sidebar />
					<MainContent />
				</div>
				<PlayerBar />
			</div>
		</PlayerProvider>
	);
}

export default App;
