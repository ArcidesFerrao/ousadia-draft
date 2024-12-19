import React from "react";
import addIcon from "@/app/assets/ic--round-add.png";
import Image from "next/image";
import { NavLink } from "./Nav";

export const AddButton = ({ ...props }) => {
  return (
    <NavLink href={props.href}>
      <div className="add-button">
        <Image src={addIcon} alt="add" className="add-button-icon" />
        Adicionar Producto
      </div>
    </NavLink>
  );
};
