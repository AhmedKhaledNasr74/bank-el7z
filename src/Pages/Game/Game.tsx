import { useNavigate } from "react-router-dom";
import Scoreboard from "../../Components/Scoreboard/Scoreboard";
import { useGame } from "../../Context/GameContext";
import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";
import click from "../../assets/click.wav";
import { motion } from "framer-motion";
const pageVariants = {
    hidden: { x: `100vw` },
    visible: {
        x: 0,
        transition: { type: "spring", duration: 0.4 },
    },
    exit: {
        x: "-100vw",
        transition: { type: "spring", duration: 0.2 },
    },
};

const Game = () => {
    useRedirectIfGameClosed();
    const Navigate = useNavigate();
    const Game = useGame();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center h-screen "
        >
            <div className="text-center w-full">
                <Scoreboard />
                <div className="space-y-4 space-x-4">
                    <button
                        className="px-6 py-3 cursor-pointer w-[150px] text-lg font-semibold text-black bg-purple-600/95 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                        onClick={() => {
                            Navigate("/transfer");
                            new Audio(click).play();
                        }}
                    >
                        تحويل
                    </button>
                    <button
                        className="px-6 py-3 w-[150px] cursor-pointer text-lg font-semibold text-black bg-red-500 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
                        onClick={() => {
                            Game.endGame();
                            Navigate("/");
                        }}
                    >
                        إنهاء اللعبة
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Game;
