import { socials } from "@/constants/Socials";
import Link from "next/link";
import React from "react";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Footer = () => {
  return (
    <div className="container mx-auto py-20 border-t border-t-black">
      <div className="flex justify-between">
        <div className="flex justify-between w-1/3">
          <div className="flex-col">
            <h1>Epic Agency</h1>
            <p>Rue Wiertz 38 box 12,</p>
            <p>B-4000 Liège</p>
            <p> Belgique</p>
            <a href="tel:+3278151145">+32 78 15 11 45</a>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="#">General terms</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Cookie Settings</Link>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            {socials.map((_, index) => {
              return (
                <div
                  key={index}
                  className="p-1 border border-black rounded-full hover:bg-black hover:text-white"
                >
                  {_.icon}
                </div>
              );
            })}
          </div>
          <button className="uppercase border border-black hover:bg-black hover:text-white px-2 py-0.5 rounded-full mt-2 text-xs">
            Subscribe to our newsletter <span>
                <ReceiptLongIcon/>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
