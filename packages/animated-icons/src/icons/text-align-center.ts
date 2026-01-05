import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-text-align-center',
	template: `
		<svg
			class="text-align-center-icon"
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
			<svg:path [class.animate-path]="isHovered()" d="M17 12H7" />
			<svg:path d="M19 18H5" />
			<svg:path d="M21 6H3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.animate-path {
			animation: translateAnimation 1s linear;
		}

		@keyframes translateAnimation {
			0% {
				transform: translateX(0);
			}
			20% {
				transform: translateX(3px);
			}
			40% {
				transform: translateX(-3px);
			}
			60% {
				transform: translateX(2px);
			}
			100% {
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'text-align-center',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAlignCenterIcon {
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
