import Image from "next/image";
import { ReactNode } from "react";
import { NavLink } from "./Nav";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  pageUrl?: string;
  iconUrl?: string;
  totalVendas?: boolean;
};

export default function DashboardCard({
  title,
  subtitle,
  iconUrl,
  pageUrl,
}: DashboardCardProps) {
  return (
    <section className="dash-card border-2 p-4 flex gap-4 items-center justify-between  rounded-lg w-48 h-24">
      <div className="card-header flex flex-col  gap-4 ">
        <h2>{subtitle}</h2>
        <h3>{pageUrl ? <NavLink href={pageUrl}>{title}</NavLink> : title}</h3>
      </div>
      <div className="card-content">
        {iconUrl ? (
          <Image src={iconUrl} alt="icon" width={40} height={40} />
        ) : (
          <p>icon</p>
        )}
      </div>
    </section>
  );
}

export const DashboardCardTotal = ({
  title,
  subtitle,
  pageUrl,
}: DashboardCardProps) => {
  return (
    <section className="dash-card p-4 flex flex-col gap-4 items-center justify-center rounded-lg w-48 h-24">
      <div className="flex justify-between w-full">
        <p>MZN</p>
        <h2>{subtitle}</h2>
      </div>
      <div className="card-content flex self-start">
        <h3>{pageUrl ? <NavLink href={pageUrl}>{title}</NavLink> : title}</h3>
      </div>
    </section>
  );
};

export const DashboardCardMost = ({ children }: { children: ReactNode }) => {
  return (
    <section className="dash-card-most flex flex-col w-full max-w-fit rounded-lg py-6 px-8 gap-4 ">
      <div className="admin-section-header">
        <h2>Mais vendidos...</h2>
      </div>
      <div className="list-most flex w-full gap-4 ">{children}</div>
    </section>
  );
};

export const DashBoardOverview = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard flex justify-around w-full max-w-fit gap-5">
      {children}
    </div>
  );
};

export const ReportCard = ({ title, subtitle }: DashboardCardProps) => {
  return (
    <section className="dash-card p-4 flex flex-col gap-4 items-center justify-center rounded-lg w-48 h-24">
      <div className="flex w-full">
        <h2>{subtitle}</h2>
      </div>
      <div className="card-content flex self-start">
        <h3>{title}</h3>
      </div>
    </section>
  );
};
