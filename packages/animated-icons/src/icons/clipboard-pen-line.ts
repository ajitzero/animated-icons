import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-clipboard-pen-line',
	template: `
		<svg
			class="clipboard-pen-line-icon"
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
			<svg:rect width="8" height="4" x="8" y="2" rx="1" />
			<svg:path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
			<svg:path d="M16 4h2a2 2 0 0 1 1.73 1" />
			<svg:path class="clipboard-line" d="M8 18h1" />
			<svg:path
				class="clipboard-pen"
				d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.clipboard-pen-line-icon {
			overflow: visible;
		}

		.clipboard-pen {
			transform-origin: 19.876px 11.124px;
			transition: transform 0.25s ease-in-out;
		}

		.clipboard-pen-line-icon.animate .clipboard-pen {
			animation: penWiggle 0.5s ease-in-out 2;
		}

		@keyframes penWiggle {
			0%,
			100% {
				transform: rotate(0deg) translate(0px, 0px);
			}
			25% {
				transform: rotate(-0.3deg) translate(-0.5px, 1px);
			}
			50% {
				transform: rotate(0.2deg) translate(1px, -0.5px);
			}
			75% {
				transform: rotate(-0.4deg) translate(0px, 0px);
			}
		}

		.clipboard-line {
			transition: d 0.5s ease-in-out;
		}

		.clipboard-pen-line-icon.animate .clipboard-line {
			d: path('M8 18h5');
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clipboard-pen-line',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardPenLineIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
