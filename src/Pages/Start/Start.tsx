import { useNavigate } from "react-router-dom";
import { useGame } from "../../Context/GameContext";
import useRedirectIfGameopened from "../../Hooks/useRedirectIfGameOpened";
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

const Start = () => {
    useRedirectIfGameopened();
    const Navigate = useNavigate();
    const Game = useGame();
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center h-screen"
        >
            <div className="text-center">
                <h1 className="md:text-5xl text-4xl font-extrabold text-black mb-8">
                    مرحبًا بك في بنك الحظ
                </h1>
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/game");
                        Game.startGame();
                    }}
                >
                    ابدأ اللعبة
                </button>
            </div>
        </motion.div>
    );
};

export default Start;
