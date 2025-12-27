"use client";

import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";
import { useState, useEffect } from "react";
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

  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() < 12 ? 'AM' : 'PM';
      setTime(`${hours}:${minutes} ${ampm}`);
      const h = now.getHours();
      const m = now.getMinutes();

      const getPeriod = (hours: number, minutes: number) => {
        if (hours === 0 && minutes === 0) return 'Midnight';
        if (hours >= 5 && hours < 6) return 'Dawn/Sunrise';
        if (hours >= 6 && hours < 12) return 'Morning';
        if (hours === 12 && minutes === 0) return 'Noon/Midday';
        if ((hours === 12 && minutes > 0) || (hours > 12 && hours < 17)) return 'Afternoon';
        if (hours >= 17 && hours < 21) return 'Evening';
        if (hours >= 21 || hours < 5) return 'Night';
        return 'Day';
      };

      const period = getPeriod(h, m);
      const mapToGreeting = (p: string) => {
        if (p === 'Dawn/Sunrise' || p === 'Morning') return 'Morning';
        if (p === 'Noon/Midday' || p === 'Afternoon') return 'Afternoon';
        if (p === 'Evening' || p === 'Dusk/Twilight') return 'Evening';
        if (p === 'Night' || p === 'Midnight') return 'Night';
        return 'Hello';
      };

      setGreeting(mapToGreeting(period));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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
          className={`${isImageLoading && !performanceMode ? "blur" : "remove-blur"
            } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
        <div className="absolute bottom-2 right-2 text-white px-3 py-2 rounded text-lg text-right" style={{ fontFamily: '"Google Sans"' }}>
          <div className="text-sm opacity-90">
            <span className="font-medium">{`Good ${greeting.toLowerCase()},`}</span>{' '}
            <span>{`it's ${time}.`}</span>
          </div>
        </div>
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
          className={`${isProfileLoading && !performanceMode ? "blur" : "remove-blur"
            } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
      </div>
      <div className="relative w-full py-3 md:-mt-18 justify-center flex-col md:flex-row md:justify-between flex gap-3 md:gap-5 items-center">
        <p className="w-full md:pl-46 truncate text-center md:text-start text-2xl font-bold dark:font-semibold" style={{ fontFamily: '"Google Sans"' }}>
          Leonardo @isaiahscape
        </p>
        <div className="w-fit flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://youtube.com/@isaiahscape">
              <Youtube className="size-6" />
              <span className="sr-only">Youtube</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com/isaiahscape">
              <Instagram className="size-6" />
              <span className="sr-only">Instagram Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitch.tv/isaiahscape">
              <Twitch className="size-6" />
              <span className="sr-only">Twitch</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/isaiahscape">
              <span className="dark:hidden">
                <GitHub className="size-6" stroke="#181717" strokeWidth={1} />
              </span>
              <span className="hidden dark:inline">
                <GitHub className="size-6" stroke="#181717" strokeWidth={1} />
              </span>
              <span className="sr-only">GitHub Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/isaiahscape">
              <LinkedIn className="size-6" />
              <span className="sr-only">LinkedIn Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://t.me/isaiahscape">
              <Telegram className="size-6" />
              <span className="sr-only">Telegram Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:isaiahscape@duck.com">
              <Gmail className="size-6" />
              <span className="sr-only">Send a Mail</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
