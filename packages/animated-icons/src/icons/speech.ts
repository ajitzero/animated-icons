import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-speech',
	template: `
		<svg
			class="speech-icon"
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
				class="speech-bubble"
				d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
			/>
			<svg:path class="speech-level speech-line-1" d="M17 15a3.5 3.5 0 0 0-.025-4.975" />
			<svg:path class="speech-level speech-line-2" d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.speech-icon {
			overflow: visible;
		}

		.speech-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.speech-icon.animate .speech-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.speech-icon.animate .speech-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.speech-icon.animate .speech-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'speech',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechIcon {
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
