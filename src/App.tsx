import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";
import Transfer from "./Pages/Transfer/Transfer";
import Card from "./Pages/Card/Card";
import { Routes, Route, useLocation } from "react-router-dom";
import GameContextProvider from "./Context/GameContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

function App() {
    const location = useLocation();

    return (
        <GameContextProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Start />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/transfer/:id" element={<Transfer />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/card" element={<Card />} />
                </Routes>
            </AnimatePresence>
        </GameContextProvider>
    );
}

export default App;
