'use client';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div
            className="
flex
min-h-[400px]
items-center
justify-center
"
        >
            <div
                className="
rounded-xl
border
bg-white
p-8
text-center
"
            >
                <h2
                    className="
text-xl
font-bold
"
                >
                    Unable to load inventory
                </h2>

                <p
                    className="
mt-2
text-slate-500
"
                >
                    Something went wrong while connecting to server.
                </p>

                <button
                    onClick={reset}

                    className="
mt-5
rounded-lg
bg-indigo-600
px-5
py-2
text-white
"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
