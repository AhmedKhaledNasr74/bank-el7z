import { useGame } from "../../Context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pageVariants from "../../assets/pageVariants.json";
import logo from "../../assets/logo.png";
import stars from "../../assets/stars.svg";

const Winners = () => {
    const Game = useGame();
    const Navigate = useNavigate();
    const WINNER = Game.players
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 1)[0];
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className=" min-h-[100dvh] flex flex-col items-center justify-center  p-4"
        >
            <div className="text-center">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={logo}
                        alt="logo photo"
                        className="w-44 scale-pulse"
                    />
                </div>
            </div>
            <div>
                <h2 className="text-4xl font-bold !bg-gradient-to-r !from-[#EEE218] !to-[#d5d06d] !bg-clip-text !text-transparent mb-4 text-center">
                    Congratulations
                </h2>
                <h2 className="text-4xl font-bold mb-8 text-center !bg-gradient-to-r !from-[#EEE218] !to-[#d5d06d] !bg-clip-text !text-transparent">
                    <span className="!bg-gradient-to-r !from-[#EEE218] !to-[#d5d06d] !bg-clip-text !text-transparent !font-extrabold">
                        [ {WINNER.name} ]
                    </span>{" "}
                    IS THE WINNER
                </h2>
            </div>
            <div>
                {/* <h3 className="text-2xl font-bold">{WINNER.name}</h3>
                        <p className="text-lg">balance: {WINNER.balance}</p> */}

                <div className="w-[220px] h-[220px] rounded-full bg-[#9F9F9F17] relative">
                    <div className="w-[180px] h-[180px] rounded-full absolute bg-[#DFDADA17] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                    <div className="w-[152px] h-[152px]  rounded-full absolute bg-[#EDBC4C] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>

                    <div className="w-[140px] h-[140px] shadow-[0px_4px_4px_0px_#444468] rounded-full absolute bg-[#8D7EE0] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"></div>

                    <div className="w-[120px] h-[120px] rounded-full absolute bg-[#444468] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <div className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                            <img
                                src={WINNER.image}
                                alt="winner image"
                                className="scale-200"
                            />
                        </div>
                    </div>
                    <div>
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute top-9 -left-2  -translate-x-1/2  z-40"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute left-full top-0 -translate-x-full z-40"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute bottom-0 left-10 -translate-x-1/2  z-40"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute bottom-0 -right-5   z-40"
                        />

                        {/* small stars */}
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute top-20 -left-1 -translate-x-1/2  z-40 scale-50"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute top-2 left-7 -translate-x-1/2  z-40 scale-50"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute -right-4 top-11  z-40 scale-50"
                        />

                        <img
                            src={stars}
                            alt="stars"
                            className="absolute bottom-10 left-0 -translate-x-1/2  z-40 scale-50"
                        />
                        <img
                            src={stars}
                            alt="stars"
                            className="absolute bottom-10 -right-10   z-40 scale-50"
                        />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    className="px-6 py-3 mt-10 text-lg w-[200px] cursor-pointer font-semibold text-black  rounded-lg shadow-lg button focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Game.endGame();
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
