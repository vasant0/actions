import faker from 'faker'
import {handleArtifacts} from './main'
import {Artifact} from './types'

const GITHUB_OWNER = 'svaj'
const GITHUB_REPO = 'actions'
const DAY_RANGE = 10

const GITHUB_REPO_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

// 'MDg6QXJ0aWZhY3QxMQ==',  // b64 encoded str like: "08:Artifact11" ??:<Type><ID>

const genFakeNodeId = (id = faker.random.number(), nodeType = 'Artifact') =>
  Buffer.from(`${faker.random.number}:${nodeType}${id}`).toString('base64')

const genArtifact = (id = faker.random.number(), created_at = faker.date.recent(DAY_RANGE)) => ({
  id,
  node_id: genFakeNodeId(id),
  name: faker.lorem.word(),
  size_in_bytes: faker.random.number(),
  url: `${GITHUB_REPO_BASE_URL}/actions/artifacts/${id}`,
  archive_download_url: `${GITHUB_REPO_BASE_URL}/actions/artifacts/${id}/zip`,
  expired: false,
  created_at: created_at.toISOString(),
  expires_at: faker.date.between(faker.date.recent(DAY_RANGE), faker.date.recent(DAY_RANGE * -1)).toISOString(),
})
// const testArtifacts = Array.from(Array(faker.random.number)).map(() => genArtifact())

describe('handleArtifacts', () => {
  const testDate = faker.date.recent(2)
  let artifactsToRemove: Artifact[]
  let sortedArtifacts: Artifact[]
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(today.getDate() - 2)

  const todayArtifact = genArtifact(1, today)
  const todayArtifact2 = genArtifact(1, today)
  const twoDaysAgoArtifact = genArtifact(2, twoDaysAgo)
  const twoDaysAgoArtifact2 = genArtifact(2, twoDaysAgo)
  const testArtifacts = [todayArtifact, twoDaysAgoArtifact, twoDaysAgoArtifact2, todayArtifact2]

  beforeEach(() => {
    const result: {sortedArtifacts: Artifact[]; artifactsToRemove: Artifact[]} = handleArtifacts({
      artifacts: testArtifacts,
      oldestDate: yesterday,
    })
    ;({artifactsToRemove, sortedArtifacts} = result)
  })

  it('should return a list of artifacts older than (or equal to) oldestDate for deletion', () => {
    expect(artifactsToRemove).toEqual([twoDaysAgoArtifact, twoDaysAgoArtifact2])
  })

  it('should return the remainder of artifacts sorted by created_at', () => {
    expect(sortedArtifacts).toEqual([todayArtifact, todayArtifact2])
  })
})
