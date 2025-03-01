import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";
import Transfer from "./Pages/Transfer/Transfer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameContextProvider from "./Context/GameContext";
import { Toaster } from "react-hot-toast";
import Court from "./Pages/Court/Court";

function App() {
    let router = createBrowserRouter([
        { path: "", element: <Start /> },
        { path: "game", element: <Game /> },
        {
            path: "transfer/:id",
            element: <Transfer />,
        },
        {
            path: "transfer",
            element: <Transfer />,
        },
        {
            path: "court",
            element: <Court />,
        },
        {
            path: "court/:from/:to",
            element: <Court />,
        },
    ]);
    return (
        <GameContextProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
            <RouterProvider router={router}></RouterProvider>
        </GameContextProvider>
    );
}

export default App;
