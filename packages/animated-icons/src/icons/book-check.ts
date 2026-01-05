import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-book-check',
	template: `
		<svg
			class="book-check-icon"
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
			<svg:path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
			<svg:path class="check-path" d="m9 9.5 2 2 4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-check-icon {
			overflow: visible;
		}
		.check-path {
			stroke-dasharray: 9;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}

		.book-check-icon.animate {
			animation: bookAnimation 0.6s ease forwards;
		}

		.book-check-icon.animate .check-path {
			animation: checkAnimation 0.5s ease-out backwards;
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
		@keyframes checkAnimation {
			0% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			33% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-check',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCheckIcon {
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
