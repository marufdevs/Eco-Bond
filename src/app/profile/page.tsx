import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/profile/ProfileHeader";

export const metadata: Metadata = {
  title: "Tanjina Ahmed — Profile | EcoBond",
  description:
    "Youth Climate Steward & Lead Field Organizer profile — drives, eco-points, badges, and certifications.",
};

export default function ProfilePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-secondary/40">
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <ProfileHeader />
      </main>
    </div>
  );
}
