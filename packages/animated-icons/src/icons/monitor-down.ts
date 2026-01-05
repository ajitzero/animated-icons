import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-monitor-down',
	template: `
		<svg
			class="monitor-down-icon"
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
			<svg:path d="M12 17v4" />
			<svg:path d="M8 21h8" />
			<svg:rect width="20" height="14" x="2" y="3" rx="2" />
			<svg:g>
				<svg:path d="M12 13V7" />
				<svg:path d="m15 10-3 3-3-3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		g.animate path {
			transform: translateY(2px);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
		g path {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'monitor-down',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorDownIcon {
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
