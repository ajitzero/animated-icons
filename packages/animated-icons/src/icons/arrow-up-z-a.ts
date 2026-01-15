import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-arrow-up-z-a',
	template: `
		<svg
			class="arrow-up-z-a-icon"
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
			<svg:path d="m3 8 4-4 4 4" />
			<svg:path d="M7 4v16" />
			<svg:path class="swap-group-up" d="M15 4h5l-5 6h5" />
			<svg:g class="swap-group-down">
				<svg:path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
				<svg:path d="M20 18h-5" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.swap-group-up,
		.swap-group-down {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.swap-group-up.animate {
			transform: translateY(10px);
		}

		.swap-group-down.animate {
			transform: translateY(-10px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-up-z-a',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowUpZAIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
