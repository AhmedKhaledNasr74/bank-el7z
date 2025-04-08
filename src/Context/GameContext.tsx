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

const START_BALANCE = 3000;
const START_TOWNS: string[] = [];
const LOCAL_STORAGE_SCOREBOARD = "scoreboard";
// const LOCAL_STORAGE_GAME_STATUS = "status";
// const BANK_NAME = "bank";

const INITIAL_SCOREBOARD = [
    { id: "1", name: "1", balance: START_BALANCE, towns: START_TOWNS },
    { id: "2", name: "2", balance: START_BALANCE, towns: START_TOWNS },
    { id: "3", name: "3", balance: START_BALANCE, towns: START_TOWNS },
    { id: "4", name: "4", balance: START_BALANCE, towns: START_TOWNS },
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
        const fromIndex = players.findIndex(
            (player) => player.id === fromPlayer
        );
        const toIndex = players.findIndex((player) => player.id === toPlayer);

        if (fromIndex === -1 || toIndex === -1) {
            new Audio(error).play();
            toast.error("Please select valid players.");
            return false;
        }

        const transferAmount = parseInt(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            new Audio(error).play();
            toast.error("Please enter a valid amount.");
            return false;
        }

        // Special case: If the bank is involved, handle it separately
        const updatedPlayers = [...players];
        if (players[fromIndex].id === "5") {
            // Withdraw from the bank
            updatedPlayers[toIndex].balance += transferAmount;
        } else if (players[toIndex].id === "5") {
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
