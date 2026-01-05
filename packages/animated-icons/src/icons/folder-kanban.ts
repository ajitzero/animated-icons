import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-folder-kanban',
	template: `
		<svg
			class="folder-kanban-icon"
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
			<svg:path
				d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
			/>
			<svg:path class="column column-0" d="M8 10v4" />
			<svg:path class="column column-1" d="M12 10v2" />
			<svg:path class="column column-2" d="M16 10v6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.folder-kanban-icon {
			overflow: visible;
		}

		.column {
			stroke-dasharray: 20;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.folder-kanban-icon.animate .column {
			animation: columnAnimation 0.6s ease forwards;
		}

		.folder-kanban-icon.animate .column-0 {
			animation-delay: 0s;
		}

		.folder-kanban-icon.animate .column-1 {
			animation-delay: 0.1s;
		}

		.folder-kanban-icon.animate .column-2 {
			animation-delay: 0.2s;
		}

		@keyframes columnAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 20;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'folder-kanban',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderKanbanIcon {
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
