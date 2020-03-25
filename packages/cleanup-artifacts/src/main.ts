import * as core from '@actions/core'
import {GitHub, context} from '@actions/github'
import {Octokit} from '@octokit/rest'
import {Artifact, ActionContext} from './types'

export const ARTIFACTS_PER_PAGE = 100

export const TODAY = new Date()

export const DEFAULT_DATE = new Date()
DEFAULT_DATE.setDate(TODAY.getDate() - 30)

export interface handledArtifacts {
  artifactsToRemove: Artifact[]
  sortedArtifacts: Artifact[]
}

export const handleArtifacts = ({artifacts = [], oldestDate = DEFAULT_DATE}: {artifacts: Artifact[]; oldestDate: Date}) => {
  const sortedArtifacts = []
  const artifactsToRemove = []
  for (const artifact of artifacts) {
    const createdAt = new Date(Date.parse(artifact.created_at))
    if (createdAt <= oldestDate) {
      core.debug(`Deleting artifact (id:${artifact.id}) due to age: ${artifact.created_at} is older than ${oldestDate}`)
      artifactsToRemove.push(artifact)
    }
    sortedArtifacts.push(artifact)
  }
  return {sortedArtifacts, artifactsToRemove}
}

async function run(): Promise<void> {
  try {
    const maxRetentionDays: number = parseInt(core.getInput('maxRetentionDays'), 10)
    const maxArtifactsToKeep: number = parseInt(core.getInput('maxArtifactsToKeep'), 10)

    core.info(`Attempting to ensure at most ${maxArtifactsToKeep} artifacts in under ${maxRetentionDays} days.`)

    const {
      payload: {
        repository: {
          name: repo,
          owner: {login: owner},
        },
      },
    } = <ActionContext>(<unknown>context)

    const token = process.env.GITHUB_TOKEN || 'default-token'
    const octokit = new GitHub(token)

    core.info('Finding artifacts to remove...')
    let moreArtifacts = true
    let page = 1
    const artifactsOptions: Artifact[] = octokit.repos.listArtifactsForRepo.endpoint.merge({
      owner,
      repo,
      per_page: ARTIFACTS_PER_PAGE,
    })
    const today = new Date()
    console.info('Iterating over artifacts...')
    const oldestDate = new Date()
    oldestDate.setDate(today.getDate() - 30)
    const {artifactsToRemove, sortedArtifacts} = await octokit.paginate(artifactsOptions, artifacts => handleArtifacts({artifacts, oldestDate}))
    if (sortedArtifacts.length > maxArtifactsToKeep) {
      console.info('Removing artifacts due to limit hit.')
      console.info('Sorting by age')
      console.info('Removing oldest artifacts')
    }

    core.setOutput('artifactsRemoved', JSON.stringify(artifactsToRemove))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
