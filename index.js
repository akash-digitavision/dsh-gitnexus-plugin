// Resolvable entry shim for dsh-plugin-hub marketplace installs: the hub fails any
// install whose package has no resolvable entry (`exports["."]` → `main` →
// `index.js`). The host never imports a bundle entry unless a config row's `name`
// points at this package — configuration is supplied entirely via cordis.patch.yml
// (dsh.bundle.patch) — so this module is intentionally behaviour-free. The no-op
// `apply` export satisfies the DSH plugin-spec check used by community catalogs.
export function apply() {}
export default { apply };
