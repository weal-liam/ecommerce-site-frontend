import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons";
import { Suspense } from 'react';

export default function Page() {
    return (
        <>
			<Suspense fallback={<ProductCardSkeleton />}>
				<ProductCard />
			</Suspense>
        </>
    );
}