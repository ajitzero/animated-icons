import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-plus',
	template: `
		<svg
			class="plus-icon"
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
			<svg:path class="horizontal" d="M5 12h14" />
			<svg:path class="vertical" d="M12 5v14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.plus {
			overflow: visible;
		}

		.horizontal,
		.vertical {
			stroke-dasharray: 14;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.plus.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.plus.animate .vertical {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards; /* Start shortly before horizontal ends */
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
		'aria-label': 'plus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusIcon {
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
