import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-between-horizontal-start',
	template: `
		<svg
			class="between-horizontal-start-icon"
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
			<svg:rect class="rect-top" width="13" height="7" x="8" y="3" rx="1" />
			<svg:path class="arrow" d="m2 9 3 3-3 3" />
			<svg:rect class="rect-bottom" width="13" height="7" x="8" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rect-top {
			transition: all 0.15s ease-in;
		}

		.rect-top.animate {
			transform: translateY(-1px);
		}

		.rect-bottom {
			transition: all 0.15s ease-in;
		}

		.rect-bottom.animate {
			transform: translateY(1px);
		}

		.arrow {
			transition: all 0.15s ease-in;
		}

		.arrow.animate {
			transform: translateX(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-horizontal-start',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetweenHorizontalStartIcon {
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
