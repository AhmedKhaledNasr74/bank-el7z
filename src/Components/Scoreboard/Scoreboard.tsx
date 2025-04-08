import { useGame } from "../../Context/GameContext";
import logo from "../../assets/logo.png";
import player1 from "../../assets/player1.png";
import player2 from "../../assets/player2.png";
import player3 from "../../assets/player3.png";
import player4 from "../../assets/player4.png";

const playerImages = [player1, player2, player3, player4];

const gradients = [
    "from-[#FF6091] to-[#5127DD]",
    "from-[#F76484] to-[#F79741]",
    "from-[#30CD89] to-[#27A1EE]",
    "from-[#FE7B5F] to-[#FFCF37]",
];

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
                        {Game.players.map((player, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center  bg-red-200 relative w-[35px] rounded-full bg-gradient-to-r ${gradients[index]}  transition-transform duration-300 ease-in-out`}
                                style={{
                                    height: `${Math.floor(
                                        (player.balance / Game.maxScore) *
                                            maxHeight
                                    )}px`,
                                }}
                            >
                                <div className="absolute -bottom-12 ">
                                    <img
                                        src={playerImages[index]}
                                        alt={`Player ${index + 1}`}
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
