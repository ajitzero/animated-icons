import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-anvil',
	template: `
		<svg
			class="anvil-icon"
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
			<svg:path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
			<svg:path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
			<svg:path d="M9 12v5" />
			<svg:path d="M15 12v5" />
			<svg:path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
		</svg>
	`,
	styles: `
		.anvil-icon {
			transform-origin: top center;
			animation: none;
		}

		.anvil-icon.animate {
			animation: fallFromTop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform: translateY(-50px);
			animation-delay: 0.3s;
		}

		@keyframes fallFromTop {
			0% {
				transform: translateY(-50px);
			}
			100% {
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'anvil',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnvilIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
