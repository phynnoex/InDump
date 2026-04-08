import { useContext, useEffect } from "react";
import { ShortcutContext } from "../services/shortCutProvider";

export const useShortcut = (key: string, fn: () => void) => {
  const context = useContext(ShortcutContext);

  if (!context) {
    throw new Error("useShortcut must be used inside ShortCutProvider");
  }

  const { register, unregister } = context;

  useEffect(() => {
    register(key, fn);

    return () => {
      unregister(key, fn);
    };
  }, [key, fn, register, unregister]);
};
