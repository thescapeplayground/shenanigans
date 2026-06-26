"use client";

import { createContext, useContext } from "react";

type ActiveTab = "home" | "projects" | "stack" | "gallery" | "services" | "contact" | "blog";

interface NavigationContextValue {
  /** The route-based active tab (derived from pathname) */
  activeTab: ActiveTab;
  /** The client-side tab on the home page SPA */
  homeTab: ActiveTab;
  /** Whether the user is on the home page */
  isHome: boolean;
  /** Called by the dock when clicking a nav item on the home page */
  onTabChange: (tab: ActiveTab) => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  activeTab: "home",
  homeTab: "home",
  isHome: false,
  onTabChange: () => {},
});

export { NavigationContext };
export type { ActiveTab };
export function useNavigation() {
  return useContext(NavigationContext);
}
