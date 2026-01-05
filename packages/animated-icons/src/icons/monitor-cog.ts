import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-monitor-cog',
	template: `
		<svg
			class="monitor-cog-icon"
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
			<svg:path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
			<svg:path d="M8 21h8" />
			<svg:path d="M12 17v4" />
			<svg:g class="cog-group">
				<svg:path d="m15.2 4.9-.9-.4" />
				<svg:path d="m15.2 7.1-.9.4" />
				<svg:path d="m16.9 3.2-.4-.9" />
				<svg:path d="m16.9 8.8-.4.9" />
				<svg:path d="m19.5 2.3-.4.9" />
				<svg:path d="m19.5 9.7-.4-.9" />
				<svg:path d="m21.7 4.5-.9.4" />
				<svg:path d="m21.7 7.5-.9-.4" />
				<svg:circle cx="18" cy="6" r="3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-group {
			transform-origin: 18px 6px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'monitor-cog',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorCogIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		this.isHovered.set(true);
	}

	handleMouseLeave() {
		this.isHovered.set(false);
	}
}
