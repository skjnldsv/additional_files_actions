<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<section id="settings-section_additional-files-actions"
		aria-labelledby="settings-section_additional-files-actions-label"
		class="app-settings-section">
		<h4 id="settings-section_additional-files-actions-label" class="app-settings-section__name">Additional Files actions</h4>
		
		<NcCheckboxRadioSwitch
			v-model="userConfig.show_copy_file_internal_link"
			@update:modelValue="setConfig('show_copy_file_internal_link', $event)">
			{{ t('additional_files_actions', 'Show file internal link inline copy button') }}
		</NcCheckboxRadioSwitch>

		<NcCheckboxRadioSwitch
			v-model="userConfig.show_folder_description_inline"
			@update:modelValue="setConfig('show_folder_description_inline', $event)">
			{{ t('additional_files_actions', 'Show inline folder descriptions') }}
		</NcCheckboxRadioSwitch>
	</section>
</template>

<script lang="ts">
import type { UserConfig } from './init'

import { defineComponent } from 'vue'
import { generateUrl } from '@nextcloud/router'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import logger from './logger'

const userConfig = loadState<UserConfig>('additional_files_actions', 'userConfig', {
	show_copy_file_internal_link: true,
	show_folder_description_inline: true,
})

export default defineComponent({
	name: 'Settings',
	components: {
		NcCheckboxRadioSwitch,
	},

	setup() {
		return {
			t,
		}
	},

	data() {
		return {
			userConfig,
		}
	},

	methods: {
		async setConfig(key: string, value: boolean) {
			const apiUrl = generateUrl('/apps/additional_files_actions/api/v1/config/')
			try {
				axios.put(apiUrl + key, { value })
			} catch (error) {
				logger.error('Failed to set config:', { key, value, error })
			}
		},
	},
})
</script>
