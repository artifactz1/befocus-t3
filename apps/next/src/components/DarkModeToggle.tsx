"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/tooltip";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage or default to dark mode
    const darkModeFromLocalStorage =
      localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModeFromLocalStorage);

    if (darkModeFromLocalStorage) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleToggle}
            variant="outline"
            size="lg"
            className="lg:h-12 lg:w-32"
          >
            {isDarkMode ? <Sun strokeWidth={3} /> : <Moon strokeWidth={3} />}{" "}
            {/* This changes the icon */}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-bold">
          Toggle {isDarkMode ? " Light Mode" : " Dark Mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
