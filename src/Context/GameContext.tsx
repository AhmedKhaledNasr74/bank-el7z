import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Player } from "../Interfaces/Player";
import start from "../assets/start.wav";
import close from "../assets/close.wav";
import toast from "react-hot-toast";
import cash from "../assets/cash.wav";
import error from "../assets/error.wav";
import player1 from "../assets/player1.svg";
import player2 from "../assets/player2.svg";
import player3 from "../assets/player3.svg";
import player4 from "../assets/player4.svg";

const START_BALANCE = 3000;
// const START_TOWNS: string[] = [];
const LOCAL_STORAGE_SCOREBOARD = "scoreboard";
// const LOCAL_STORAGE_GAME_STATUS = "status";
// const BANK_NAME = "bank";

const INITIAL_SCOREBOARD = [
    {
        id: "1",
        name: "1",
        balance: START_BALANCE,
        image: player1,
        colorTheme: "from-[#FF6091] to-[#5127DD]",
    },
    {
        id: "2",
        name: "2",
        balance: START_BALANCE,
        image: player2,
        colorTheme: "from-[#F76484] to-[#F79741]",
    },
    {
        id: "3",
        name: "3",
        balance: START_BALANCE,
        image: player3,
        colorTheme: "from-[#30CD89] to-[#27A1EE]",
    },
    {
        id: "4",
        name: "4",
        balance: START_BALANCE,
        image: player4,
        colorTheme: "from-[#FE7B5F] to-[#FFCF37]",
    },
    // { id: "5", name: "bank", balance: Infinity, towns: START_TOWNS },
];

interface GameContextProps {
    players: Player[];
    maxScore: number;
    setPlayers: (players: Player[]) => void;
    endGame: () => void;
    startGame: () => void;
    setNames: (names: string[]) => void;
    handleTransfer: (
        fromPlayer: string,
        toPlayer: string,
        amount: string
    ) => boolean;
}

export const GameContext = createContext<GameContextProps | null>(null);

interface GameContextProviderProps {
    children: ReactNode;
}

function GameContextProvider({ children }: GameContextProviderProps) {
    const [players, setPlayers] = useState<Player[]>(() => {
        const storedPlayers = localStorage.getItem(LOCAL_STORAGE_SCOREBOARD);
        if (storedPlayers) {
            return JSON.parse(storedPlayers) as Player[];
        }
        return [];
        // return [...INITIAL_SCOREBOARD];
    });
    const [maxScore, setMaxScore] = useState<number>(
        Math.max(...players.map((player) => player.balance))
    );
    // Save players to localStorage whenever they change
    useEffect(() => {
        if (!players.length) return;
        localStorage.setItem(LOCAL_STORAGE_SCOREBOARD, JSON.stringify(players));
        setMaxScore(Math.max(...players.map((player) => player.balance)));
    }, [players]);

    const startGame = () => {
        new Audio(start).play();
        setPlayers([...INITIAL_SCOREBOARD]);
    };

    const handleTransfer = (
        fromPlayer: string,
        toPlayer: string,
        amount: string
    ) => {
        // Validate input

        const fromIndex = players.findIndex(
            (player) => player.id === fromPlayer
        );
        const toIndex = players.findIndex((player) => player.id === toPlayer);

        const transferAmount = parseInt(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            new Audio(error).play();
            toast.error("Please enter a valid amount.");
            return false;
        }

        // Special case: If the bank is involved, handle it separately
        const updatedPlayers = [...players];
        if (fromPlayer === "5") {
            // Withdraw from the bank
            updatedPlayers[toIndex].balance += transferAmount;
        } else if (toPlayer === "5") {
            // Deposit to the bank
            if (players[fromIndex].balance < transferAmount) {
                new Audio(error).play();
                toast.error("The sender's balance is insufficient.");
                return false;
            }
            updatedPlayers[fromIndex].balance -= transferAmount;
        } else {
            // Standard player-to-player transfer
            if (players[fromIndex].balance < transferAmount) {
                new Audio(error).play();
                toast.error("The sender's balance is insufficient.");
                return false;
            }
            updatedPlayers[fromIndex].balance -= transferAmount;
            updatedPlayers[toIndex].balance += transferAmount;
        }

        setPlayers(updatedPlayers);
        new Audio(cash).play();
        toast.success("The transfer was completed successfully.");
        return true;
    };

    const endGame = () => {
        localStorage.clear();
        // setPlayers([...INITIAL_SCOREBOARD]);
        new Audio(close).play();
    };

    const setNames = (names: string[]) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player, i) => ({ ...player, name: names[i] }))
        );
    };

    return (
        <GameContext.Provider
            value={{
                players,
                maxScore,
                setPlayers,
                endGame,
                startGame,
                handleTransfer,
                setNames,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};

export default GameContextProvider;
