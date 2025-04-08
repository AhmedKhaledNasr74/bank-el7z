import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGame } from "../../Context/GameContext";
import { useState } from "react";
import pageVariants from "../../assets/pageVariants.json";

const Bank = () => {
    const Game = useGame();
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const [amount, setAmount] = useState("");

    const handlePlayerClick = (id: string) => {
        // Transfer money from player 5 to the selected player
        navigate(`/bank/${id}`); // Update the URL with the player's id
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen flex flex-col items-center justify-center p-4"
        >
            <div className="w-full max-w-md rounded-2xl p-8 transform transition-all">
                <div className="flex items-center justify-center mb-8">
                    <img src={logo} alt="logo photo" className="w-44 " />
                </div>
                {id ? (
                    // Render amount form when a player is selected
                    <form
                        onSubmit={handleSubmit}
                        className="shadow-lg rounded-2xl p-8 w-full"
                    >
                        <div className="flex justify-center items-center mb-4">
                            <img
                                src={
                                    Game.players.find(
                                        (player) => player.id == id
                                    )?.image || ""
                                }
                                alt="player photo"
                                className="w-[100px] rounded-full mb-2"
                            />
                        </div>
                        <h2 className="text-lg text-center font-bold mb-10">
                            Transfer money to {Game.players[+id]?.name}
                        </h2>
                        <div className="flex flex-col gap-10 items-center mb-8">
                            <input
                                type="number"
                                className="button py-4 px-16 rounded-4xl text-center placeholder:text-gray-500/70"
                                placeholder="0$"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="flex gap-5 items-center justify-center">
                                <button
                                    type="submit"
                                    onClick={() => {
                                        if (
                                            Game.handleTransfer("5", id, amount)
                                        )
                                            navigate("/game");
                                    }}
                                    className="bg-gradient-to-br from-[#FF6091] to-[#5127DD] text-white px-8 py-3 rounded-full cursor-pointer hover:scale-110 transition-all"
                                >
                                    Deposit
                                </button>

                                <button
                                    type="submit"
                                    onClick={() => {
                                        if (
                                            Game.handleTransfer(id, "5", amount)
                                        )
                                            navigate("/game");
                                    }}
                                    className="bg-gradient-to-br from-[#FF6091] to-[#5127DD] text-white px-8 py-3 rounded-full cursor-pointer hover:scale-110 transition-all"
                                >
                                    withdraw
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-2 gap-y-5 h-[300px]">
                        {Game.players.map((player) => (
                            <div
                                key={player.id}
                                className="flex flex-col justify-center items-center cursor-pointer group"
                                onClick={() => handlePlayerClick(player.id)}
                            >
                                <div className="flex justify-center items-center mb-2">
                                    <img
                                        src={player.image}
                                        alt={"player Photo"}
                                        className="w-[80px] rounded-full group-hover:scale-110 transition-all"
                                    />
                                </div>
                                <h2>{player.name}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Bank;
