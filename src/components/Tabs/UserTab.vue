<template>
	<div v-show="active">
		<div v-for="section, sectionIndex in userTab.sections" :key="`${$request.id}-${sectionIndex}`">
			<div v-if="section.showAs == 'counters'" class="counters-row">
				<div v-for="item, index in section.data" class="counter" :key="`${$request.id}-${index}`">
					<div class="counter-value">{{item.value}}</div>
					<div class="counter-title">{{item.key}}</div>
				</div>
			</div>

			<h3 v-if="section.title">
				{{section.title}}
			</h3>

			<details-table :columns="section.data[0].map(item => item.key)" :items="section.data" :filter="filters[sectionIndex]" v-if="section.showAs == 'table'">
				<template slot="body" slot-scope="{ items }">
					<tr v-for="item in items">
						<td v-for="item in item">
							<pretty-print :data="item.value" v-if="typeof item.value != 'string'"></pretty-print>
							<shortened-text :full="item.value" v-if="typeof item.value == 'string'">{{ item.value.length > 500 ? item.value.substring(0, 500) + ' [...]' : item.value}}</shortened-text>
						</td>
					</tr>
				</template>
			</details-table>
		</div>
	</div>
</template>

<script>
import DetailsTable from '../UI/DetailsTable'
import PrettyPrint from '../UI/PrettyPrint'
import ShortenedText from '../UI/ShortenedText'

import Filter from '../../features/filter'

export default {
	name: 'UserTab',
	components: { DetailsTable, PrettyPrint, ShortenedText },
	props: [ 'active', 'userTab' ],
	// computed: {
	// 	filters() {
	// 		return this.userTab.sections.map(section => {
	// 			if (section.showAs == 'table') {
	// 				return new Filter(section.data[0].map(item => ({ tag: item.key })))
	// 			}
	// 		})
	// 	}
	// },
	data: () => ({
		filters: []
	}),
	watch: {
		userTab: {
			handler(val) {
				this.filters = val.sections.map(section => {
					if (section.showAs == 'table') {
						return new Filter(section.data[0].map(item => ({ tag: item.key })))
					}
				})
			},
			immediate: true
		}
	}
	// mounted() {
	// 	this.filters = this.userTab.sections.map(section => {
	// 		if (section.showAs == 'table') {
	// 			return new Filter(section.data[0].map(item => ({ tag: item.key })))
	// 		}
	// 	})
	// }
}
</script>
