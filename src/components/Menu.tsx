// import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "./Nav";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const AccountDropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-account" ref={dropdownRef}>
      <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <Image
          alt="account"
          src="/assets/lineaccount.png"
          width={24}
          height={24}
        />
      </button>
      {isDropdownOpen && (
        <div className="nav-dropdown-menu absolute top-full right-0 rounded shadow-lg flex flex-col w-fit items-center">
          <NavLink href="/">Sign In</NavLink>
          <NavLink href="/">Sign Up</NavLink>
        </div>
      )}
    </div>
  );
};

export const CategoryDrop = () => {
  const [isCategoryHover, setIsCategoryHover] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="categorias relative"
      ref={categoriesRef}
      onMouseEnter={() => setIsCategoryHover(true)}
      onMouseLeave={() => setIsCategoryHover(false)}
    >
      <NavLink href="/categorias">Categorias</NavLink>
      {isCategoryHover && (
        <div className="menu-categorias absolute top-full rounded shadow-lg flex">
          <div className="camisetes">
            <h3 className="border-b-2">Shetas</h3>
            <NavLink href="/categorias">Maningue Cenas</NavLink>
            <NavLink href="/categorias">Nhenhentsar</NavLink>
          </div>
          <div className="bones ">
            <h3 className="border-b-2">Bonés</h3>
            <NavLink href="/categorias">Love</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
