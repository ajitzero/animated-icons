import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-circle-question-mark',
	template: `
		<svg
			class="circle-question-mark-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:g [class.animate-path]="isHovered()">
				<svg:path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
				<svg:path d="M12 17h.01" />
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
		'aria-label': 'circle-question-mark',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleQuestionMarkIcon {
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
