/* eslint-disable @next/next/no-img-element */
"use client";
import React, { use, useEffect } from "react";
import { Fragment } from "react";

import { classNames } from "@/utils/helpers";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";

type User = {
  imageUrl: "";
  name: "";
  email: "";
};

let USER: User | null = null;

const NAVIGATION = [
  { name: "Home", href: "#", current: true },
  { name: "FAQ", href: "#", current: false },
  { name: "Team", href: "#", current: false },
];

const USER_NAVIGATION = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const Nav = () => {
  useEffect(() => {
    console.log("in use effect nav");
  }, []);

  return (
    <Disclosure
      as="nav"
      className="border-b shadow-sm border-gray-200 dark:border-black"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>

                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {NAVIGATION.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "font-semibold" : "hover:font-semibold",
                        "inline-flex items-center px-1 pt-1"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <ThemeToggle />

                {/* Profile dropdown */}
                {USER ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={USER?.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {USER_NAVIGATION.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "font-bold" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button className="p-2 text-sm font-semibold">Log In</button>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <ThemeToggle />

                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden border-b border-gray-200 dark:border-black">
            <div className="space-y-1 pb-3 pt-2">
              {NAVIGATION.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "font-bold"
                      : "border-transparent hover:font-bold",
                    "block border-l-4 py-2 pl-3 pr-4"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>

            {USER ? (
              <div className="border-t border-gray-200 dark:border-black pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={USER?.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{USER?.name}</div>
                    <div className="text-sm font-medium">{USER?.email}</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {USER_NAVIGATION.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-4 py-2 hover:font-bold"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            ) : (
              <button className="p-2 text-sm font-semibold">Log In</button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
