import { Repository } from '../types'

export const rules: Record<string, any[]> = {
	author: [
		{
			required: true,
			message: (key: string, value: string) => {
				return `${key} 不能为空`
			}
		}
	],
	scripts: [{
		required: true,
		message: (key: string, value: string) => {
			return `${key} 不能为空`
		}
	}],
	keywords: [{
		required: true,
		message: (key: string, value: string) => {
			return `${key} 不能为空`
		}
	},
	{
		validator: (value: string[]) => {
			return Array.isArray(value) && value.length >= 3
		},
		message: (key: string, value: string) => {
			return `${key} 必须是长度不小于 3 的数组`
		}
	}
	],
	description: [{
		required: true,
		message: (key: string, value: string) => {
			return `${key} 不能为空`
		}
	}],
	repository: [
		{
			required: true,
			message: (key: string, value: string) => {
				return `${key} 不能为空`
			}
		},
		{
			validator: (value: Repository) => {
				return ['git'].includes(value.type)
			},
			message: (key: string, value: string) => {
				return `${key}.type 必须为 git`
			}
		},
		{
			validator: (value: Repository) => {
				return value.url
			},
			message: (key: string, value: string) => {
				return `${key}.url 不能为空`
			}
		}
	]
}
