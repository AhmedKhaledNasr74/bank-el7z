import { useGame } from "../../Context/GameContext";
import logo from "../../assets/logo.png";

const maxHeight = 200;
const Scoreboard = () => {
    const Game = useGame();
    return (
        <div className="flex items-center justify-center  font-medium">
            <div className="w-full max-w-md rounded-lg  p-6">
                <div className="flex items-center justify-center mb-8">
                    <img src={logo} alt="logo photo" className="w-44 " />
                </div>
                <h1 className="text-3xl font-bold text-center mb-6">
                    Scoreboard
                </h1>

                <div className="flex justify-center p-10">
                    <div className="grid grid-cols-4 gap-12  items-end">
                        {Game.players.map((player) => (
                            <div
                                key={player.id}
                                className={`flex flex-col items-center  bg-red-200 relative w-[35px] rounded-full bg-gradient-to-r ${player.colorTheme}  transition-transform duration-300 ease-in-out`}
                                style={{
                                    height: `${Math.floor(
                                        (player.balance / Game.maxScore) *
                                            maxHeight
                                    )}px`,
                                }}
                            >
                                <div className="absolute -bottom-12 ">
                                    <img
                                        src={player.image}
                                        alt={`Player ${player.id}`}
                                        className="w-[80px]  mb-2"
                                    />
                                    <p className="text-lg">{player.balance}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
