
export async function generateStaticParams() {
	// Pre-render driver pages for racing numbers 1..99
	return Array.from({ length: 99 }, (_, i) => ({ nr: String(i + 1) }));
}

export default function DriverPage() {
	return (
		<div>
			<p>comming soon</p>
		</div>
	);
}
