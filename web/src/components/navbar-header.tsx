"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export function NavbarHeader() {
  return (
    <Navbar maxWidth="xl" position="sticky">
      <NavbarBrand>
        <Link
          className="flex items-center gap-1 cursor-pointer"
          color="foreground"
        >
          <Icon
            className="size-12 text-primary"
            icon="material-symbols:delivery-truck-bolt-outline"
          />
          <span className="font-bold text-3xl">CPive</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Share</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
