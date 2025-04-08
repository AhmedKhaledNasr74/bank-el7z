import PlayerCard from "../../Components/PlayerCard/PlayerCard";
import { useGame } from "../../Context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const pageVariants = {
    hidden: { x: `-100vw` },
    visible: {
        x: 0,
        transition: { type: "spring", duration: 0.4 },
    },
    exit: {
        x: "100vw",
        transition: { type: "spring", duration: 0.2 },
    },
};
const Winners = () => {
    const Game = useGame();
    const Navigate = useNavigate();
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className=" min-h-screen flex flex-col items-center justify-center text-white p-4"
        >
            <div className="text-center">
                <h1 className="text-5xl font-bold mt-2">LEADERBOARD</h1>
                <h2 className="text-5xl  mt-1 text-red-500 font-extrabold">
                    WINNERS
                </h2>
            </div>

            <div className="relative  justify-between py-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {Game?.players
                    .slice(0, 4)
                    ?.sort((a, b) => b.balance - a.balance)
                    .slice(0, 3)
                    .map((winner, i) => (
                        <PlayerCard {...winner} rank={i + 1} key={i} />
                    ))}
            </div>

            <div className="text-center">
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/names");
                        Game.startGame();
                    }}
                >
                    New Game
                </button>
            </div>
        </motion.div>
    );
};

export default Winners;
