# Dashboard Testing & Validation Plan

This document records how we will guard the new dashboard experience against regressions while the feature is still evolving.

## Visual/Component Coverage

- **Storybook** lives at `.storybook/`. Run `npm run storybook` to develop components in isolation and `npm run storybook:build` to generate static docs.
- Stories sit next to components (e.g. `DashboardLayout.stories.tsx`). Each story should showcase the states we care about: default, loading, empty, error.
- Snapshot/visual testing happens via `npm run test:visual`, which executes Storybook’s test runner. Add more stories instead of ad-hoc screenshots so reviewers can inspect specific UI states.

## Interaction & Navigation Tests

- Playwright (`@playwright/test`) powers route-level checks under `tests/`.
- `npm run test:e2e` launches the Next dev server automatically and asserts flows such as dashboard navigation, sidebar interactions, and responsive fallbacks. Use `npm run test:e2e:headed` during debugging.
- Keep tests focused on critical paths (loading the dashboard shell, switching sections, basic CTA clicks). Defer deep analytics logic to unit tests closer to the data layer.

## Snapshot Strategy

- Prefer **visual snapshots** through Storybook for layout-heavy components (cards, charts, navigation shells). When styles change intentionally, update the story to reflect the new baseline.
- Reserve **DOM snapshots** (`expect(component).toMatchSnapshot()`) for deterministic structures such as data-mapping helpers—avoid snapshotting large pages that change frequently.
- When adding a new dashboard component, always answer:
  1. Which Storybook stories cover its major states?
  2. Which Playwright test (if any) exercises it in context?
  3. Do we need an additional Jest/RTL snapshot for logic-heavy rendering branches?

Keeping these artifacts up to date gives us fast local feedback and reliable CI signals as the dashboard grows.
