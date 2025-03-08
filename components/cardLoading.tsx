import { MoonLoader } from 'react-spinners';

export default function CardLoading({ title }: { title: string }) {
	return (
		<div className="h-full p-4">
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<div className="w-full h-full flex justify-center items-center">
				<MoonLoader size={24} />
			</div>
		</div>
	);
}
