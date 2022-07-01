import { rules } from '../utils/rules'
import { getPkgJson } from '../utils'
import { CheckPkgRes } from '../types'

/**
 * 检查 package.json 是否存在必要的字段
 * @param filePath
 * @returns
 */
export const checkPkgJson = (pkgJsonPath: string): CheckPkgRes => {

	const pkgJson = getPkgJson(pkgJsonPath)

	let errors: {message: string}[] = []

	for (const key in rules) {

		let isCurrentKeyValid = true
		const currentValue = pkgJson[key]
		const currentRules = rules[key]
		currentRules.forEach((rule) => {
			if (!isCurrentKeyValid) {
				return
			}

			if (rule.required && !currentValue) {
				errors.push({
					message: rule.message(key, currentValue)
				})
				isCurrentKeyValid = false
				return
			}

			if (rule.validator) {
				const isValid = rule.validator(currentValue)
				if (!isValid) {
					errors.push({
						message: rule.message(key, currentValue)
					})
					isCurrentKeyValid = false
					return
				}
			}
		})
		console.log(`字段 ${key} 校验完成, 结果: ${isCurrentKeyValid ? '成功' : '失败'}`)
	}
	return {
		succeed: errors.length <= 0,
		errors
	}
}
