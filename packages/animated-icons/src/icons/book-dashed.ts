import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-book-dashed',
	template: `
		<svg
			class="book-dashed-icon"
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
			<svg:path d="M12 17h1.5" />
			<svg:path d="M12 22h1.5" />
			<svg:path d="M12 2h1.5" />
			<svg:path d="M17.5 22H19a1 1 0 0 0 1-1" />
			<svg:path d="M17.5 2H19a1 1 0 0 1 1 1v1.5" />
			<svg:path d="M20 14v3h-2.5" />
			<svg:path d="M20 8.5V10" />
			<svg:path d="M4 10V8.5" />
			<svg:path d="M4 19.5V14" />
			<svg:path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8" />
			<svg:path d="M8 22H6.5a1 1 0 0 1 0-5H8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-dashed-icon {
			overflow: visible;
		}

		.book-dashed-icon.animate {
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
		'aria-label': 'book-dashed',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDashedIcon {
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
