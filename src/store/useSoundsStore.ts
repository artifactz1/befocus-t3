// // app/store/soundsStore.ts
// import { create } from "zustand";

// interface Sound {
//   playing: boolean;
//   volume: number;
//   url: string; // URL for the sound
//   isCustom: boolean;
// }

// interface SoundsState {
//   isDeleteMode: boolean;
//   isAddMode: boolean;
//   sounds: Record<string, Sound>; // Use Record instead of index signature
//   toggleSound: (id: string) => void;
//   toggleDeleteMode: () => void;
//   toggleAddMode: () => void;
//   setVolume: (id: string, volume: number) => void;
//   addSound: (id: string, url: string, isCustom: boolean) => void;
//   deleteSound: (id: string) => void;
// }

// export const useSoundsStore = create<SoundsState>((set) => ({
//   sounds: {},
//   isDeleteMode: false, // Initialize delete mode state
//   isAddMode: false, // Initialize delete mode state
//   toggleSound: (id) =>
//     set((state) => {
//       const sound = state.sounds[id];
//       if (sound) {
//         sound.playing = !sound.playing;
//       }
//       return { sounds: { ...state.sounds } };
//     }),
//   setVolume: (id, volume) =>
//     set((state) => {
//       const sound = state.sounds[id];
//       if (sound) {
//         sound.volume = volume;
//       }
//       return { sounds: { ...state.sounds } };
//     }),
//   addSound: (id, url, isCustom = true) =>
//     set((state) => ({
//       sounds: {
//         ...state.sounds,
//         [id]: { playing: false, volume: 0.5, url, isCustom: isCustom },
//       },
//     })),
//   deleteSound: (id) =>
//     set((state) => {
//       const newSounds = { ...state.sounds };
//       delete newSounds[id];
//       return { sounds: newSounds };
//     }),
//   toggleDeleteMode: () =>
//     set((state) => ({
//       ...state,
//       isDeleteMode: !state.isDeleteMode,
//     })),
//   toggleAddMode: () =>
//     set((state) => ({
//       ...state,
//       isAddMode: !state.isAddMode,
//     })),
// }));

import { create } from "zustand";

interface Sound {
  playing: boolean;
  volume: number;
  url: string; // URL for the sound
  isCustom: boolean;
}

interface Alarm {
  name: string;
  filePath: string; // File path for alarm sound
}

interface SoundsState {
  isDeleteMode: boolean;
  isAddMode: boolean;
  sounds: Record<string, Sound>; // Use Record instead of index signature
  toggleSound: (id: string) => void;
  toggleDeleteMode: () => void;
  toggleAddMode: () => void;
  setVolume: (id: string, volume: number) => void;
  addSound: (id: string, url: string, isCustom: boolean) => void;
  deleteSound: (id: string) => void;
}

const alarmList: Alarm[] = [
  { name: "alarm1", filePath: "/public/sounds/alarm1.mp3" },
  { name: "alarm2", filePath: "/public/sounds/alarm2.mp3" },
  { name: "alarm3", filePath: "/public/sounds/alarm3.mp3" },
  { name: "alarm4", filePath: "/public/sounds/alarm4.mp3" },
  { name: "alarm5", filePath: "/public/sounds/alarm5.mp3" },
];

export const useSoundsStore = create<SoundsState>((set) => {
  // Prepopulate sounds with alarms
  const initialSounds = alarmList.reduce<Record<string, Sound>>((acc, alarm) => {
    acc[alarm.name] = {
      playing: false,
      volume: 0.5,
      url: alarm.filePath,
      isCustom: false,
    };
    return acc;
  }, {});

  return {
    sounds: {
      ...initialSounds,
    },
    isDeleteMode: false, // Initialize delete mode state
    isAddMode: false, // Initialize add mode state
    toggleSound: (id) =>
      set((state) => {
        const sound = state.sounds[id];
        if (sound) {
          sound.playing = !sound.playing;
        }
        return { sounds: { ...state.sounds } };
      }),
    setVolume: (id, volume) =>
      set((state) => {
        const sound = state.sounds[id];
        if (sound) {
          sound.volume = volume;
        }
        return { sounds: { ...state.sounds } };
      }),
    addSound: (id, url, isCustom = true) =>
      set((state) => ({
        sounds: {
          ...state.sounds,
          [id]: { playing: false, volume: 0.5, url, isCustom: isCustom },
        },
      })),
    deleteSound: (id) =>
      set((state) => {
        const newSounds = { ...state.sounds };
        delete newSounds[id];
        return { sounds: newSounds };
      }),
    toggleDeleteMode: () =>
      set((state) => ({
        ...state,
        isDeleteMode: !state.isDeleteMode,
      })),
    toggleAddMode: () =>
      set((state) => ({
        ...state,
        isAddMode: !state.isAddMode,
      })),
  };
});

// Add "rain" and "jazz" sounds after initialization
useSoundsStore
  .getState()
  .addSound(
    "rain",
    "https://www.youtube.com/watch?v=yIQd2Ya0Ziw&ab_channel=Calm",
    true,
  );
useSoundsStore
  .getState()
  .addSound(
    "jazz",
    "https://www.youtube.com/watch?v=VwR3LBbL6Jk&ab_channel=SolaceCrossing",
    true,
  );
