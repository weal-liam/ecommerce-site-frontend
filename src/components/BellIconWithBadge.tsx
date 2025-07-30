import { BellIcon, BellAlertIcon } from "@heroicons/react/24/outline";


export default function BellIconWithBadge({ count }: { count: number }) {
    return (
        <div className="relative">
            {(count > 0)?<>
				<BellAlertIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 border-2 border-white rounded-full">
                    {count}
                </span></>
            : <BellIcon className="w-6 h-6" />
			}
        </div>
    );
}