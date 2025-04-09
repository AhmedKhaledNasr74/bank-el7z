import { useNavigate } from "react-router-dom";
import { useGame } from "../../Context/GameContext";
import useRedirectIfGameopened from "../../Hooks/useRedirectIfGameOpened";
import logo from "../../assets/logo.png";
import wave from "../../assets/wave.svg";
import { motion } from "framer-motion";
import pageVariants from "../../assets/pageVariants.json";

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
            className="flex items-center justify-center min-h-[100dvh] relative "
        >
            <div className="text-center px-2">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={logo}
                        alt="logo photo"
                        className="w-64 scale-pulse"
                    />
                </div>

                <h1 className="md:text-5xl text-4xl font-extrabold text-black mb-8">
                    Welcome To Bank El-Haz Game
                </h1>
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/names");
                        Game.startGame();
                    }}
                >
                    Start
                </button>
                <div className="absolute bottom-0 left-0 right-0">
                    <img src={wave} alt="" className="w-full md:hidden" />
                </div>
            </div>
        </motion.div>
    );
};

export default Start;
