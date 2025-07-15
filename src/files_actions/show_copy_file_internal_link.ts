/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Node } from '@nextcloud/files'
import { FileAction } from '@nextcloud/files'
import { generateUrl, getBaseUrl } from '@nextcloud/router'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'

import ContentCopySvg from '@mdi/svg/svg/content-copy.svg?raw'

export const action = new FileAction({
	id: 'show_copy_file_internal_link',

	title(nodes: Node[]) {
		return t('additional_files_actions', 'Copy internal link for "{file}"', { file: nodes[0].basename })
	},

	// Empty string when rendered inline
	displayName: () => '',

	iconSvgInline: () => ContentCopySvg,

	enabled(nodes: Node[]) {
		if (nodes.length === 0) {
			return false
		}

		return nodes.every(node => node.fileid && node.fileid > 0)
	},

	// Copy link to clpboard
	async exec(node: Node) {
		const url = getBaseUrl() + generateUrl(`/f/${node.fileid}`)
		try {
			await navigator.clipboard.writeText(url)
			showSuccess(t('additional_files_actions', 'Internal link copied to clipboard'))
		} catch (error) {
			showError(t('additional_files_actions', 'Failed to copy internal link to clipboard'))
			console.error('Failed to copy internal link:', error)
		}
		return null
	},

	inline: () => true,

	order: 10,
})
