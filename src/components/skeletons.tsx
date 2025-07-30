// --- Shimmer animation utility ---
// This string adds a shimmer effect using Tailwind's arbitrary animate and gradient utilities.
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// --- ProductSheetSkeleton ---
// Mimics a product detail sheet with image, title, price, description, and button.
export function ProductSheetSkeleton() {
  return (
		<div className="md:flex gap-[1rem] flex-wrap ">
		  <div className="h-13 w-full bg-gray-400 rounded mb-1" />
		  {[...Array(12)].map((_, i) => (
		  <div key={i} className={`product-card sm:w-full border border-gray-300 rounded-lg p-2.5 shadow-md transition duration-300 ease-in-out hover:-translate-y-2.5 hover:z-10 md:flex flex-col justify-items-center items-center md:w-[214px] ${shimmer}`}>
			  <div className="h-64 w-full bg-gray-200 rounded mb-4" />
			  <div className="h-8 w-1/2 bg-gray-200 rounded mb-2" />
			  <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
			  <div className="h-4 w-full bg-gray-100 rounded mb-1" />
			  <div className="h-10 w-32 bg-gray-200 rounded mt-4" />
		  </div>))}
		</div>
  );
}

// --- ProductCardSkeleton ---
// Represents a single product card with image, title, price, and button.
export function ProductCardSkeleton() {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-100 p-4 shadow ${shimmer} w-full `}>
	  <div className="h-64 w-full bg-gray-200 rounded mb-4" />
      <div className="h-8 w-1/2 bg-gray-200 rounded mb-2" />
      <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
	  <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
	  <div className="h-4 w-full bg-gray-200 rounded mb-1" />
	  <div className="h-4 w-full bg-gray-200 rounded mb-1" />
	  <div className="h-4 w-full bg-gray-200 rounded mb-1" />
      <div className="h-8 w-24 bg-gray-200 rounded m-4 justify-self-center" />
    </div>
  );
}

// --- OrdersSkeleton ---
// Shows a list of order skeletons, each with order info and summary.
export function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`relative overflow-hidden rounded bg-white p-4 shadow ${shimmer} w-full h-full`}>
          <div className="flex justify-between mb-2">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-1/2 bg-gray-100 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}

// --- CartSkeleton ---
// Mimics a cart page with multiple cart items and a checkout button.
export function CartSkeleton() {
  return (
    <div className={`relative overflow-hidden space-y-4 p-4 bg-white rounded-lg shadow ${shimmer} w-full h-full`}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>
      ))}
      <div className="h-10 w-32 bg-gray-200 rounded mt-6 ml-auto" />
    </div>
  );
}

// --- FormSkeleton ---
// Mimics a form with multiple input fields and a submit button.
export function FormSkeleton() {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white p-6 shadow space-y-4 ${shimmer} w-full h-full`}>
      <div className="h-8 w-1/3 bg-gray-200 rounded" /> {/* Form title */}
      <div className="space-y-3">
        <div className="h-4 w-1/4 bg-gray-100 rounded" /> {/* Label */}
        <div className="h-10 w-full bg-gray-200 rounded" /> {/* Input */}
      </div>
      <div className="space-y-3">
        <div className="h-4 w-1/4 bg-gray-100 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-1/4 bg-gray-100 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
      <div className="h-10 w-32 bg-gray-200 rounded mt-6" /> {/* Submit button */}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function ChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

/*
  --- Usage ---
  - Place <ProductSheetSkeleton /> where your product sheet loads.
  - Place <ProductCardSkeleton /> in your product grid/list while loading.
  - Place <OrdersSkeleton /> on your orders page while fetching orders.
  - Place <CartSkeleton /> on your cart page while fetching cart items.
  - Place <FormSkeleton /> on your form pages while loading.

  --- Animation ---
  - All skeletons use a shimmer effect via a ::before pseudo-element and Tailwind's animate utilities.
  - The shimmer class is reusable and can be applied to any skeleton container.
*/
