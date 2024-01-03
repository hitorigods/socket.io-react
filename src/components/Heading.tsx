export default function Heading({ title }: { title: string }) {
	return (
		<div className="grid place-items-center">
			<div className="text-7xl uppercase tracking-wider">{title}</div>
		</div>
	);
}
