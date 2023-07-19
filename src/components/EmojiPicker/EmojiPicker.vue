<script>

import data from './emojis-data.json';

export default {
	props:
	{
		show_arrow:
		{
			type: Boolean,
			required: false,
			default: true
		}
	},
	computed:
	{
		categories()
		{
			return Object.keys(data);
		},

		category_emojis: () => (category) =>
		{
			return Object.values(data[category]);
		}
	},
	methods:
	{
		handleEmojiClick(e, emoji)
		{
			e.preventDefault();
			this.$emit('emoji_click', emoji);
		}
	}
}
</script>

<template>
	<div class="emoji_picker">
		<div class="picker_container">
			<div class="category" v-for="category in categories" :key="`category_${category}`">
				<span class="category-title">{{ category }}</span>
				<div class="emojis_container">
					<div class="emoji flex-center" @click="handleEmojiClick($event, emoji)" v-for="(emoji, index) in category_emojis(category)" :key="`emoji_${index}`">
						{{ emoji }}
					</div>
				</div>
			</div>
		</div>
		<div class="bottom_arrow" v-if="show_arrow"></div>
	</div>
</template>

<style scoped>

.emoji_picker
{
	position: relative;
	display: flex;
	flex-direction: column;
	width: 340px;
	height: 312px;
	max-width: 100%;
}

.emoji_picker,
.bottom_arrow
{
	/* box-shadow: 0 0 5px 1px rgba(0, 0, 0, .175); */
	box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
;
}

.emoji_picker,
.picker_container
{
	border-radius: 0.5rem;
	background: white;
}

.picker_container
{
	position: relative;
	padding: 8px 2px 8px 8px;
	overflow: auto;
	z-index: 1;
}

.picker_container::-webkit-scrollbar {
  width: 6px;
	position: fixed;
}
.picker_container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.4); 
}
.picker_container::-webkit-scrollbar-thumb {
  background: var(--secondary-color); 
  border-radius: 8px;
}

.category
{
	display: flex;
	flex-direction: column;
	margin-bottom: 0.5rem;
	color: rgb(169, 169, 169);
}
.category-title {
	font-size: 14px;
	padding: 0 4px;
	color: var(--sub-text-color);
}

.emojis_container
{
	display: flex;
	flex-wrap: wrap;
}

.category .emoji
{
	margin: 2px 2px;
	background: inherit;
	border: none;
	width: 36px;
	height: 36px;
	font-size: 26px;
	padding: 0;
	cursor: pointer;
	border-radius: 4px;
}
.category .emoji:hover {
	background-color: rgba(0, 0, 0, 0.075);
}

.bottom_arrow
{
	position: absolute;
	right: 0;
	bottom: 0;
	width: 1.25rem;
	height: 1.25rem;
	transform: translate(-50%, 50%) rotate(45deg);
	background: white;
}

</style>