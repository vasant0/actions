import {
  WebhookPayloadCheckRun,
  WebhookPayloadRelease,
  WebhookPayloadCheckSuite,
  WebhookPayloadCreate,
  WebhookPayloadDelete,
  WebhookPayloadDeployment,
  WebhookPayloadDeploymentStatus,
  WebhookPayloadFork,
  WebhookPayloadGollum,
  WebhookPayloadIssueComment,
  WebhookPayloadIssues,
  WebhookPayloadLabel,
  WebhookPayloadMilestone,
  WebhookPayloadPageBuild,
  WebhookPayloadProject,
  WebhookPayloadProjectCard,
  WebhookPayloadProjectColumn,
  WebhookPayloadPublic,
  WebhookPayloadPullRequest,
  WebhookPayloadPullRequestReview,
  WebhookPayloadPullRequestReviewComment,
  WebhookPayloadPush,
  WebhookPayloadPackage,
  WebhookPayloadStatus,
  WebhookPayloadWatch,
  WebhookPayloadRepositoryDispatch,
} from '@octokit/webhooks'

export interface Artifact {
  id: number
  node_id: string
  name: string
  size_in_bytes: number
  url: string
  archive_download_url: string
  expired: boolean
  created_at: string
  expires_at: string
}

export interface ActionContext {
  token?: string
  eventName: ActionTriggeringEventName
  sha?: string
  ref?: string
  workflow?: string
  action?: string
  actor?: string
  payload: ActionPayload
}

export type ActionPayload =
  | WebhookPayloadRelease
  | WebhookPayloadCheckRun
  | WebhookPayloadCheckSuite
  | WebhookPayloadCreate
  | WebhookPayloadDelete
  | WebhookPayloadDeployment
  | WebhookPayloadDeploymentStatus
  | WebhookPayloadFork
  | WebhookPayloadGollum
  | WebhookPayloadIssueComment
  | WebhookPayloadIssues
  | WebhookPayloadLabel
  | WebhookPayloadMilestone
  | WebhookPayloadPageBuild
  | WebhookPayloadProject
  | WebhookPayloadProjectCard
  | WebhookPayloadProjectColumn
  | WebhookPayloadPublic
  | WebhookPayloadPullRequest
  | WebhookPayloadPullRequestReview
  | WebhookPayloadPullRequestReviewComment
  | WebhookPayloadPush
  | WebhookPayloadRelease
  | WebhookPayloadStatus
  | WebhookPayloadWatch
  | WebhookPayloadRepositoryDispatch
  | WebhookPayloadPackage // registry_package
// schedule?
export enum ActionTriggeringEventName {
  'release',
  'check_run',
  'check_suite',
  'create',
  'delete',
  'deployment',
  'deployment_status',
  'fork',
  'gollum',
  'issue_comment',
  'issues',
  'label',
  'milestone',
  'page_build',
  'project',
  'project_card',
  'project_column',
  'public',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'push',
  'registry_package',
  'status',
  'watch',
  'schedule',
  'repository_dispatch',
}
