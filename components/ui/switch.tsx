import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

interface SwitchProps {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			checked={checked}
			onCheckedChange={onCheckedChange}
			className={cn(
				'relative inline-flex h-6 w-11 items-center rounded-full',
				checked ? 'bg-primary' : 'bg-muted'
			)}
		>
			<SwitchPrimitive.Thumb
				className={cn(
					'inline-block h-4 w-4 transform bg-white rounded-full transition',
					checked ? 'translate-x-6' : 'translate-x-1'
				)}
			/>
		</SwitchPrimitive.Root>
	);
}
