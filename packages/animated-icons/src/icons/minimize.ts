import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-minimize',
	template: `
		<svg
			class="minimize-icon"
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
			<svg:path [class.top-left]="isAnimating()" d="M8 3v3a2 2 0 0 1-2 2H3" />
			<svg:path [class.top-right]="isAnimating()" d="M21 8h-3a2 2 0 0 1-2-2V3" />
			<svg:path [class.bottom-left]="isAnimating()" d="M3 16h3a2 2 0 0 1 2 2v3" />
			<svg:path [class.bottom-right]="isAnimating()" d="M16 21v-3a2 2 0 0 1 2-2h3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.bottom-right {
			transform: translate(-1px, -1px);
		}

		.top-left {
			transform: translate(1px, 1px);
		}

		.bottom-left {
			transform: translate(1px, -1px);
		}

		.top-right {
			transform: translate(-1px, 1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'minimize',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimizeIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
