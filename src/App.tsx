import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";
import Transfer from "./Pages/Transfer/Transfer";
import { Routes, Route, useLocation } from "react-router-dom";
import GameContextProvider from "./Context/GameContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Winners from "./Pages/Winners/Winners";
import Names from "./Pages/Names/Names";
import Particles from "./Components/Particles/Particles";
import Downbar from "./Components/Downbar/Downbar";
import Scan from "./Pages/Scan/Scan";
import Bank from "./Pages/Bank/Bank";

function App() {
    const location = useLocation();

    return (
        <div className="relative min-h-[100dvh] ">
            <Particles />
            <GameContextProvider>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            background: "#333",
                            color: "#fff",
                            fontSize: "16px",
                            borderRadius: "8px",
                        },
                        success: {
                            style: {
                                background: "#28a745",
                            },
                        },
                        error: {
                            style: {
                                background: "#dc3545",
                            },
                        },
                    }}
                />
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.key}>
                        <Route path="/" element={<Start />} />
                        <Route path="/names" element={<Names />} />
                        <Route path="/winners" element={<Winners />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/transfer/:id" element={<Transfer />} />
                        <Route path="/transfer" element={<Transfer />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/bank" element={<Bank />} />
                        <Route path="/bank/:id" element={<Bank />} />
                    </Routes>
                </AnimatePresence>
                {location.pathname !== "/" &&
                    location.pathname !== "/names" &&
                    location.pathname !== "/winners" && <Downbar />}
            </GameContextProvider>
        </div>
    );
}

export default App;
