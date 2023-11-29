import React from "react";
import Image from "next/image";
import { classNames } from "@/utils/helpers";

const Footer = () => {
  return (
    <div
      className={classNames(
        "border-t border-gray-200 dark:border-black px-1 py-2 lg:p-4"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative h-24 w-52 ">
          <Image
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="RISE: Refugee and Immigrant Service Enhancement"
            fill
            // style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="grid grid-cols-2 border-b border-black leading-loose sm:grid-cols-3 xl:grid-cols-6">
          <p id="presented-by">Presented by:</p>
          <p className="col-span-2" id="funded-by">
            Funded by / Financé par:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-4 pt-4 sm:grid-cols-3 xl:grid-cols-6">
          <div className="relative h-8 w-32">
            <Image
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Hackworks Logo"
              aria-labelledby="presented-by"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="relative col-span-2 h-8 w-80">
            <Image
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Immigration, Refugees and Citizenship Canada"
              aria-labelledby="funded-by"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <a href={""} target="_blank" rel="noreferrer">
            Privacy Policy
          </a>

          <a href={""} target="_blank" rel="noreferrer">
            Terms of Service
          </a>

          <p className="flex lg:justify-end">© 2023 Hackworks Inc</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
