### Monorepo-Cache


A Github action to easily generate and restore caches for packages/projects in a monorepo.  

## History

This project was born out of frustration with github actions
and monorepos.  Every CI tool pretty much provides an example of how to cache node_modules or yarn's cache.  I wanted to easily cache those directories
along with several others for every package I had in a monorepo.  Say I wanted to store one package's `.parcel-cache`, it's `node_modules` (because it was `nohoist`ed),
This would normally mean I'd have to do some silly scripting, or to explicitly cache those dirs.  With Github actions, that second option is expensive as I'd need to
call an action many times over.  After doing this too many times, I set forth to write this action to handle that task for me.

## Usage

You'll need to call this action at least twice per workflow.  Once to try to fetch/restore a cache, and once to generate a cache.  Once a workflow has a cache built,
you may fetch it many times in the different jobs you might have.
When creating the cache, this action will gather one or many directories/files in every project, aggregating them into one large zip file and cache it. 
When restoring the cache, this action will attempt to fetch a previously cached file and unzip it, in such a way that every project's caches are restored.

## Configuration

```
  saveOrFetch:
    description: "Save the cache for packages or fetch the cache?"
    default: "fetch"
    required: true
  monorepoType:
    description: "What type of monorepo is this? [yarn,lerna]"
    default: "yarn"
    required: false
  exclude:
    description: "What packages to ignore (comma separated)"
    default: ""
    required: false
```
