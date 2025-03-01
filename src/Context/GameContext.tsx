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
const LOCAL_STORAGE_SCOREBOARD = "scoreboard";
const LOCAL_STORAGE_GAME_STATUS = "status";
const BANK_NAME = "bank";

interface GameContextProps {
    players: Player[];
    setPlayers: (players: Player[]) => void;
    endGame: () => void;
    startGame: () => void;
    handleTransfer: (
        fromPlayer: string,
        toPlayer: string,
        amount: string
    ) => boolean;
    isGameStarted: boolean;
}

export const GameContext = createContext<GameContextProps | null>(null);

interface GameContextProviderProps {
    children: ReactNode;
}

function GameContextProvider({ children }: GameContextProviderProps) {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(() => {
        try {
            const storedIsGameStarted = localStorage.getItem(
                LOCAL_STORAGE_GAME_STATUS
            );
            return storedIsGameStarted
                ? (JSON.parse(storedIsGameStarted) as boolean)
                : false;
        } catch {
            return false; // Fallback if JSON parsing fails
        }
    });
    const [players, setPlayers] = useState<Player[]>(() => {
        // Initialize players from localStorage or set defaults
        const storedPlayers = localStorage.getItem(LOCAL_STORAGE_SCOREBOARD);
        if (storedPlayers) {
            return JSON.parse(storedPlayers) as Player[];
        }
        return [
            { name: "1", balance: START_BALANCE },
            { name: "2", balance: START_BALANCE },
            { name: "3", balance: START_BALANCE },
            { name: "4", balance: START_BALANCE },
            { name: BANK_NAME, balance: Infinity }, // Add the bank
        ];
    });

    // Save players to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_SCOREBOARD, JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_GAME_STATUS,
            JSON.stringify(isGameStarted)
        );
    }, [isGameStarted]);

    const startGame = () => {
        setIsGameStarted(true);
        new Audio(start).play();
    };

    const handleTransfer = (
        fromPlayer: string,
        toPlayer: string,
        amount: string
    ) => {
        const fromIndex = players.findIndex(
            (player) => player.name === fromPlayer
        );
        const toIndex = players.findIndex((player) => player.name === toPlayer);

        if (fromIndex === -1 || toIndex === -1) {
            new Audio(error).play();
            toast.error("الرجاء اختيار لاعبين صحيحين");
            return false;
        }

        const transferAmount = parseInt(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            new Audio(error).play();
            toast.error("الرجاء إدخال مبلغ صحيح");
            return false;
        }

        // Special case: If the bank is involved, handle it separately
        const updatedPlayers = [...players];
        if (players[fromIndex].name === BANK_NAME) {
            // Withdraw from the bank
            updatedPlayers[toIndex].balance += transferAmount;
        } else if (players[toIndex].name === BANK_NAME) {
            // Deposit to the bank
            if (players[fromIndex].balance < transferAmount) {
                new Audio(error).play();
                toast.error("رصيد اللاعب المرسل غير كافٍ");
                return false;
            }
            updatedPlayers[fromIndex].balance -= transferAmount;
        } else {
            // Standard player-to-player transfer
            if (players[fromIndex].balance < transferAmount) {
                new Audio(error).play();
                toast.error("رصيد اللاعب المرسل غير كافٍ");
                return false;
            }
            updatedPlayers[fromIndex].balance -= transferAmount;
            updatedPlayers[toIndex].balance += transferAmount;
        }

        setPlayers(updatedPlayers);
        new Audio(cash).play();
        toast.success("تمت عملية التحويل بنجاح");
        return true;
    };

    const endGame = () => {
        const resetPlayers = players.map((player) => ({
            ...player,
            balance: player.name === BANK_NAME ? Infinity : START_BALANCE, // Reset all players, but keep the bank infinite
        }));
        setPlayers(resetPlayers);
        setIsGameStarted(false);
        new Audio(close).play();
    };

    return (
        <GameContext.Provider
            value={{
                players,
                setPlayers,
                endGame,
                startGame,
                isGameStarted,
                handleTransfer,
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
