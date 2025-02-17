"use client";
import Image from "next/image";
import { deleteProduct } from "@/actions/products";
import { useEffect, useState, useTransition } from "react";
import { NavLink } from "@/components/Nav";

export const EditItem = ({ id }: { id: string }) => {
  return (
    <NavLink href={`/admin/products/${id}/edit`}>
      <Image src="/assets/edit-outline.png" alt="edit" width={24} height={24} />
    </NavLink>
  );
};

export const DeleteDropdownItem = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      <Image
        src="/assets/delete-line.png"
        alt="delete"
        width={18}
        height={18}
      />
    </button>
  );
};

export const Active = ({ stock }: { stock: number }) => {
  // const [isPending, startTransition] = useTransition();
  const [isAvailable, setIsAvailable] = useState(true);
  useEffect(() => {
    if (stock < 2) setIsAvailable(false);
  }, [stock, isAvailable]);

  return (
    <>
      {isAvailable ? (
        <Image alt="on" src="/assets/on-outline.png" width={24} height={24} />
      ) : (
        <Image
          alt="off"
          src="/assets/gg--toggle-on.png"
          width={32}
          height={32}
        />
      )}
    </>
  );
};

export const UpdateStatus = ({
  status,
  id,
}: {
  status: string;
  id: number;
}) => {
  const statusColor: Record<string, string> = {
    delivered: "text-green-300",
    canceled: "text-red-300",
    pending: "text-yellow-300",
  };

  return (
    <NavLink href={`/admin/orders/${id}`}>
      <p className={`font-semibold ${statusColor[status] || "text-gray-500"} `}>
        {status}
      </p>
    </NavLink>
  );
};
