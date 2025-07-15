<?php
declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\AdditionalFilesActions\Listener;

use OCA\AdditionalFilesActions\AppInfo\Application;
use OCA\AdditionalFilesActions\Service\UserConfig;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\AppFramework\Services\IInitialState;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Server;
use OCP\Util;

/** @template-implements IEventListener<LoadAdditionalScriptsEvent> */
class LoadAdditionalScripts implements IEventListener {
	public function __construct(
		private IInitialState $initialState,
		private UserConfig $userConfig,
	) {}

	public function handle(Event $event): void {
		if (!($event instanceof LoadAdditionalScriptsEvent)) {
			return;
		}

		$this->initialState->provideInitialState('config', $this->userConfig->getConfigs());
		Util::addStyle(Application::APP_ID, Application::APP_ID . '-style');
		Util::addScript(Application::APP_ID, Application::APP_ID . '-init');
	}
}
