import Request from '../features/request'

import URI from 'urijs'

export default class Standalone
{
	init(global) {
		this.global = global
		this.requests = global.$requests
		this.authentication = global.$authentication
		this.profiler = global.$profiler
		this.settings = global.$settings

		this.lastPolledId = null

		this.useProperTheme()
		this.setMetadataUrl()
		this.setMetadataClient()

		this.loadRequestFromUri()
		this.startPollingRequests()
		this.throttlePolling()
	}

	useProperTheme() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.settings.defaultAppearance = 'dark'
		}
	}

	setMetadataUrl() {
		if (process.env.NODE_ENV == 'development') {
			return this.requests.setRemote(
				process.env.VUE_APP_STANDALONE_REMOTE_HOST, { path: process.env.VUE_APP_STANDALONE_REMOTE_PATH }
			)
		}

		this.requests.setRemote(
			window.location.href,
			{ path: (new URI(window.location.href)).path().split('/').slice(0, -2).join('/') + '/index.php?page=structure\&rex-api-call=debug\&request=' }
		)
	}

	setMetadataClient() {
		this.requests.setClient((method, url, data, headers) => {
			return this.profiler.withoutProfiling(() => {
				return this.fetch(method, url, data, headers)
					.then(({ response, data }) => {
						if (response.status == 403) {
							throw { error: 'requires-authentication', message: data.message, requires: data.requires }
						} else if (response.status != 200) {
							throw { error: 'error-response', message: 'Server returned an error response.' }
						} else if (! (data instanceof Array) && (! (data instanceof Object) || ! Object.keys(data).length)) {
							throw { error: 'empty-response', message: 'Server returned an empty metadata.' }
						}

						return data
					})
			})
		})
	}

	fetch(method, url, data = {}, headers = {}) {
		let body = new FormData
		Object.entries(data).forEach(([ key, value ]) => body.append(key, value))

		return fetch(url, { method, body: Object.keys(data).length ? body : null, headers })
			.then(response => response.json().then(data => ({ response, data })))
	}

	setCookie(name, value, expiration) {
		document.cookie = `${name}=${value};path=/;max-age=${expiration}`

		return Promise.resolve()
	}

	getCookie(name) {
		let matches = document.cookie.match(new RegExp(`(?:^| )${name}=([^;]*)`))

		return Promise.resolve(! matches ? undefined : matches[1])
	}

	loadRequestFromUri() {
		let id = URI(window.location.href).fragment()

		if (id) this.requests.loadId(id, false)
	}

	startPollingRequests() {
		this.pollingInterval = 1000

		this.requests.loadLatest().then(() => {
			if (! (this.lastPolledId = this.requests.last()?.id)) throw new Error

			this.pollRequests()
		}).catch(error => {
			if (error.error == 'requires-authentication') {
				this.authentication.request(error.message, error.requires).then(() => {
					this.startPollingRequests()
				})
			} else {
				setTimeout(() => this.startPollingRequests(), this.pollingInterval)
			}
		})
	}

	pollRequests() {
		clearTimeout(this.pollTimeout)

		this.requests.loadNext(null, this.requests.last()?.id || this.lastPolledId).then(requests => {
			if (! this.settings.global.preserveLog) {
				this.requests.setItems(this.requests.all().slice(-1))
			}

			this.lastPolledId = this.requests.last()?.id || this.lastPolledId
			this.pollTimeout = setTimeout(() => this.pollRequests(), this.updatePollingInterval(requests.length))
		}).catch(() => {
			this.pollTimeout = setTimeout(() => this.pollRequests(), this.updatePollingInterval(false))
		})
	}

	throttlePolling() {
		document.addEventListener('visibilitychange', () => {
			this.pollingInterval = document.hidden ? 60000 : 1000

			if (! document.hidden) this.pollRequests()
		});
	}

	updatePollingInterval(requestsReceived) {
		let currentTime = (new Date).getTime()

		if (requestsReceived || ! this.pollingLastReceived) {
			this.pollingLastReceived = currentTime
		}

		if (currentTime - this.pollingLastReceived > 60000) {
			return this.pollingInterval = 5000
		} else if (currentTime - this.pollingLastReceived > 30000) {
			return this.pollingInterval = 2500
		} else {
			return this.pollingInterval = 1000
		}
	}

	hasFeature(feature) {
		let disabledFeatures = [ 'delete-shared', 'details-request' , 'profiler']

		return ! disabledFeatures.includes(feature)
	}

	settingsChanged() {
	}
}
