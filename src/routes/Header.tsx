"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/NavigationMenu";

import routes from "~/routes/routes";

const Header = () => {
  const router = useRouter();

  return (
    <header className="navbar py-4">
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => {
            const isOnCurrentRoute = route.href === router.asPath;
            return (
              <NavigationMenuItem key={route.title}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    data-active={isOnCurrentRoute ? "true" : undefined}
                    className={navigationMenuTriggerStyle()}
                  >
                    {route.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
