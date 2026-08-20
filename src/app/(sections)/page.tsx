import { DEFAULT_PROFILE, DEFAULT_EXPERIENCES } from "../../data";
import { HomeSection } from "@/components/HomeSection";
import { FerrofluidBackground } from "@/components/FerrofluidBackground";

export default function HomePage() {
  return (
    <>
      <FerrofluidBackground />
      <HomeSection profile={DEFAULT_PROFILE} experiences={DEFAULT_EXPERIENCES} />
    </>
  );
}
