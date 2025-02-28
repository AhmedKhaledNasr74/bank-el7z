import { useGame } from "../../Context/GameContext";

const Scoreboard = () => {
    const Game = useGame();
    return (
        <div className="flex items-center justify-center  font-medium">
            <div className="w-full max-w-md rounded-lg  p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    لوحة النتائج
                </h1>
                <table className="w-full border-collapse  border-purple-700/80 border-2">
                    <thead>
                        <tr>
                            <th className="border-2 border-purple-700/80 px-4 py-2 bg-purple-700/80">
                                الرصيد
                            </th>
                            <th className="border-2 border-purple-700/80 px-4 py-2 bg-purple-700/80">
                                اللاعب
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Game.players.map((player, index) => (
                            <tr key={index}>
                                <td className="border-2 border-purple-700/80 px-4 py-2 text-center">
                                    {player.balance}
                                </td>
                                <td className="border-2 border-purple-700/80 px-4 py-2 text-center">
                                    Player {player.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scoreboard;
