/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// This is for private use only

type SettingOptions = {
	el: () => HTMLElement;
	open?: () => void;
	close?: () => void;
	order?: number;
};

interface Window {
	OCA: {
		Files: {
			Settings: {
				register: (setting: { el: () => HTMLElement }) => void
				Setting: new (name, { el, open, close }: SettingOptions) => SettingOptions
			}
		}
	}
}
