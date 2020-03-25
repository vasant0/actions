import faker from 'faker'
import {handleArtifacts} from './main'

const GITHUB_OWNER = 'svaj'
const GITHUB_REPO = 'actions'
const DAY_RANGE = 10

const GITHUB_REPO_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

// 'MDg6QXJ0aWZhY3QxMQ==',  // b64 encoded str like: "08:Artifact11" ??:<Type><ID>

const genFakeNodeId = (id = faker.random.number(), nodeType = 'Artifact') => Buffer.from(`${faker.random.number}:${nodeType}${id}`).toString('base64')

const genArtifact = (id = faker.random.number(), created_at = faker.date.recent(DAY_RANGE)) => ({
  id,
  node_id: genFakeNodeId(id),
  name: faker.lorem.word(),
  size_in_bytes: faker.random.number(),
  url: `${GITHUB_REPO_BASE_URL}/actions/artifacts/${id}`,
  archive_download_url: `${GITHUB_REPO_BASE_URL}/actions/artifacts/${id}/zip`,
  expired: false,
  created_at: created_at.toISOString(),
  expires_at: faker.date.between(faker.date.recent(DAY_RANGE), faker.date.recent(DAY_RANGE * -1)).toISOString()
})
const testArtifacts = Array.from(Array(faker.random.number)).map(() => genArtifact())

describe('handleArtifacts', () => {
  let result
  const testDate = faker.date.recent(2)
  beforeEach(() => {
    console.info('testArtifacts length before', testArtifacts.length)
    const {artifactsToRemove, sortedArtifacts} = handleArtifacts({artifacts: testArtifacts, oldestDate: testDate})
    console.info('result length after', sortedArtifacts.length)
    console.info('artifactsToRemove', artifactsToRemove.length)
  })
  it('should return a list of artifacts older than (or equal to) oldestDate for deletion')
  it('should return the remainder of artifacts sorted by created_at')
})
