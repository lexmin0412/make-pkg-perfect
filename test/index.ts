import * as path from 'path'
import { checkPkgJson, checkStandardFiles } from './../src/index'

const pkgJsonPath = path.resolve(__dirname, '..', 'package.json')

console.log('package.json 字段校验开始')
const { succeed, errors } = checkPkgJson(pkgJsonPath)

if ( !succeed ) {
	console.error('package.json 校验失败，错误原因：\n', errors)
	process.exit(1)
}
console.log('package.json 字段校验结束\n')

console.log('必要文件校验开始')
const { succeed: checkStandardFilesSuccees, missingFiles } = checkStandardFiles(process.cwd())

if ( !checkStandardFilesSuccees ) {
	console.error('必要文件校验失败, 缺少以下文件: \n', missingFiles, '\n')
	process.exit(1)
}
console.log('必要文件校验结束\n')
