import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-check',
	template: `
		<svg
			class="check-icon"
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
			<svg:path class="check-path" d="M4 12l5 5L20 6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.check-icon {
			overflow: visible;
		}

		.check-path {
			stroke-dasharray: 24;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}

		.check-icon.animate .check-path {
			animation: checkAnimation 0.5s ease-out backwards;
		}

		@keyframes checkAnimation {
			0% {
				stroke-dashoffset: 24;
				opacity: 0;
			}
			33% {
				stroke-dashoffset: 24;
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
		'aria-label': 'check',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckIcon {
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
