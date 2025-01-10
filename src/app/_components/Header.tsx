"use client";

import { useTimerStore } from "~/store/useTimerStore";
import SessionsUI from "./sessionsUI/SessionsUI";

function Timer() {
  const { sessions, currentSession, isWorking, isRunning } = useTimerStore();

  return (
    <div className="flex h-[15vh] w-full items-center justify-between px-[5vw]">
      <div className="font-regular text-9xl">
        {/* {isWorking ? "Focus" : "Break"} */}
        <SessionsUI />
      </div>
      <div className="flex flex-col items-center justify-center text-right">
        <p className="font-regualr text-5xl">
          {isRunning ? (isWorking ? "Focus" : "Break") : "BeFoucsed"}
        </p>
      </div>
    </div>
  );
}

export default Timer;
