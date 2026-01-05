import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-blend',
	template: `
		<svg
			class="blend-icon"
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
			<svg:circle [class.top-left]="isHovered()" cx="9" cy="9" r="7" />
			<svg:circle [class.bottom-right]="isHovered()" cx="15" cy="15" r="7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		circle {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.top-left {
			transform: translate(1px, 1px);
		}
		.bottom-right {
			transform: translate(-1px, -1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'blend',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlendIcon {
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
