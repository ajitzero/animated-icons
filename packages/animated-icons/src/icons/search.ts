import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-search',
	template: `
		<svg
			class="search-icon"
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
			<svg:circle cx="11" cy="11" r="8" />
			<svg:path d="m21 21-4.3-4.3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.search-icon {
			transition:
				transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				transform 1s ease-in-out;
		}

		.search-icon.animate {
			animation: search-bounce 1s ease-in-out;
		}

		@keyframes search-bounce {
			0%,
			100% {
				transform: translateX(0) translateY(0);
			}
			25% {
				transform: translateX(0) translateY(-4px);
			}
			50% {
				transform: translateX(-3px) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'search',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1000);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
