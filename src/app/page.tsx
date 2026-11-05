import { Approach } from "@/components/home/Approach";
import { Areas } from "@/components/home/Areas";
import { Articles } from "@/components/home/Articles";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Marquee } from "@/components/home/Marquee";
import { Positioning } from "@/components/home/Positioning";
import { Team } from "@/components/home/Team";
import { getAreas, getPosts, getTeam } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Marquee />
      <Areas areas={getAreas()} />
      <Approach />
      <Team members={getTeam()} />
      <Articles posts={getPosts()} />
      <ClosingCta />
      <HomeMotion />
    </>
  );
}
