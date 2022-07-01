import * as fs from 'fs'
import * as path from 'path'
import { CheckStandardFilesRes } from '../types'

/**
 * 检查必要文件
 * @param cwd
 * @returns
 */
export const checkStandardFiles = (cwd: string): CheckStandardFilesRes => {
	const fileNames = [
		'package.json',
		'README.md',
		'.npmrc',
		'.gitignore',
		'tsconfig.json',
	]

	let missingFiles: string[] = []

	fileNames.forEach((fileName: string) => {
		const isExists = fs.existsSync(path.join(cwd, fileName))
		console.log(`文件 ${fileName} ${!isExists ? '不' : ''}存在`)
		if (!isExists) {
			missingFiles.push(fileName)
		}
	})

	return {
		succeed: missingFiles.length <= 0,
		missingFiles
	}
}
