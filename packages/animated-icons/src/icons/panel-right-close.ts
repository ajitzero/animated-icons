import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-panel-right-close',
	template: `
		<svg
			class="panel-right-close-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path [class.line]="isHovered()" d="M15 3v18" />
			<svg:path [class.chevron]="isHovered()" d="m8 9 3 3-3 3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: all 0.2s ease-in;
		}

		.line {
			transform: translateX(2px);
			transition-delay: 0.05s;
		}

		.chevron {
			transform: translateX(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'panel-right-close',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelRightCloseIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
