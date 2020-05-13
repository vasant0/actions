import {run} from './actionEntry'

describe('Action run', () => {
  it('Should complete without error.', async () => {
    await expect(run()).resolves.not.toThrow()
  })
})
