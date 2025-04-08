import player from "../../assets/player.png";
interface PlayerCardProps {
    rank: number;
    name: string;
    balance: number;
    towns: string[];
}
export default function PlayerCard({
    name,
    towns,
    rank,
    balance,
}: PlayerCardProps) {
    return (
        <div className="mx-auto max-w-[380px] px-5">
            <div className="rounded-3xl border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                <div className="rounded-3xl bg-white p-4 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600">
                    <div className="relative overflow-hidden pb-3">
                        <div className="overflow-hidden [filter:url('#rounded')]">
                            <div className="relative h-[400px] border border-gray-200 bg-gradient-to-b from-orange-500 to-yellow-400 [clip-path:polygon(0_0,_100%_0,_100%_95%,_50%_100%,_0_95%)] dark:border-gray-600">
                                <div className="pointer-events-none absolute left-1/2 top-10 -z-10 ms-8 -translate-x-1/2 text-center text-9xl/[0.8em] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                                    <div>{name}</div>
                                </div>
                                <img src={player} alt="Player" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-orange-600 to-yellow-300 text-2xl/none font-extrabold tracking-tighter text-white">
                            {rank}
                        </div>
                    </div>

                    <div className="pb-1 pt-3 text-center text-slate-800 dark:text-white">
                        <h2 className="text-[22px]/tight font-bold tracking-tight">
                            {name}
                        </h2>
                    </div>
                </div>

                <div className="mx-auto grid w-fit grid-cols-3 divide-x divide-gray-200 py-5 text-slate-800 dark:divide-gray-600 dark:text-white">
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">
                            {towns.length}
                        </div>
                        <div className="text-[0.6875rem]/tight uppercase">
                            Towns
                        </div>
                    </div>
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">
                            {rank}
                        </div>
                        <div className="text-[0.6875rem]/tight uppercase">
                            Rank
                        </div>
                    </div>
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">
                            {balance}
                        </div>
                        <div className="text-[0.6875rem]/tight uppercase">
                            balance
                        </div>
                    </div>
                </div>
            </div>

            <svg
                className=" absolute"
                width="10"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="rounded">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="9"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
