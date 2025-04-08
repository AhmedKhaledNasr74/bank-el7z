import React, { useState } from "react";
import { useGame } from "../../Context/GameContext";
import { useNavigate } from "react-router-dom";
import click from "../../assets/click.wav";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import player1 from "../../assets/player1.png";
import player2 from "../../assets/player2.png";
import player3 from "../../assets/player3.png";
import player4 from "../../assets/player4.png";

const playerImages = [player1, player2, player3, player4];
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

const gradients = [
    "from-[#FF6091] to-[#5127DD]",
    "from-[#F76484] to-[#F79741]",
    "from-[#30CD89] to-[#27A1EE]",
    "from-[#FE7B5F] to-[#FFCF37]",
];

const Names = () => {
    const [playerNames, setPlayerNames] = useState<string[]>([
        "player 1",
        "player 2",
        "player 3",
        "player 4",
        "bank",
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
            className="min-h-screen  flex flex-col items-center justify-center p-4"
        >
            <div className="w-full max-w-md  rounded-2xl  p-8 transform transition-all">
                <div className="flex items-center justify-center mb-8">
                    <img src={logo} alt="logo photo" className="w-44 " />
                </div>
                <div className="flex items-center gap-3 mb-8  justify-center">
                    <h1 className="text-3xl font-bold text-purple-700">
                        Add Players
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {playerNames.slice(0, 4).map((name, index) => (
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
                                         shadow-sm rounded-full text-center bg-gradient-to-br ${gradients[index]}`}
                                    placeholder={`Player ${index + 1}`}
                                />
                                <img
                                    src={playerImages[index]}
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
