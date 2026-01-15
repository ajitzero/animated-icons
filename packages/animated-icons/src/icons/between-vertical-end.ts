import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-between-vertical-end',
	template: `
		<svg
			class="between-vertical-end-icon"
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
			<svg:rect class="rect-left" width="7" height="13" x="3" y="3" rx="1" />
			<svg:path class="arrow" d="m9 22 3-3 3 3" />
			<svg:rect class="rect-right" width="7" height="13" x="14" y="3" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rect-left {
			transition: all 0.15s ease-in;
		}

		.rect-left.animate {
			transform: translateX(-1px);
		}

		.rect-right {
			transition: all 0.15s ease-in;
		}

		.rect-right.animate {
			transform: translateX(1px);
		}

		.arrow {
			transition: all 0.15s ease-in;
		}

		.arrow.animate {
			transform: translateY(-2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-vertical-end',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetweenVerticalEndIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
