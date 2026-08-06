"use client";

import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { WorkoutsPanel } from "./WorkoutsPanel";

export function GymPageClient() {
  return (
    <>
      <SectionHeader title="Gym Workouts" subtitle="Time your session, log every exercise, set, rep and weight" />
      <WorkoutsPanel />
    </>
  );
}
