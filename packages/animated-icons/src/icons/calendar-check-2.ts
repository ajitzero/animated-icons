import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-calendar-check-2',
	template: `
		<svg
			class="calendar-check-2-icon"
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
			<svg:path d="M8 2v4" />
			<svg:path d="M16 2v4" />
			<svg:path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
			<svg:path d="M3 10h18" />
			<svg:path class="check-path" d="m16 20 2 2 4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.calendar-check-2-icon {
			overflow: visible;
		}
		.check-path {
			stroke-dasharray: 9;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}
		.calendar-check-2-icon.animate .check-path {
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
		'aria-label': 'calendar-check-2',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCheck2Icon {
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
