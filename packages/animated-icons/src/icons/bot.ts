import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-bot',
	template: `
		<svg
			class="bot-icon"
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
			<svg:path d="M12 8V4H8" />
			<svg:rect width="16" height="12" x="4" y="8" rx="2" />
			<svg:path d="M2 14h2" />
			<svg:path d="M20 14h2" />
			<svg:line class="eye-right" x1="15" y1="{eyeY1}" x2="15" y2="{eyeY2}" />
			<svg:line class="eye-left" x1="9" y1="{eyeY1}" x2="9" y2="{eyeY2}" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bot-icon {
			overflow: visible;
		}

		.eye-left,
		.eye-right {
			transition: none;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bot',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotIcon {
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
