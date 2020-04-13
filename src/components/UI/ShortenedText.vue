<template>
	<span @click="expand($event)">
		<template v-if="expanded">
			<pretty-print :data="full"></pretty-print>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</span>
</template>

<script>
import PrettyPrint from './PrettyPrint'

export default {
	name: 'ShortenedText',
	components: { PrettyPrint },
	props: [ 'full' ],
	data: () => ({
		expanded: false
	}),
	methods: {
		expand($event) {
			if (! this.expanded) {
				$event.stopPropagation()
				$event.preventDefault()
			}

			this.expanded = true
		}
	}
}
</script>
