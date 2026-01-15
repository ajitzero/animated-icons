import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-arrow-left-right',
	template: `
		<svg
			class="arrow-left-right-icon"
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
			<svg:path class="left-arrow" d="M8 3L4 7l4 4" />
			<svg:path class="left-arrow" d="M4 7h16" />
			<svg:path class="right-arrow" d="M16 21l4-4-4-4" />
			<svg:path class="right-arrow" d="M20 17H4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.left-arrow,
		.right-arrow {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.left-arrow.animate {
			animation: moveLeft 0.5s;
		}

		.right-arrow.animate {
			animation: moveRight 0.5s;
		}

		@keyframes moveLeft {
			0%,
			100% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(-3px);
			}
		}

		@keyframes moveRight {
			0%,
			100% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(3px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-left-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowLeftRightIcon {
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
