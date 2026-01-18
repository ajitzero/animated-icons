import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-infinity',
	template: `
		<svg
			class="infinity-icon"
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
			<svg:path
				class="line"
				d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.infinity-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 28;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 1s ease-in-out;
		}

		.infinity-icon.animate .line {
			animation: lineAnimation 1s ease-in-out;
		}

		@keyframes lineAnimation {
			0% {
				stroke-dashoffset: 28;
			}
			15% {
				stroke-dashoffset: 28;
			}
			100% {
				stroke-dashoffset: 56;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'infinity',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfinityIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
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
