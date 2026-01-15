import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-between-vertical-start',
	template: `
		<svg
			class="between-vertical-start-icon"
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
			<svg:rect class="rect-left" width="7" height="13" x="3" y="8" rx="1" />
			<svg:path class="arrow" d="m15 2-3 3-3-3" />
			<svg:rect class="rect-right" width="7" height="13" x="14" y="8" rx="1" />
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
			transform: translateY(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-vertical-start',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetweenVerticalStartIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
