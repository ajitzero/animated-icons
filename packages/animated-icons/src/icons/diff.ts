import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-diff',
	template: `
		<svg
			class="diff-icon"
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
			<svg:path class="vertical" d="M12 3v14" />
			<svg:path class="horizontal-top" d="M5 10h14" />
			<svg:path class="horizontal-bottom" d="M5 21h14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.diff {
			overflow: visible;
		}

		.vertical,
		.horizontal-top,
		.horizontal-bottom {
			stroke-dasharray: 14;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.diff.animate .vertical {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards;
		}

		.diff.animate .horizontal-top {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.diff.animate .horizontal-bottom {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.5s forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 14;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 14;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'diff',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
