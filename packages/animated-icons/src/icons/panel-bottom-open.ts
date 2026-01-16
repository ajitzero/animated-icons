import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-panel-bottom-open',
	template: `
		<svg
			class="panel-bottom-open-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path [class.line]="isAnimating()" d="M3 15h18" />
			<svg:path [class.chevron]="isAnimating()" d="m9 10 3-3 3 3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.panel-bottom-open-icon path {
			transition: all 0.2s ease-in-out;
		}

		.panel-bottom-open-icon .line {
			transform: translateY(-2px);
			transition-delay: 0.05s;
		}

		.panel-bottom-open-icon .chevron {
			transform: translateY(-2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'panel-bottom-open',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelBottomOpenIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 300);
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
