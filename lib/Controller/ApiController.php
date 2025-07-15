<?php
declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\AdditionalFilesActions\Controller;

use OCA\AdditionalFilesActions\Service\UserConfig;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-import-type FilesFolderTree from ResponseDefinitions
 *
 * @package OCA\Files\Controller
 */
class ApiController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private UserConfig $userConfig,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Set a user config
	 *
	 * @param string $key
	 * @param string|bool $value
	 * @return JSONResponse
	 */
	#[NoAdminRequired]
	#[FrontpageRoute(verb: 'PUT', url: '/api/v1/config/{key}')]
	public function setConfig(string $key, $value): JSONResponse {
		try {
			$this->userConfig->setConfig($key, (string)$value);
		} catch (\InvalidArgumentException $e) {
			return new JSONResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
		}

		return new JSONResponse(['message' => 'ok', 'data' => ['key' => $key, 'value' => $value]]);
	}


	/**
	 * Get the user config
	 *
	 * @return JSONResponse
	 */
	#[NoAdminRequired]
	#[FrontpageRoute(verb: 'GET', url: '/api/v1/config')]
	public function getConfigs(): JSONResponse {
		return new JSONResponse(['message' => 'ok', 'data' => $this->userConfig->getConfigs()]);
	}
}
