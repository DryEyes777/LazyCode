# D001 Acceptance

- The supplied organizational concept is represented by focused, linked project artifacts.
- `lazycode-dsh` builds as an installable DeepSeek Harness bundle.
- A Project Manager can invoke `delegate_exploration`.
- The Explorer receives fresh context, maximum depth one, and only `read`, `glob`, and `grep`.
- A completed Explorer returns the documented structured report.
- Failure and cancellation paths dispose every created child run.
- Unit tests, type checking, production build, and profile composition checks pass.
- A live smoke test may run only on explicit user request; otherwise it remains documented as optional, unperformed verification. It is not an automatic acceptance requirement under PD-25.
