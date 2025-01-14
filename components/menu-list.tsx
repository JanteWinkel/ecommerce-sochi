"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-primary/30"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      muySochi
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Encuentra la pieza perfecta para cada momento.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Tienda">
                Somos fabricantes de cada pieza.              </ListItem>

              <ListItem href="/contact" title="¿Buscas un diseño único?">
                Pregunta por nuestros collares y pulseras hechos a pedido.              </ListItem>

              <ListItem href="/category/sets" title="Ofertas">
                ¡Lleva tu estilo al siguiente nivel con nuestros exclusivos combos!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catálogo Accesorios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default MenuList

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Collares",
    href: "/category/collar",
    description:
      "Explora nuestros collares únicos para destacar tu estilo.",
  },
  {
    title: "Pulseras",
    href: "/category/pulsera",
    description:
      "Pulseras perfectas para cualquier ocasión",
  },
  {
    title: "Sets",
    href: "/category/sets",
    description:
      "Conjuntos perfectos para regalar o consentirte.",
  }
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

