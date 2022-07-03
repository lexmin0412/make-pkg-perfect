import * as path from 'path'
import {
	checkGitUser,
	checkPkgJson,
	checkStandardFiles
} from './index'

const args = process.argv
console.log('args', args)

const cwd = process.cwd()
const pkgJsonPath = path.resolve(cwd, 'package.json')

export const checkAll = () => {
	console.log('package.json 字段校验开始')
	const {succeed, errors} = checkPkgJson(pkgJsonPath)

	if (!succeed) {
		console.error('package.json 校验失败，错误原因：\n', errors)
		process.exit(1)
	}
	console.log('package.json 字段校验结束\n')

	console.log('必要文件校验开始')
	const {succeed: checkStandardFilesSuccees, missingFiles} = checkStandardFiles(cwd)

	if (!checkStandardFilesSuccees) {
		console.error('必要文件校验失败, 缺少以下文件: \n', missingFiles, '\n')
		process.exit(1)
	}
	console.log('必要文件校验结束\n')


	console.log('校验 git 用户配置开始')
	checkGitUser(pkgJsonPath).then(({succeed: checkGitUserSucceed, message}) => {
		if (!checkGitUserSucceed) {
			console.error('校验 git 用户配置失败，错误原因', message)
		}
		console.log('校验 git 用户配置结束\n')
	})
}

checkAll()
