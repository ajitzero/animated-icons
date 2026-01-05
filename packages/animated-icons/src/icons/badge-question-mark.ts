import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-badge-question-mark',
	template: `
		<svg
			class="badge-question-mark-icon"
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
			<svg:path
				d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
			/>
			<svg:g [class.animate-path]="isHovered()">
				<svg:path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
				<svg:line x1="12" x2="12.01" y1="17" y2="17" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.animate-icon {
			transition: transform 0.5s ease-in-out;
		}

		.animate-path {
			transition: transform 0.5s ease-in-out;
			transform-origin: center;
			animation: rotateAnimation 0.5s ease-in-out;
		}

		@keyframes rotateAnimation {
			0% {
				transform: rotate(0deg);
			}
			20% {
				transform: rotate(-10deg);
			}
			40% {
				transform: rotate(10deg);
			}
			60% {
				transform: rotate(-10deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'badge-question-mark',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeQuestionMarkIcon {
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
