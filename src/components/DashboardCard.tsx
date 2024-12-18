import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  iconUrl?: string;
  totalVendas?: boolean;
};

export default function DashboardCard({
  title,
  subtitle,
  iconUrl,
}: DashboardCardProps) {
  return (
    <section className="dash-card border-2 p-4 flex gap-4 items-center justify-between  rounded-lg w-48 h-24">
      <div className="card-header flex flex-col  gap-4 ">
        <h2>{subtitle}</h2>
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        <img src={iconUrl} alt="icon" width={40} height={40} />
      </div>
    </section>
  );
}

export const DashboardCardTotal = ({ title, subtitle }: DashboardCardProps) => {
  return (
    <section className="dash-card p-4 flex flex-col gap-4 items-center justify-center rounded-lg w-48 h-24">
      <div className="flex justify-between w-full">
        <h2>{subtitle}</h2>
        <p>MZN</p>
      </div>
      <div className="card-content flex self-start">
        <h3>{title}</h3>
      </div>
    </section>
  );
};

export const DashboardCardMost = ({ children }: { children: ReactNode }) => {
  return (
    <section className="dash-card-most flex flex-col w-full max-w-fit rounded-lg p-4 gap-4 ">
      <div className="admin-section-header">
        <h2>Mais vendidos...</h2>
      </div>
      <div className="list-most flex w-full gap-4 ">{children}</div>
    </section>
  );
};
