"use client";

import { NavLink } from "./Nav";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { updateStatus } from "@/actions/orders";

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
        <div
          className={`nav-dropdown-menu absolute top-full right-0 mt-2 rounded shadow-lg flex flex-col w-fit ${
            isDropdownOpen ? "show" : "hide"
          }`}
        >
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
        <div
          className={`menu-categorias absolute top-full rounded shadow-lg flex 
            ${isCategoryHover ? "show" : "hide"}`}
        >
          <div className="camisetes">
            <h3 className="border-b-2">Shetas</h3>
            <NavLink href="/categorias">Maningue Cenas</NavLink>
            <NavLink href="/categorias">Nhenhentsar</NavLink>
          </div>
          <div className="bones ">
            <h3 className="border-b-2">Bonés</h3>
            <NavLink href="/categorias">Love</NavLink>
          </div>
          <div className="collabs">
            <h3 className="border-b-2">Collabs</h3>
            <NavLink href="/categorias">Cronicas da Tawen</NavLink>
          </div>
          <div className="marcas">
            <h3 className="border-b-2">Marcas</h3>
            <NavLink href="/categorias">Ousadia</NavLink>
            <NavLink href="/categorias">Ndheka</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

const validStatuses = ["pending", "shipped", "delivered", "canceled"];

export const StatusDropDown = ({
  status,
  orderId,
}: {
  status: string;
  orderId: number;
}) => {
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

  const handleStatusChange = async (newStatus: string) => {
    await updateStatus({ orderId, newStatus });
  };

  return (
    <div className="status-product relative min-w-24" ref={dropdownRef}>
      <h3>Status</h3>
      <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <p>{status}</p>
      </button>
      {isDropdownOpen && (
        <div
          className={`status-dropdown-menu absolute top-full right-0 min-w-24 shadow-lg flex flex-col w-fit ${
            isDropdownOpen ? "show" : "hide"
          }`}
        >
          {validStatuses.map((validStatus) => (
            <button
              key={validStatus}
              onClick={() => handleStatusChange(validStatus)}
              disabled={validStatus === status}
              className={`${
                validStatus === status ? "text-gray-500" : "hover:bg-gray-100"
              }`}
            >
              <p>{validStatus}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
