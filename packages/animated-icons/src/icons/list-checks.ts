import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-list-checks',
	template: `
		<svg
			class="list-checks-icon"
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
			<svg:path class="check-path" d="M3 17l2 2 4-4" />
			<svg:path class="check-path" d="M3 7l2 2 4-4" />
			<svg:path d="M13 6h8" />
			<svg:path d="M13 12h8" />
			<svg:path d="M13 18h8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.list-checks-icon {
			overflow: visible;
		}

		.check-path {
			stroke-dasharray: 9;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}

		.list-checks-icon.animate .check-path {
			animation: checkAnimation 0.5s ease-out backwards;
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
		'aria-label': 'list-checks',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListChecksIcon {
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
