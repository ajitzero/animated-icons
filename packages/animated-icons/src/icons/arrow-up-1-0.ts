import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-arrow-up-1-0',
	template: `
		<svg
			class="arrow-up-1-0-icon"
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
			<svg:path d="m3 8 4-4 4 4" />
			<svg:path d="M7 4v16" />
			<svg:g class="swap-group-up">
				<svg:path d="M17 10V4h-2" />
				<svg:path d="M15 10h4" />
			</svg:g>
			<svg:rect class="swap-group-down" x="15" y="14" width="4" height="6" ry="2" />
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
		'aria-label': 'arrow-up-1-0',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowUp10Icon {
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
