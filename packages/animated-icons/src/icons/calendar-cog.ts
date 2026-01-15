import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-calendar-cog',
	template: `
		<svg
			class="calendar-cog-icon"
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
			<svg:path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
			<svg:path d="M16 2v4" />
			<svg:path d="M3 10h18" />
			<svg:path d="M8 2v4" />
			<svg:g class="cog-group" [class.animate]="isAnimating()">
				<svg:path d="m15.2 16.9-.9-.4" />
				<svg:path d="m15.2 19.1-.9.4" />
				<svg:path d="m16.9 15.2-.4-.9" />
				<svg:path d="m16.9 20.8-.4.9" />
				<svg:path d="m19.5 14.3-.4.9" />
				<svg:path d="m19.5 21.7-.4-.9" />
				<svg:path d="m21.7 16.5-.9.4" />
				<svg:path d="m21.7 19.5-.9-.4" />
				<svg:circle cx="18" cy="18" r="3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.calendar-cog-icon {
			overflow: visible;
		}

		.cog-group {
			transform-origin: 18px 18px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'calendar-cog',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCogIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
