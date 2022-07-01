import { execSync } from 'child_process'
import { getPkgJson } from '../utils'
import { CheckGitUserRes, UserConfig } from '../types'

export const checkGitUser = async (pkgJsonPath: string): Promise<CheckGitUserRes> => {

	const forbiddenMsg = 'you are not allowed to contribute to this project because your local git user are not listed in package.json,'

	let result = {
		succeed: true,
		message: 'git user config 检查通过'
	}

	const pkgJson = await getPkgJson(pkgJsonPath)
	if (!pkgJson?.author) {
		result.message = '缺少 author 信息'
		result.succeed = false
		return result
	}

	const gitName = execSync('git config user.name').toString().trim()
	const gitEmail = execSync('git config user.email').toString().trim()

	const {author, maintainers = [], contributors = []} = pkgJson

	const configuredUserList = [author, ...maintainers, ...contributors]

	const existsInUsers = configuredUserList.some((user: UserConfig) => {
		return user.name === gitName && user.email === gitEmail
	})
	if (!existsInUsers) {
		result.message = `${forbiddenMsg} your local config.name:${gitName}, config.email:${gitEmail}`
		result.succeed = false
		return result
	}
	return result
}
