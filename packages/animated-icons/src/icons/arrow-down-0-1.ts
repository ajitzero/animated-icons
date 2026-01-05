import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-arrow-down-0-1',
	template: `
		<svg
			class="arrow-down-0-1-icon"
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
			<svg:path d="m3 16 4 4 4-4" />
			<svg:path d="M7 20V4" />
			<svg:rect class="swap-group-up" x="15" y="4" width="4" height="6" ry="2" />
			<svg:g class="swap-group-down">
				<svg:path d="M17 20v-6h-2" />
				<svg:path d="M15 20h4" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.swap-group-up,
		.swap-group-down {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.swap-group-up.animate {
			transform: translateY(10px);
		}

		.swap-group-down.animate {
			transform: translateY(-10px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-down-0-1',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowDown01Icon {
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
