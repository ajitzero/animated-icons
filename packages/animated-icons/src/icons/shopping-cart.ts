import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-shopping-cart',
	template: `
		<svg
			class="shopping-cart-icon"
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
				d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.shopping-cart-icon {
			transition: transform 0.2s ease-in-out;
			transform-origin: center;
		}

		.shopping-cart-icon.animate {
			animation: cartBounce 0.8s ease-in-out;
		}

		@keyframes cartBounce {
			0%,
			100% {
				transform: scale(1) translateY(0);
			}
			25% {
				transform: scale(1.1) translateY(-5px);
			}
			50% {
				transform: scale(1) translateY(0);
			}
			75% {
				transform: scale(1.1) translateY(-5px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shopping-cart',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartIcon {
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
