import { createAppConfig } from '@nextcloud/vite-config'

export default createAppConfig({
    init: 'src/init.ts',
}, {
	config: {
		build: {
			cssCodeSplit: false,
		},
	},
})
