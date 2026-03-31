import { createContext, useEffect, useRef } from "react";

type ShortcutContextType = {
    register: (key: string, fn: () => void) => void;
    unregister: (key: string, fn: () => void) => void;
};

export const ShortcutContext = createContext<ShortcutContextType | null>(null);

export default function ShortCutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  

  const handles = useRef<Record<string, (() => void)[]>>({});

  const register = (key: string, fn: () => void) => {
    if (!handles.current[key]) {
      handles.current[key] = [];
    }
    handles.current[key].push(fn);
  };

  const unregister = (key: string, fn: () => void) => {
    if (!handles.current[key]) return;

    handles.current[key] = handles.current[key].filter((f) => f !== fn);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? "ctrl+" : ""}${e.key.toLowerCase()}`;

      const fns = handles.current[key];
      if (fns) {
        fns.forEach((fn) => fn());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ShortcutContext.Provider value={{ register, unregister }}>
      {children}
    </ShortcutContext.Provider>
  );
}
