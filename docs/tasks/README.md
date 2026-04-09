# Task Tracking

Use this folder to track work items across Unifier operations.

## Status folders
- `backlog/` — items not yet started
- `in-progress/` — actively being worked on
- `done/` — completed items

## Supporting folders
- `templates/` — standard task templates
- `source-docs/` — raw source documents copied into the repo for durability
- `knowledge-base/` — markdown extracts and reusable reference notes from source docs
- `worknotes/` — optional scratch notes grouped by project or site

## Required workflow
1. Every new piece of work must become a task file.
2. Every uploaded document that matters to the task must be copied into `source-docs/`.
3. Every important source document must be extracted or summarized into markdown in `knowledge-base/`.
4. Task files are the working scratch pad and must contain the information needed to continue next session.
5. Keep `INDEX.md` up to date whenever tasks are created, moved, or completed.
6. Keep `COMPLETION_LOG.md` up to date whenever a task is completed.
7. When a task is completed, commit and push the repo.

Each task should be a plain markdown file using the standard structure from `templates/task-template.md`.