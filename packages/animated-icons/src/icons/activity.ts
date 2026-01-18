import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-activity-icon',
	template: `
		<svg
			class="activity-icon"
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
				class="activity-path"
				d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.activity-icon {
			overflow: visible;
		}

		.activity-path {
			stroke-dasharray: 50;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.4s ease-in-out,
				opacity 0.1s ease-in-out;
		}

		.activity-icon.animate .activity-path {
			animation: drawPath 0.6s ease-in-out forwards;
		}

		@keyframes drawPath {
			0% {
				stroke-dashoffset: 50;
			}
			15% {
				stroke-dashoffset: 50;
			}
			100% {
				stroke-dashoffset: 100;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'(mouseenter)': 'handleMouseEnter()',
		'aria-label': 'activity',
		role: 'img',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 600);
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
