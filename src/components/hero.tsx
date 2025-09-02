"use client";

import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { GitHub } from "./logos/github";
import { Youtube } from "./logos/youtube";
import { Twitch } from "./logos/twitch";
import { LinkedIn } from "./logos/linkedin";
import { Telegram } from "./logos/telegram";
import { Instagram } from "./logos/instagram";
import { Gmail } from "./logos/gmail";

export interface HeroProps {
  img: StaticImport;
  profile: StaticImport;
}

export function Hero({ img, profile }: HeroProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [performanceMode] = useAtom(performanceModeAtom);

  const image = img as StaticImageData;
  const profileImg = profile as StaticImageData;

  return (
    <div className="relative">
      <div className="relative overflow-clip w-full max-h-72 rounded-lg">
        <Image
          src={image}
          alt="Hero Image"
          height={1080}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          onLoad={() => setIsImageLoading(false)}
          className={`${
            isImageLoading && !performanceMode ? "blur" : "remove-blur"
          } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
      </div>
      <div className="relative rounded-full aspect-square size-28 md:size-36 mx-auto md:mx-0 md:ml-5 -mt-18 border-6 border-background overflow-clip">
        <Image
          src={profileImg}
          unoptimized={profileImg.src.includes("animated")}
          alt="Profile Picture"
          height={500}
          placeholder="blur"
          blurDataURL={profileImg.blurDataURL}
          onLoad={() => setIsProfileLoading(false)}
          className={`${
            isProfileLoading && !performanceMode ? "blur" : "remove-blur"
          } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
      </div>
      <div className="relative w-full py-3 md:-mt-18 justify-center flex-col md:flex-row md:justify-between flex gap-3 md:gap-5 items-center">
        <p className="w-full md:pl-46 truncate text-center md:text-start text-2xl font-bold dark:font-semibold">
          Leonardo @isaiahscape
        </p>
        <div className="w-fit flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://youtube.com/@isaiahscape">
              <Youtube className="size-6" color="#FF0000" />
              <span className="sr-only">Youtube</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com/isaiahscape">
              <Instagram className="size-6" color="#E4405F" />
              <span className="sr-only">Instagram Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitch.tv/isaiahscape">
              <Twitch className="size-6" color="#9146FF" />
              <span className="sr-only">Twitch</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/isaiahscape">
              <span className="dark:hidden">
                <GitHub className="size-6" color="#181717" stroke="#181717" strokeWidth={1} />
              </span>
              <span className="hidden dark:inline">
                <GitHub className="size-6" color="#FFFFFF" stroke="#181717" strokeWidth={1} />
              </span>
              <span className="sr-only">GitHub Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/isaiahscape">
              <LinkedIn className="size-6" color="#0077B5" />
              <span className="sr-only">LinkedIn Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://t.me/isaiahscape">
              <Telegram className="size-6" color="#229ED9" />
              <span className="sr-only">Telegram Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:isaiahscape@duck.com">
              <Gmail className="size-6" color="#EA4335" />
              <span className="sr-only">Send a Mail</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
