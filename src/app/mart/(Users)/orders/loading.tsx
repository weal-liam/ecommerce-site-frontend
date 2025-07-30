import { OrdersSkeleton } from "@/components/skeletons";


export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <OrdersSkeleton />
        </div>
    );
}