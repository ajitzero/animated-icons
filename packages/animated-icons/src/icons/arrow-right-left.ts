import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-arrow-right-left',
	template: `
		<svg
			class="arrow-right-left-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path class="right-arrow" d="M16 3l4 4-4 4" />
			<svg:path class="right-arrow" d="M20 7H4" />
			<svg:path class="left-arrow" d="M8 21l-4-4 4-4" />
			<svg:path class="left-arrow" d="M4 17h16" />
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
		'aria-label': 'arrow-right-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowRightLeftIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
