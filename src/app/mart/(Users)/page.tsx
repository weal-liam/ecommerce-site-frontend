import ProductsSheet from "@/components/ProductsSheet";
import { ProductSheetSkeleton } from "@/components/skeletons";
import { Suspense } from 'react';

export default function Page() {
    return (
        <>
			<Suspense fallback={<ProductSheetSkeleton />}>
				<ProductsSheet />
			</Suspense>
        </>
    );
}

