import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-signature',
	template: `
		<svg
			class="signature-icon"
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
				d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"
			/>
			<svg:path d="M3 21h18" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.signature-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 53;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease-out,
				opacity 0.3s ease-out;
		}

		.signature-icon.animate .line {
			animation: lineAnimation 0.6s ease-in;
		}

		@keyframes lineAnimation {
			0% {
				stroke-dashoffset: 53;
			}
			15% {
				stroke-dashoffset: 53;
			}
			100% {
				stroke-dashoffset: 106;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'signature',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignatureIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
