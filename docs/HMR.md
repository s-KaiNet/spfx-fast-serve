# HMR with SharePoint Framework

## Prerequisites

### SPFx 1.16+

The HMR feature was tested with SPFx 1.16.

## Full page refresh

Sometimes it performs a full page refresh instead of a partial update. That's ok because the HMR feature is smart enough to detect when a partial update is available. If you component depends on external state or performs HTTP requests, then most likely a full-page refresh will be executed. Partial update works well only for small single-purpose components without lots of dependencies.

## Experimental

At the time being this feature is marked as experimental, because I can't guarantee that it works on all different cases and configurations. Also, it relies on some nodejs modules, which are still in development. Thus my recommendation is to try it if you wish. If it works for your project - then use it. In future versions of SPFx, this feature should be more stable.
