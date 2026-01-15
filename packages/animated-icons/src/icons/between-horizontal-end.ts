import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-between-horizontal-end',
	template: `
		<svg
			class="between-horizontal-end-icon"
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
			<svg:rect class="rect-top" width="13" height="7" x="3" y="3" rx="1" />
			<svg:path class="arrow" d="m22 15-3-3 3-3" />
			<svg:rect class="rect-bottom" width="13" height="7" x="3" y="14" rx="1" />
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
			transform: translateX(-2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-horizontal-end',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetweenHorizontalEndIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
