import Image from "next/image";


export default function SiteLogo() {
    return (
        <div className="flex flex-row items-center gap-[10px]">
            <Image 
            src="/maverick_cart.png"
            alt="maverick_mart_logo"
			width={20}
			height={20}
            className="w-10 h-10 rounded"
            />
			<h5 className="text-2xl font-bold">MaverickMart</h5>
        </div>
    );
}