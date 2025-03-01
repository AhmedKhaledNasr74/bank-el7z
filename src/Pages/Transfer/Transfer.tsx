import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../../Context/GameContext";

import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";

import click from "../../assets/click.wav";
const Transfer = () => {
    useRedirectIfGameClosed();
    const { id } = useParams();
    const Navigate = useNavigate();
    const Game = useGame();
    const [fromPlayer, setFromPlayer] = useState(id ? id : "");
    const [toPlayer, setToPlayer] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-orange-400">
            <div className="w-full max-w-md  rounded-lg  p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
                    تحويل الأموال
                </h1>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-purple-700">
                        من اللاعب:
                    </label>
                    {id ? (
                        <div className="cursor-not-allowed w-full p-2 border border-gray-500 rounded  bg-gray-700/20">{`Player ${id}`}</div>
                    ) : (
                        <select
                            className="w-full p-2 border border-purple-400 rounded"
                            value={fromPlayer}
                            onChange={(e) => setFromPlayer(e.target.value)}
                        >
                            <option value="">اختر اللاعب</option>
                            {Game.players.map((player, index) => (
                                <option key={index} value={player.name}>
                                    Player {player.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-purple-700">
                        إلى اللاعب:
                    </label>
                    <select
                        className="w-full p-2 border border-purple-400 rounded"
                        value={toPlayer}
                        onChange={(e) => setToPlayer(e.target.value)}
                    >
                        <option value="">اختر اللاعب</option>
                        {Game.players.map((player, index) => (
                            <option key={index} value={player.name}>
                                Player {player.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-purple-700">
                        المبلغ:
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border border-purple-400 rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button
                    className="w-full px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-lg shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    onClick={() => {
                        if (Game.handleTransfer(fromPlayer, toPlayer, amount))
                            Navigate("/game");
                    }}
                >
                    تحويل
                </button>
                <button
                    className="w-full mt-4 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                        Navigate("/game");
                        new Audio(click).play();
                    }}
                >
                    العودة إلى الصفحة الرئيسية
                </button>
            </div>
        </div>
    );
};

export default Transfer;
