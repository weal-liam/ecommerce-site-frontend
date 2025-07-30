import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export function CartIconWithBadge({ count }: { count: number }) {
  return (
    <div className="relative inline-block">
      <ShoppingCartIcon className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 border-2 border-white rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}