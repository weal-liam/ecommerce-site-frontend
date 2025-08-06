'use client';
import { getUser } from "@/context/UserContext";
import { ArchiveBoxIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, DocumentDuplicateIcon, InboxIcon, UserGroupIcon,  } from "@heroicons/react/24/outline";


const iconMap = {
  expenditure : CurrencyDollarIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  payments: InboxIcon,
  orders : DocumentDuplicateIcon,
  paid : CheckCircleIcon,
  stock : ArchiveBoxIcon,
};

export default function CardWrapper(data: { pathname: any; data: any; }) {
 const { user } = getUser();
 const pathname =data.pathname;
 const stats =  data.data;
  return (
		<>
	   {stats && (
		<>
		   <Card title={(pathname.endsWith('/user'))?"My Payments":"Total Payments"} value={stats['payments made']} type="payments" />
		   {(pathname.endsWith('/user')) && <Card title="Spent" value={stats['expenditure']} type="expenditure" />}
		   <Card title={(!pathname.endsWith('/user'))?"Total orders":"Orders made"} value={stats['order count']} type="orders" />
		   <Card title="Paid orders" value={stats['paid orders']} type="paid" />
		   {user.is_admin && !pathname.endsWith('/user') &&
		   <>
        <Card title="Unpaid orders" value={stats['pending orders']} type="pending" />
        <Card title="Total Customers" value={stats['customers']} type="customers" />
        <Card title="Possible Visitors" value={stats['visitors']} type="customers" />
        <Card title="Total week's revenue" value={stats['revenue(last 7 days)']} type="expenditure" />
        <Card title="Total Stock" value={stats['total stock']} type="stock"/>
		   </> 
			}
		</>
		)}
		</>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'payments' | 'expenditure' | 'pending' | 'paid' | 'customers' | 'orders'| "stock";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4 items-center">
        {Icon ? <Icon className="h-7 w-7 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
