{
  /* Some of this page was generated using AI, althought edits and tweaks were made by me */
}

import { Button } from "@heroui/react";

export default function App() {
  return (
    <>
      <div
        className="relative min-h-screen w-full bg-cover bg-center font-sans antialiased select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.7) 100%), url('/Galio_The_Colossus.jpg')`,
        }}
      >
        {/* Global Header */}
        <header className="absolute top-0 left-0 w-full p-8 z-10">
          <h1 className="text-xl font-black tracking-widest text-zinc-100">
            LOL<span className="text-amber-500">ANALYZER</span>
          </h1>
        </header>

        {/* Main Grid Wrapper */}
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12 items-center px-8 md:px-16 pt-24 pb-12 gap-8">
          {/* LEFT COLUMN: Buttons (Takes up 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            <div className="flex flex-col gap-4 pt-2">
              <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-8 rounded-none tracking-wide text-xs uppercase h-11">
                Analyze Player Stats
              </Button>
              <Button
                variant="ghost"
                className="border-zinc-700 hover:border-zinc-500 text-white font-medium px-8 rounded-none tracking-wide text-xs uppercase h-11"
              >
                More Details & Stats
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Text & Titles (Takes up 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:items-end lg:text-right space-y-6 z-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-500/90 mb-1">
                The Colossus
              </h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
                Galio
              </h3>
            </div>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light max-w-xl">
              Outside the Great City of Demacia, the stone colossus Galio stands
              vigilant. Built as a bulwark against enemy mages, he often remains
              motionless for decades, until the presence of powerful magic stirs
              him to life. Once activated, he makes the most of his time,
              savoring the rare thrill of battle.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
