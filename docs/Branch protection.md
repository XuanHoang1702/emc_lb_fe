# Branch Protection Rules — Required Setup

The workflow files (`ci.yml`, `e2e.yml`) are only effective when configured as **required status checks**. Without this setup, anyone can still merge a PR even when CI is failing.

## Configure at: `Settings → Branches → Branch protection rules` (apply to `main` and `develop`)

### 1. Require a pull request before merging

- ✅ Enable — no direct pushes to `main`.
- ✅ **Require approvals**: minimum **2 reviewers** (for a large-scale ecommerce project, 1 reviewer is insufficient).
- ✅ **Dismiss stale pull request approvals when new commits are pushed** — mandatory to prevent approved PRs from having unreviewed code pushed after approval.
- ✅ **Require review from Code Owners** — works in conjunction with the `CODEOWNERS` file below.

### 2. Require status checks to pass before merging

- ✅ Enable **Require branches to be up to date before merging**.
- Required checks to select:
  - `All Checks Passed ✅` (gatekeeper job in `ci.yml`)
  - `E2E Gate ✅` (gatekeeper job in `e2e.yml`)

  → Only these 2 gatekeeper jobs need to be selected, as they aggregate results from all child jobs. Listing individual jobs is error-prone (easy to forget when adding new ones).

### 3. Require conversation resolution before merging

- ✅ Enable — all review comments must be resolved before merging.

### 4. Require signed commits

- ✅ Recommended for production projects — prevents commit author spoofing.

### 5. Require linear history

- ✅ Enable — only squash merge or rebase merge allowed, no merge commits cluttering the history.

### 6. Do not allow bypassing the above settings

- ✅ **Must be enabled, including for admins.** This is the most important strict principle — if admins can bypass, the entire CI/CD system above becomes purely ceremonial.

### 7. Restrict who can push to matching branches

- ✅ Only allow merging through PRs that have passed all checks. No one (including deploy bots) should push directly.

### 8. Require deployments to succeed before merging (if using preview deployments)

- ✅ If using Vercel/Netlify preview, enable to ensure the preview deployment builds successfully before merging.

---

## CODEOWNERS File

Place at `.github/CODEOWNERS`:

```
# Default: team leads review everything
* @your-org/fe-leads

# Sensitive domains — require domain owner review
/apps/storefront/src/features/checkout/ @your-org/payment-team
/apps/storefront/src/features/payment/  @your-org/payment-team
/apps/storefront/src/entities/order/    @your-org/payment-team

# Admin-specific domains
/apps/admin/src/features/              @your-org/fe-leads

# CI/CD workflows — only DevOps/leads can modify, prevents loosening rules
/.github/workflows/ @your-org/devops-team @your-org/fe-leads

# Shared design system — requires careful review as it affects all apps
/packages/ui/ @your-org/design-system-team

# Shared packages — cross-cutting concerns
/packages/api-client/ @your-org/fe-leads
/packages/contracts/  @your-org/fe-leads
```

---

## Additional Principles for Long-Term Strictness

1. **Never use `continue-on-error: true`** on any quality gate step (lint, test, build, security). Only acceptable on non-blocking steps (e.g., PR comments).
2. **Coverage thresholds can only increase, never decrease** — add a CI check comparing the threshold in config against the previous commit's value, and warn if someone lowers the bar.
3. **Periodically review `--audit-level`** in the `security-audit` job — do not lower it from `high` to `moderate` for convenience.
4. **`test.skip()` must include a comment explaining the reason + a tracking ticket** — reviewers must verify this (add to PR template).
5. **Dependabot / Renovate** should be enabled with full CI runs on dependency update PRs. Never auto-merge, even for patch versions.
