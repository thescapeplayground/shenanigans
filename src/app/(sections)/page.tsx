import { DEFAULT_PROFILE, DEFAULT_EXPERIENCES } from "../../data";

import { HomeSection } from "@/components/HomeSection";
import { MasonryBackground } from "@/components/MasonryBackground";

export default function HomePage() {
  return (
    <>
      <MasonryBackground />
      <HomeSection profile={DEFAULT_PROFILE} experiences={DEFAULT_EXPERIENCES} />
    </>
  );
}
