import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-ship-wheel',
	template: `
		<svg
			class="ship-wheel-icon"
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
			<svg:circle cx="12" cy="12" r="8" />
			<svg:path d="M12 2v7.5" />
			<svg:path d="m19 5-5.23 5.23" />
			<svg:path d="M22 12h-7.5" />
			<svg:path d="m19 19-5.23-5.23" />
			<svg:path d="M12 14.5V22" />
			<svg:path d="M10.23 13.77 5 19" />
			<svg:path d="M9.5 12H2" />
			<svg:path d="M10.23 10.23 5 5" />
			<svg:circle cx="12" cy="12" r="2.5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.ship-wheel-icon {
			transition: transform 0.75s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}

		.ship-wheel-icon.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'ship-wheel',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipWheelIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
