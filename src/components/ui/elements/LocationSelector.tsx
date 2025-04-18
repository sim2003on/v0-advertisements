'use client';

import { Check, ChevronsUpDown, MapPin, X } from 'lucide-react';
import { useState } from 'react';

import {
	Badge,
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/primitives';

import { cn } from '@/utils/tw-merge';

const locationData = [
	{
		id: 'yerevan',
		label: 'Yerevan',
		children: [
			{ id: 'kentron', label: 'Kentron', parent: 'yerevan' },
			{ id: 'arabkir', label: 'Arabkir', parent: 'yerevan' },
			{ id: 'kanaker-zeytun', label: 'Kanaker-Zeytun', parent: 'yerevan' },
			{ id: 'nor-nork', label: 'Nor Nork', parent: 'yerevan' },
			{ id: 'ajapnyak', label: 'Ajapnyak', parent: 'yerevan' },
			{ id: 'davtashen', label: 'Davtashen', parent: 'yerevan' },
			{ id: 'erebuni', label: 'Erebuni', parent: 'yerevan' },
			{ id: 'shengavit', label: 'Shengavit', parent: 'yerevan' },
			{ id: 'malatia-sebastia', label: 'Malatia-Sebastia', parent: 'yerevan' },
			{ id: 'nubarashen', label: 'Nubarashen', parent: 'yerevan' }
		]
	},
	{
		id: 'shirak',
		label: 'Shirak Province',
		children: [
			{ id: 'gyumri', label: 'Gyumri', parent: 'shirak' },
			{ id: 'artik', label: 'Artik', parent: 'shirak' },
			{ id: 'maralik', label: 'Maralik', parent: 'shirak' }
		]
	},
	{
		id: 'lori',
		label: 'Lori Province',
		children: [
			{ id: 'vanadzor', label: 'Vanadzor', parent: 'lori' },
			{ id: 'stepanavan', label: 'Stepanavan', parent: 'lori' },
			{ id: 'alaverdi', label: 'Alaverdi', parent: 'lori' }
		]
	},
	{
		id: 'tavush',
		label: 'Tavush Province',
		children: [
			{ id: 'ijevan', label: 'Ijevan', parent: 'tavush' },
			{ id: 'dilijan', label: 'Dilijan', parent: 'tavush' },
			{ id: 'noyemberyan', label: 'Noyemberyan', parent: 'tavush' }
		]
	},
	{
		id: 'aragatsotn',
		label: 'Aragatsotn Province',
		children: [
			{ id: 'ashtarak', label: 'Ashtarak', parent: 'aragatsotn' },
			{ id: 'aparan', label: 'Aparan', parent: 'aragatsotn' },
			{ id: 'talin', label: 'Talin', parent: 'aragatsotn' }
		]
	},
	{
		id: 'kotayk',
		label: 'Kotayk Province',
		children: [
			{ id: 'hrazdan', label: 'Hrazdan', parent: 'kotayk' },
			{ id: 'abovyan', label: 'Abovyan', parent: 'kotayk' },
			{ id: 'tsaghkadzor', label: 'Tsaghkadzor', parent: 'kotayk' }
		]
	},
	{
		id: 'gegharkunik',
		label: 'Gegharkunik Province',
		children: [
			{ id: 'gavar', label: 'Gavar', parent: 'gegharkunik' },
			{ id: 'sevan', label: 'Sevan', parent: 'gegharkunik' },
			{ id: 'martuni', label: 'Martuni', parent: 'gegharkunik' }
		]
	},
	{
		id: 'armavir',
		label: 'Armavir Province',
		children: [
			{ id: 'armavir-city', label: 'Armavir', parent: 'armavir' },
			{ id: 'vagharshapat', label: 'Vagharshapat', parent: 'armavir' },
			{ id: 'metsamor', label: 'Metsamor', parent: 'armavir' }
		]
	},
	{
		id: 'ararat',
		label: 'Ararat Province',
		children: [
			{ id: 'artashat', label: 'Artashat', parent: 'ararat' },
			{ id: 'ararat-city', label: 'Ararat', parent: 'ararat' },
			{ id: 'masis', label: 'Masis', parent: 'ararat' }
		]
	},
	{
		id: 'vayots-dzor',
		label: 'Vayots Dzor Province',
		children: [
			{ id: 'yeghegnadzor', label: 'Yeghegnadzor', parent: 'vayots-dzor' },
			{ id: 'vayk', label: 'Vayk', parent: 'vayots-dzor' },
			{ id: 'jermuk', label: 'Jermuk', parent: 'vayots-dzor' }
		]
	},
	{
		id: 'syunik',
		label: 'Syunik Province',
		children: [
			{ id: 'kapan', label: 'Kapan', parent: 'syunik' },
			{ id: 'goris', label: 'Goris', parent: 'syunik' },
			{ id: 'sisian', label: 'Sisian', parent: 'syunik' },
			{ id: 'meghri', label: 'Meghri', parent: 'syunik' }
		]
	}
];

interface Province {
	id: string;
	label: string;
	isProvince: true;
}

interface City {
	id: string;
	label: string;
	parent: string;
	isProvince: false;
}

type Location = Province | City;

const flattenedLocations: Location[] = locationData.flatMap(province => [
	{ id: province.id, label: province.label, isProvince: true },
	...province.children.map(city => ({
		id: city.id,
		label: city.label,
		parent: city.parent,
		isProvince: false
	}))
]);

interface LocationSelectorProps {
	onChange?: (locations: string[]) => void;
	className?: string;
}

export const LocationSelector = ({
	onChange,
	className
}: LocationSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

	const handleSelect = (locationId: string) => {
		const newSelectedLocations = selectedLocations.includes(locationId)
			? selectedLocations.filter(id => id !== locationId)
			: [...selectedLocations, locationId];

		setSelectedLocations(newSelectedLocations);
		onChange?.(newSelectedLocations);
	};

	const clearSelections = () => {
		setSelectedLocations([]);
		onChange?.([]);
	};

	const getLocationLabel = (id: string) => {
		const location = flattenedLocations.find(loc => loc.id === id);
		if (!location) return id;

		if (!location.isProvince && location.parent) {
			const parent = flattenedLocations.find(loc => loc.id === location.parent);
			return `${location.label}, ${parent?.label}`;
		}

		return location.label;
	};

	return (
		<div className={cn('space-y-2', className)}>
			<div className="flex items-center justify-between">
				<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Location
				</label>
				{selectedLocations.length > 0 && (
					<Button
						variant="ghost"
						onClick={clearSelections}
						className="h-auto p-0 text-xs text-muted-foreground"
					>
						Clear all
					</Button>
				)}
			</div>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between font-normal"
					>
						<div className="flex items-center gap-1 truncate">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							{selectedLocations.length > 0
								? `${selectedLocations.length} location${selectedLocations.length > 1 ? 's' : ''} selected`
								: 'Select location'}
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0" align="start">
					<Command>
						<CommandInput placeholder="Search locations..." />
						<CommandList className="max-h-[300px]">
							<CommandEmpty>No location found.</CommandEmpty>
							{locationData.map(province => (
								<CommandGroup key={province.id} heading={province.label}>
									{province.children.map(city => (
										<CommandItem
											key={city.id}
											value={city.id}
											onSelect={() => handleSelect(city.id)}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													selectedLocations.includes(city.id)
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{city.label}
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{selectedLocations.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{selectedLocations.map(id => (
						<Badge
							key={id}
							variant="secondary"
							className="flex items-center gap-1"
						>
							<MapPin className="h-3 w-3" />
							{getLocationLabel(id)}
							<Button
								variant="ghost"
								onClick={() => handleSelect(id)}
								className="ml-1 h-auto p-0"
							>
								<X className="h-3 w-3" />
								<span className="sr-only">Remove {getLocationLabel(id)}</span>
							</Button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
};
