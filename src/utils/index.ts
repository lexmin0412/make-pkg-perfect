import * as fs from 'fs'

export const getPkgJson = (filePath: string) => {
	return JSON.parse(fs.readFileSync(filePath).toString())
}
