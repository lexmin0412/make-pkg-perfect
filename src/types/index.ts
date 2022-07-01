export interface Repository {
	type: 'git' | 'svn'
	url: string
	directory?: string
}

export type CheckError = {
	message: string
}

export interface CheckPkgRes {
	succeed: boolean
	errors: CheckError[]
}

export interface CheckStandardFilesRes {
	succeed: boolean
	missingFiles: string[]
}

export interface CheckGitUserRes {
	succeed: boolean,
	message: string
}

export interface UserConfig {
	name: string
	email: string
	url?: string
}
