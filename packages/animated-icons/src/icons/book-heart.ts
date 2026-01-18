import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-book-heart',
	template: `
		<svg
			class="book-heart-icon"
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
			<svg:path
				d="M16 8.2A2.22 2.22 0 0 0 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9A2.22 2.22 0 0 0 8 8.2c0 .6.3 1.2.7 1.6A226.652 226.652 0 0 0 12 13a404 404 0 0 0 3.3-3.1 2.413 2.413 0 0 0 .7-1.7"
			/>
			<svg:path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-heart-icon {
			overflow: visible;
		}

		.book-heart-icon.animate {
			animation: bookAnimation 0.6s ease-in-out;
		}

		@keyframes bookAnimation {
			0% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
			20% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			50% {
				transform: scale(1.04) rotate(8deg) translateY(-2px);
			}
			80% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			100% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-heart',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookHeartIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
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
