import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../../Context/GameContext";
import logo from "../../assets/logo.png";
import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";
import { motion } from "framer-motion";
import pageVariants from "../../assets/pageVariants.json";

const Transfer = () => {
    useRedirectIfGameClosed();
    const { id } = useParams();
    const Navigate = useNavigate();
    const Game = useGame();
    const [fromPlayer, setFromPlayer] = useState(id ? id : "");
    const [toPlayer, setToPlayer] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center h-screen "
        >
            <div className="w-full max-w-md  rounded-lg  p-6">
                <div className="flex items-center justify-center mb-6">
                    <img src={logo} alt="logo photo" className="w-44 " />
                </div>
                <span className="">Transfer from</span>
                <div className="flex gap-5 items-center justify-center mb-8">
                    <div className="mb-4 mt-2 relative">
                        {id ? (
                            <div className="cursor-not-allowed w-full p-2 border border-gray-500 rounded  bg-gray-700/20">{` ${
                                Game.players[Number(id) - 1].name
                            }`}</div>
                        ) : (
                            <select
                                className={`w-[150px] p-5 hover:ring hover:ring-purple-400 rounded-4xl bg-gradient-to-bl text-sm ${
                                    fromPlayer
                                        ? Game.players[Number(fromPlayer) - 1]
                                              .colorTheme
                                        : "from-[#FF6091] to-[#5127DD]"
                                }`}
                                value={fromPlayer}
                                onChange={(e) => setFromPlayer(e.target.value)}
                            >
                                <option value="" className="bg-gray-700/50 ">
                                    Choose
                                </option>
                                {Game.players.map((player, index) => (
                                    <option
                                        key={index}
                                        value={player.id}
                                        className="bg-gray-700/50 "
                                    >
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        {fromPlayer && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50">
                                <img
                                    src={
                                        fromPlayer
                                            ? Game.players[
                                                  Number(fromPlayer) - 1
                                              ].image
                                            : ""
                                    }
                                    className="w-10 h-10 "
                                    alt="player photo"
                                />
                            </div>
                        )}
                    </div>
                    <span className="text-4xl">To</span>
                    <div className="mb-4 relative">
                        <select
                            className={`w-[150px] p-5 hover:ring hover:ring-purple-400 rounded-4xl bg-gradient-to-bl  text-sm ${
                                toPlayer
                                    ? Game.players[Number(toPlayer) - 1]
                                          .colorTheme
                                    : "from-[#30CD89] to-[#27A1EE]"
                            }`}
                            value={toPlayer}
                            onChange={(e) => setToPlayer(e.target.value)}
                        >
                            <option value="" className="bg-gray-700/50 ">
                                Choose
                            </option>
                            {Game.players.map((player, index) => (
                                <option
                                    key={index}
                                    value={player.id}
                                    className="bg-gray-700/50 "
                                >
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        {toPlayer && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50">
                                <img
                                    src={
                                        toPlayer
                                            ? Game.players[Number(toPlayer) - 1]
                                                  .image
                                            : ""
                                    }
                                    className="w-10 h-10 "
                                    alt="player photo"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-4 flex flex-col items-center justify-center">
                    <h2 className="block mb-5 font-medium text-center text-3xl">
                        Enter the money transfer value
                    </h2>
                    <input
                        type="number"
                        className="button py-4 px-16 rounded-4xl text-center placeholder:text-gray-500/70"
                        placeholder="0$"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center mb-8 gap-4">
                    <button
                        className=" px-6 py-3 cursor-pointer hover:scale-110 transition-all text-lg rounded-full mt-8 font-semibold text-white bg-gradient-to-br from-[#FF6091] to-[#5127DD]  shadow-lg  focus:outline-none focus:ring-4 focus:ring-purple-300"
                        onClick={() => {
                            if (
                                Game.handleTransfer(
                                    fromPlayer,
                                    toPlayer,
                                    amount
                                )
                            )
                                Navigate("/game");
                        }}
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Transfer;
