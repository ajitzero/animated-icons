import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-text-search',
	template: `
		<svg
			class="text-search-icon"
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
			<svg:path class="line top" d="M21 5H3" />
			<svg:g class="text-group">
				<svg:path class="line middle" d="M10 12H3" />
				<svg:path class="line bottom" d="M10 19H3" />
			</svg:g>

			<svg:g class="magnifier">
				<svg:circle cx="17" cy="15" r="3" />
				<svg:path d="m21 19-1.9-1.9" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.text-search-icon {
			overflow: visible;
		}

		.line {
			transition: opacity 0.1s ease-out;
		}
		.top,
		.middle,
		.bottom {
			transform-origin: left center;
		}

		.magnifier {
			transform-origin: 17px 15px;
		}
		.text-search-icon.animate .magnifier {
			animation: search-bounce 1s ease-in-out;
		}

		.text-search-icon.animate .top {
			animation: line-shrink-top 1s ease-in-out;
		}
		.text-search-icon.animate .middle {
			animation: line-shrink-mid 1s ease-in-out;
		}
		.text-search-icon.animate .bottom {
			animation: line-shrink-bot 1s ease-in-out 0.05s;
		}

		@keyframes search-bounce {
			0%,
			100% {
				transform: translateX(0) translateY(0);
			}
			25% {
				transform: translateX(0) translateY(-4px);
			}
			50% {
				transform: translateX(-3px) translateY(0);
			}
		}

		@keyframes line-shrink-mid {
			0%,
			25%,
			100% {
				transform: scaleX(1);
			}
			50% {
				transform: scaleX(0.7);
			}
		}
		@keyframes line-shrink-bot {
			0%,
			30%,
			100% {
				transform: scaleX(1);
			}
			50% {
				transform: scaleX(0.8);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'text-search',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSearchIcon {
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
