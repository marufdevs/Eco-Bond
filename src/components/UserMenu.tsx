"use client";

import {
  CalendarDays,
  ChevronDown,
  CirclePlus,
  LogOut,
  Medal,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MENU_LINKS = [
  { label: "Create Event", href: "/create-event", icon: CirclePlus },
  { label: "Manage Events", href: "/manage-events", icon: CalendarDays },
  { label: "Joined Events", href: "/events", icon: Users },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Badges & Points", href: "/points", icon: Medal },
];

export default function UserMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/");
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="hidden items-center gap-2 rounded-full py-1 pr-2 pl-1 outline-none hover:bg-muted focus-visible:bg-muted data-[popup-open]:bg-muted xl:flex"
      >
        <Avatar>
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{user.name.toUpperCase().slice(0, 2)}</AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold text-primary">{user.name}</span>
          <span className="text-[10px] text-muted-foreground">Volunteer</span>
        </span>
        <ChevronDown className="size-4 text-primary/60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl p-0 pb-1 shadow-lg"
      >
        {/* Profile summary */}
        <div className="px-3.5 pt-3 pb-2.5">
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator className="my-0" />

        {/* Links */}
        {MENU_LINKS.map((link) => (
          <DropdownMenuItem
            key={link.label}
            render={<Link href={link.href} />}
            className="mx-1.5 mt-0.5 gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
          >
            <link.icon className="size-4 text-foreground/80" />
            {link.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1" />

        {/* Logout */}
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="mx-1.5 gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
