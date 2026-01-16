import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-clipboard-pen',
	template: `
		<svg
			class="clipboard-pen-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:rect width="8" height="4" x="8" y="2" rx="1" />
			<svg:path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
			<svg:path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
			<svg:path
				class="pen"
				[class.animate]="isAnimating()"
				d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.clipboard-pen-icon {
			overflow: visible;
		}

		.pen {
			transform-origin: 13.378px 15.626px;
			transition: transform 0.25s ease-in-out;
		}

		.pen.animate {
			animation: penWiggle 0.5s ease-in-out 2;
		}

		@keyframes penWiggle {
			0%,
			100% {
				transform: rotate(0deg) translate(0px, 0px);
			}
			25% {
				transform: rotate(-0.5deg) translate(-1px, 1.5px);
			}
			75% {
				transform: rotate(0.5deg) translate(1.5px, -1px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clipboard-pen',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardPenIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1000);
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
