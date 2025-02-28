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

const START_BALANCE = 3000;
const LOCAL_STORAGE_SCOREBOARD = "scoreboard";
const LOCAL_STORAGE_GAME_STATUS = "status";

interface GameContextProps {
    players: Player[];
    setPlayers: (players: Player[]) => void;
    endGame: () => void;
    startGame: () => void;
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

    const endGame = () => {
        const resetPlayers = players.map((player) => ({
            ...player,
            balance: START_BALANCE,
        }));
        setPlayers(resetPlayers);
        setIsGameStarted(false);
        new Audio(close).play();
    };

    return (
        <GameContext.Provider
            value={{ players, setPlayers, endGame, startGame, isGameStarted }}
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
