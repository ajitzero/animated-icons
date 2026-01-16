import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-mouse-pointer',
	template: `
		<svg
			class="mouse-pointer-icon"
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
			<svg:path d="M12.586 12.586 19 19" />
			<svg:path
				d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.mouse-pointer-icon {
			overflow: visible;
		}

		.mouse-pointer-icon.animate {
			animation: mouseMove 1s ease;
		}

		@keyframes mouseMove {
			0%,
			100% {
				transform: translate(0, 0);
			}
			25% {
				transform: translate(0, -4px);
			}
			75% {
				transform: translate(-3px, 0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'mouse-pointer',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePointerIcon {
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
