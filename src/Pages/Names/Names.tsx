import React, { useState } from "react";
import { useGame } from "../../Context/GameContext";
import { useNavigate } from "react-router-dom";
import click from "../../assets/click.wav";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import pageVariants from "../../assets/pageVariants.json";

const Names = () => {
    const [playerNames, setPlayerNames] = useState<string[]>([
        "player 1",
        "player 2",
        "player 3",
        "player 4",
    ]);

    const Game = useGame();
    const Navigate = useNavigate();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;
        setPlayerNames((prev) => {
            const newNames = [...prev];
            newNames[index] = value;
            return newNames;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Game.setNames(playerNames);
        new Audio(click).play();
        Navigate("/game");
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="min-h-[100dvh]  flex flex-col items-center justify-center p-4"
        >
            <div className="w-full max-w-md  rounded-2xl  p-8 transform transition-all">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={logo}
                        alt="logo photo"
                        className="w-44 scale-pulse"
                    />
                </div>
                <div className="flex items-center gap-3 mb-8  justify-center">
                    <h1 className="text-3xl font-bold text-purple-700">
                        Add Players
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {playerNames.map((name, index) => (
                        <div key={index} className="relative group">
                            <div className="flex relative group">
                                <input
                                    type="text"
                                    id={`player${index + 1}`}
                                    value={name}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    className={`block w-full px-4 py-4   
                                          focus:ring-1 focus:border-0 focus:outline-none
                                         transition-all duration-200 ease-in-out
                                         text-gray-900 placeholder-gray-400 group-hover:-translate-y-0.5
                                         shadow-sm rounded-full text-center bg-gradient-to-br ${Game.players[index].colorTheme} `}
                                    placeholder={`Player ${index + 1}`}
                                />
                                <img
                                    src={Game.players[index].image}
                                    alt="player image"
                                    className="absolute right-2  transform   h-full group-hover:-translate-y-0.5 transition-all"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-36 flex items-center justify-center gap-2 px-6 py-3  justify-self-end
                                 bg-indigo-600 hover:bg-indigo-700 
                                 text-white font-medium rounded-full
                                 transform transition-all duration-200 
                                 hover:shadow-lg hover:scale-105 cursor-pointer
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-br from-[#FF6091] to-[#5127DD]"
                    >
                        Next
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Names;
