import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-telescope',
	template: `
		<svg
			class="telescope-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:g class="telescope-icon">
				<svg:path
					d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"
				/>
				<svg:path d="m13.56 11.747 4.332-.924" />
				<svg:path
					d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"
				/>
				<svg:path d="m6.158 8.633 1.114 4.456" />
			</svg:g>

			<svg:path d="m16 21-3.105-6.21" />
			<svg:path d="m8 21 3.105-6.21" />
			<svg:circle cx="12" cy="13" r="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.telescope-icon {
			transform-origin: center;
			transition: transform 0.3s ease-in-out;
		}

		.telescope-icon.animate {
			transform: rotate(-15deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'telescope',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelescopeIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
