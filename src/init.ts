/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { createApp } from 'vue'
import { loadState } from '@nextcloud/initial-state'
import { registerFileAction } from '@nextcloud/files'

import logger from './logger.ts'
import Settings from './Settings.vue'

import { action as showCopyFileInternalLinkAction } from './files_actions/show_copy_file_internal_link.ts'

export type UserConfig = {
	[key: string]: boolean
	show_copy_file_internal_link: boolean
	show_folder_description_inline: boolean
}

// Create settings
const SettingsApp = createApp(Settings)
const container = document.createElement('div')
SettingsApp.mount(container)
	
window.addEventListener('DOMContentLoaded', async () => {
	// Register Files App Settings
	if (window?.OCA?.Files?.Settings) {
		// Register the settings view with the Files app
		window.OCA.Files.Settings.register(new window.OCA.Files.Settings.Setting('additional_files_actions', {
			el: () => { return container },
			order: 999, // Ensure it appears at the end of the settings list
		}))

		return
	}

	logger.error('OCA.Files.Settings is not available. Ensure the Files app is loaded before this script.')
})

const userConfig = loadState<UserConfig>('additional_files_actions', 'userConfig', {
	show_copy_file_internal_link: true,
	show_folder_description_inline: true,
})

Object.keys(userConfig).forEach((key) => {
	if (key === 'show_copy_file_internal_link' && userConfig[key]) {
		registerFileAction(showCopyFileInternalLinkAction)
		logger.info(`Registered ${key} action`)
	}
})
