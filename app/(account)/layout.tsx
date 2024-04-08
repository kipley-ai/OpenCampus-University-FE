import Sidebar from "@/components/ui/sidebar";
import AccountHeader from "@/components/ui/account-header";
import { ManageAccountProvider } from "./account/manage/account-context";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-[100dvh] overflow-hidden bg-container">
			{/* Sidebar */}
			<Sidebar />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-container p-4 border-border rounded-lg">
				<div className="border border-border rounded-lg">
					{/*  Site header */}
					<AccountHeader />

					<main className="grow [&>*:first-child]:scroll-mt-16">
						<ManageAccountProvider>{children}</ManageAccountProvider>
					</main>
				</div>
			</div>
		</div>
	);
}
