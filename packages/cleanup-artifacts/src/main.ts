import * as core from '@actions/core'
import {GitHub, context} from '@actions/github'

export const ARTIFACTS_PER_PAGE = 100

export const handleArtifacts = ({artifacts, oldestDate}) => {
  const retainedArtifacts = []
  const artifactsToRemove = []
  for (const artifact of artifacts) {
    const createdAt = Date.parse(artifact.created_at)
    if (createdAt <= oldestDate) {
      core.debug(`Deleting artifact (id:${artifact.id}) due to age: ${artifact.created_at} is older than ${oldestDate}`)
      artifactsToRemove.push(artifact)
    }
    retainedArtifacts.push(artifact)
  }
  return retainedArtifacts
}

async function run(): Promise<void> {
  try {
    const maxRetentionDays: number = parseInt(core.getInput('maxRetentionDays'), 10)
    const maxArtifactsToKeep: number = parseInt(core.getInput('maxArtifactsToKeep'), 10)

    core.info(`Attempting to ensure at most ${maxArtifactsToKeep} artifacts in under ${maxRetentionDays} days.`)

    const {
      token,
      payload: {
        repository: {
          name: repo,
          owner: {login: owner},
        },
      },
    } = context

    const octokit = new GitHub(token)

    core.info('Finding artifacts to remove...')
    let moreArtifacts = true
    let artifactsToRemove = []
    let page = 1
    const artifactsOptions = octokit.actions.listArtifactsForRepo.endpoint.merge({
      owner,
      repo,
      per_page: ARTIFACTS_PER_PAGE,
    })
    const today = new Date()
    console.info('Iterating over artifacts...')
    const oldestDate = new Date().setDate(today.getDate() - 30)
    let curTotal = 0
    const allArtifacts = await octokit.paginate(artifactsOptions, artifacts => handleArtifacts({artifacts, oldestDate}))
    if (allArtifacts.length > maxArtifactsToKeep) {
      console.info('Removing artifacts due to limit hit.')
      console.info('Sorting by age')
      console.info('Removing oldest artifacts')
    }

    core.setOutput('artifactsRemoved', artifactsRemoved)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
