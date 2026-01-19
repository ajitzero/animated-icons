import { Component, computed, effect, inject, input, isDevMode, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { IconCard } from './icon-card';
import type { IconItem } from './icon-item.type';
import { ICONS_LIST } from './icon-list.const';
import { Search } from './search';

@Component({
	selector: 'docs-explorer',
	template: `
		<docs-search [(value)]="searchTerm" [status]="iconCountMessage()" [placeholder]="searchPlaceholder()" />

		<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
		@if (isDevMode) {
			<label class="flex items-center" hlmLabel>
				<hlm-switch class="mr-2" [(checked)]="includeWip" />
				@if (includeWip()) {
					Including WIP icons
				} @else {
					Excluding WIP icons
				}
			</label>
		}

		@let icons = filteredIcons();

		@if (icons.length === 0) {
			<div class="bg-background mx-4 my-2 sm:mx-0" hlmEmpty>
				<div hlmEmptyHeader>
					<div hlmEmptyTitle>No icons matched</div>
					<div hlmEmptyDescription>
						There are no icons for
						@for (term of cleanSearchTerms(); track $index; let first = $first, last = $last) {
							@if (last) {
								<span> or </span>
							} @else {
								@if (!first) {
									<span>, </span>
								}
							}
							<strong [class.-mr-1]="last">"{{ term }}"</strong>
						}
						. Please try searching by other names.
					</div>
				</div>
				<div hlmEmptyContent>
					<div class="flex gap-2">
						<button (click)="searchTerm.set('')" hlmBtn>Clear Search</button>
					</div>
				</div>
			</div>
		} @else {
			<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1 py-2">
				@for (icon of icons; track icon.name) {
					<docs-icon-card [class.hidden]="!includeWip() && icon.wip" [icon]="icon" />
				}
			</div>
		}
	`,
	host: {
		class: 'flex flex-col items-center gap-4 min-h-96',
	},
	imports: [
		FormsModule,
		HlmButtonImports,
		HlmEmptyImports,
		HlmInputImports,
		HlmLabelImports,
		HlmSwitchImports,
		HlmIconImports,
		IconCard,
		Search,
	],
})
export class Explorer {
	private readonly router = inject(Router);
	readonly isDevMode = isDevMode();

	search = input('');
	searchTerm = linkedSignal(() => this.search());
	includeWip = signal(this.isDevMode);

	icons = signal<IconItem[]>(ICONS_LIST);

	cleanSearchTerms = computed(() => {
		return this.searchTerm()
			.split(',')
			.map((term) => this.cleanString(term))
			.filter(Boolean);
	});

	availableIcons = computed(() => this.icons().filter((icon) => this.includeWip() || !icon.wip));

	filteredIcons = computed(() => {
		const searchTerms = this.cleanSearchTerms();
		const icons = this.availableIcons();

		if (!searchTerms.length) {
			return icons;
		}

		return icons.filter((icon) => searchTerms.some((term) => icon.name.includes(term)));
	});

	searchPlaceholder = computed(() => `Search ${this.availableIcons().length} icons...`);

	iconCountMessage = computed(() => {
		const icons = this.availableIcons();
		const filteredIcons = this.filteredIcons();
		if (icons.length === filteredIcons.length) {
			return `${icons.length} icons`;
		}

		return `${filteredIcons.length}/${icons.length} icons`;
	});

	private cleanString(value: string) {
		return value.trim().toLowerCase();
	}

	constructor() {
		effect((onCleanup) => {
			const terms = this.cleanSearchTerms();
			const timeout = setTimeout(() => {
				this.router.navigate([], {
					queryParams: { search: terms || null },
					queryParamsHandling: 'merge',
					replaceUrl: true,
				});
			}, 300);

			onCleanup(() => clearTimeout(timeout));
		});
	}
}
