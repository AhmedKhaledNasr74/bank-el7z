import end from "../../assets/end.png";
import scan from "../../assets/scan.png";
import home from "../../assets/home.png";
import bank from "../../assets/bank.png";
import transfer from "../../assets/transfer.png";
import click from "../../assets/click.wav";
import { Link, useLocation } from "react-router-dom";
import { useGame } from "../../Context/GameContext";

const Downbar = () => {
    const Game = useGame();
    const navigations = [
        {
            name: "",
            icon: end,
            function: () => {
                Game.endGame();
            },
        },
        {
            name: "scan",
            icon: scan,
        },
        {
            name: "game",
            icon: home,
        },
        {
            name: "bank",
            icon: bank,
        },
        {
            name: "transfer",
            icon: transfer,
        },
    ];
    const location = useLocation();
    return (
        <div className="flex items-center justify-center w-full h-16 bg-gradient-to-br from-[#FF6091] to-[#5127DD] text-white font-bold text-lg absolute bottom-0 rounded-t-[50px]">
            <div className="flex items-center justify-between w-full max-w-4xl px-10">
                {navigations.map((link, idx) => (
                    <Link
                        to={`/${link.name}`}
                        onClick={() => {
                            new Audio(click).play();
                            if (link.function) {
                                link.function();
                            }
                        }}
                        key={link.name + idx}
                        className={`${
                            location.pathname.includes(link.name) &&
                            link.name !== ""
                                ? "-translate-y-5 brightness-110 scale-110"
                                : "brightness-85"
                        } w-[60px] h-[60px] overflow-hidden bg-transparent border-4 border-[#622A5E] bg-gradient-to-br from-[#FF6091] to-[#5127DD] rounded-full flex justify-center items-center hover:-translate-y-5 hover:scale-110 hover:brightness-110 transition-all cursor-pointer`}
                    >
                        <img
                            src={link.icon}
                            alt={link.name}
                            className={`${
                                link.name === "bank" ? "w-[35px]" : ""
                            } `}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Downbar;
